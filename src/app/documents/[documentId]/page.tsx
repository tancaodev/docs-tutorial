import { Editor } from './editor'

interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    const { documentId } = await params

    return (
        <div>
            DocumentIdPage {documentId}
            <Editor />
        </div>
    )
}

export default DocumentIdPage
