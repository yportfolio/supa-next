"use client";
import { updateContent } from "@/app/(main)/(routes)/drafts/[documentId]/_actions";
import Tiptap from "@/components/editor/Tiptap";
import { debounce } from "@/utils/performance/debounce";
import { RefreshCw } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import React, { useCallback, useState } from "react";

type IContentProps = {
  documentId: string;
  content: string;
  userId: string;
  created_by: string;
};

export default function Content({
  documentId,
  content,
  userId,
  created_by,
}: IContentProps) {
  const [updating, setUpdating] = useState(false);

  const onUpdate = async (content: string, summary: string) => {
    setUpdating(true);
    const { data, error } = await updateContent(
      { content, summary },
      documentId
    );

    if (error) {
      console.error("error", error);
    }
    setUpdating(false);
  };

  const debouncedOnUpdate = useCallback(debounce(onUpdate, 1000), []);

  return (
    <div className="relative">
      <span className="absolute right-0">
        {updating ? "updating..." : "saved"}
      </span>

      <Tiptap
        content={content}
        editable={userId === created_by}
        onUpdate={debouncedOnUpdate}
      />
    </div>
  );
}
