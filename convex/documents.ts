import { ConvexError, v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { mutation, query } from './_generated/server'

export const getByIds = query({
    args: { ids: v.array(v.id('documents')) },
    handler: async (ctx, { ids }) => {
        const documents = []

        for (const id of ids) {
            const document = await ctx.db.get(id)
            if (document) {
                documents.push({
                    id: document._id,
                    name: document.title
                })
            } else {
                documents.push({
                    id: id,
                    name: 'Removed'
                })
            }
        }

        return documents
    }
})

export const get = query({
    args: {
        paginationOpts: paginationOptsValidator,
        search: v.optional(v.string())
    },
    handler: async (ctx, { search, paginationOpts }) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError('Unauthorized')
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined

        // Search for documents in an organization
        if (search && organizationId) {
            return await ctx.db
                .query('documents')
                .withSearchIndex('search_title', (q) => q.search('title', search).eq('organizationId', organizationId))
                .paginate(paginationOpts)
        }

        // Search for documents
        if (search) {
            return await ctx.db
                .query('documents')
                .withSearchIndex('search_title', (q) => q.search('title', search).eq('ownerId', user.subject))
                .paginate(paginationOpts)
        }

        // All docs inside organization
        if (organizationId) {
            return await ctx.db
                .query('documents')
                .withIndex('by_organization_id', (q) => q.eq('organizationId', organizationId))
                .paginate(paginationOpts)
        }

        // All docs inside user's documents
        return await ctx.db
            .query('documents')
            .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
            .paginate(paginationOpts)
    }
})

/**
 * The `create` mutation function is used to create a new document.
 * - Accepts optional parameters: `title` (the document's title) and `initialContent` (the initial content of the document).
 * - Authenticates the user; throws an "Unauthorized" error if the user is not logged in.
 * - If the user belongs to an organization, the document will be associated with that organization.
 * - If no title is provided, defaults to "Untitled".
 * - If no initial content is provided, defaults to an empty string.
 * - Returns the result of inserting the new document into the database.
 */
export const create = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError('Unauthorized')
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined

        return await ctx.db.insert('documents', {
            title: args.title ?? 'Untitled',
            ownerId: user.subject,
            organizationId,
            initialContent: args.initialContent ?? ''
        })
    }
})

export const removeById = mutation({
    args: { id: v.id('documents') },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError('Unauthorized')
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined
        const document = await ctx.db.get(args.id)

        if (!document) {
            throw new ConvexError('Document not found')
        }

        const isOwner = document.ownerId === user.subject
        const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId)

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError('Unauthorized')
        }

        return await ctx.db.delete(args.id)
    }
})

export const updateById = mutation({
    args: { id: v.id('documents'), title: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()

        if (!user) {
            throw new ConvexError('Unauthorized')
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined
        const document = await ctx.db.get(args.id)

        if (!document) {
            throw new ConvexError('Document not found')
        }

        const isOwner = document.ownerId === user.subject
        const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId)

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError('Unauthorized')
        }

        return await ctx.db.patch(args.id, { title: args.title })
    }
})

export const getById = query({
    args: { id: v.id('documents') },
    handler: async (ctx, { id }) => {
        const document = await ctx.db.get(id)

        if (!document) {
            throw new ConvexError('Document not found')
        }

        return document
    }
})
