import Content from "@/app/(main)/(routes)/drafts/[documentId]/_components/Content";
import { getCurrentUser, readDocumentById } from "@/_actions";

const DocumentIdPage = async ({
  params,
}: {
  params: { documentId: string };
}) => {
  const { doc } = await readDocumentById(params.documentId);
  const { user } = await getCurrentUser();

  if (doc === null) return <h1>No doc found</h1>;
  if (user === null) return <h1>No user found</h1>;

  return (
    <div className="pb-40 md:max-w-3xl lg:max-w-4xl mx-auto h-screen">
      <Content
        documentId={params.documentId}
        title={doc.title}
        content={doc.content}
        userId={user?.id || ""}
        created_by={doc.created_by}
      />
    </div>
  );
};

export default DocumentIdPage;
