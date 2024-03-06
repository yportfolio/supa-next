import TitleEditor from "@/app/(main)/(routes)/[documentId]/_components/TitleEditor";
import { readDocumentById } from "@/app/_actions";
import Tiptap from "@/components/editor/Tiptap";

export default async function page({
  params,
}: {
  params: { documentId: string };
}) {
  const { doc, error } = await readDocumentById(params.documentId);

  if (!doc) return <div>No doc founded</div>;

  return (
    <main>
      <TitleEditor title={doc.title} />
      <Tiptap content={doc.content} />
    </main>
  );
}
