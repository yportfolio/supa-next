"use client";
import TitleEditor from "@/app/(main)/(routes)/[documentId]/_components/TitleEditor";
import {
  updateContent,
  updateTitle,
} from "@/app/(main)/(routes)/drafts/[documentId]/_actions";
import Tiptap from "@/components/editor/Tiptap";
import { debounce } from "@/utils/performance/debounce";
import { RefreshCw } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import React, { useCallback, useState } from "react";

type IContentProps = {
  documentId: string;
  title: string;
  content: string;
  userId: string;
  created_by: string;
};

export default function Content({
  documentId,
  title,
  content,
  userId,
  created_by,
}: IContentProps) {
  const [updating, setUpdating] = useState(false);

  // Function to handle editing
  const onTitleUpdate = async (title: string) => {
    setUpdating(true);
    await updateTitle(title, documentId);

    setUpdating(false);
  };

  const onContentUpdate = async (content: string, summary: string) => {
    setUpdating(true);
    await updateContent({ content, summary }, documentId);

    setUpdating(false);
  };

  const debouncedOnTitleUpdate = useCallback(debounce(onTitleUpdate, 1000), []);
  const debouncedOnContentUpdate = useCallback(
    debounce(onContentUpdate, 1000),
    []
  );

  return (
    <div className="relative">
      <span className="absolute right-0">
        {updating ? "updating..." : "saved"}
      </span>

      <TitleEditor title={title} editable onUpdate={debouncedOnTitleUpdate} />

      <Tiptap
        content={content}
        editable={userId === created_by}
        onUpdate={debouncedOnContentUpdate}
      />
    </div>
  );
}
