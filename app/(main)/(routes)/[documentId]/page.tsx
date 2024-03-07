import { commented, getCommentCount, getCurrentUser, liked } from "@/_actions";
import TitleEditor from "@/app/(main)/(routes)/[documentId]/_components/TitleEditor";
import Toolbar from "@/app/(main)/(routes)/[documentId]/_components/Toolbar";
import { readDocumentById } from "@/_actions";
import Tiptap from "@/components/editor/Tiptap";
import { Suspense } from "react";
import NavSkeleton from "@/components/skeleton/NavSkeleton";

export default async function page({
  params,
}: {
  params: { documentId: string };
}) {
  const { user } = await getCurrentUser();
  if (!user) return <div>No doc founded</div>;

  const { doc } = await readDocumentById(params.documentId);
  if (!doc) return <div>No doc founded</div>;

  return (
    <main>
      <TitleEditor title={doc.title} />

      <Suspense fallback={<NavSkeleton />}>
        <Toolbar documentId={doc.id} />
      </Suspense>

      <Tiptap content={doc.content} />
    </main>
  );
}
