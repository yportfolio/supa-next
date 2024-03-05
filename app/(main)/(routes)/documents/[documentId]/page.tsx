"use client";

import { readDocumentById } from "@/app/(main)/(routes)/documents/[documentId]/_actions";
import { debounce } from "@/utils/performance/debounce";
import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const DocumentIdPage = ({ params }: { params: { documentId: string } }) => {
  const [initialContent, setInitialContent] = useState({
    title: "",
    content: "",
  });

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const supabase = createClient();

  useEffect(() => {
    const getInitialContent = async () => {
      const { data: doc, error } = await readDocumentById(params.documentId);

      const initialContent = doc
        ? { title: doc.title, content: doc.content }
        : null;

      if (initialContent) setInitialContent(initialContent);
    };

    getInitialContent();
  }, [params.documentId]);

  const onContentUpdate = async (content: string) => {
    const { data, error } = await supabase
      .from("document")
      .update({ content: content })
      .eq("id", params.documentId)
      .select();

    if (error) {
      console.error("error", error);
    }
  };

  const onTitleUpdate = async (title: string) => {
    const { data, error } = await supabase
      .from("document")
      .update({ title: title })
      .eq("id", params.documentId)
      .select();

    if (error) {
      console.error("error", error);
    }
  };

  const debouncedOnTitleUpdate = debounce(onTitleUpdate, 200);
  const debouncedOnContentUpdate = debounce(onContentUpdate, 200);

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Editor
          onTitleUpdate={debouncedOnTitleUpdate}
          onContentUpdate={debouncedOnContentUpdate}
          initialContent={initialContent}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
