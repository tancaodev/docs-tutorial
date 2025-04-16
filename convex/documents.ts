import { ConvexError, v } from 'convex/values'
import { paginationOptsValidator } from 'convex/server'
import { mutation, query } from './_generated/server'

export const get = query({
    args: {
        paginationOpts: paginationOptsValidator
    },
    handler: async (ctx, args) => {
        const documents = await ctx.db.query('documents').paginate({
            ...args.paginationOpts
        })
        return documents
    }
})

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

        const documentId = await ctx.db.insert('documents', {
            title: args.title ?? 'Untitled',
            ownerId: user.subject,
            initialContent: args.initialContent ?? ''
        })

        return documentId
    }
})
