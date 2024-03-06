"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface EditorProps {
  documentId: string;
  onContentUpdate: (value: string) => void;
  onTitleUpdate: (value: string) => void;
  initialContent?: { title: string; content: string };
  editable?: boolean;
}

const Editor = ({
  documentId,
  onContentUpdate,
  onTitleUpdate,
  initialContent,
  editable,
}: EditorProps) => {
  const [editMode, setEditMode] = useState(false);
  const [payload, setPayload] = useState({ title: "", content: "" });
  const [updated, setUpdated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(documentId)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "document" },
        (payload) => {
          setUpdated(true);
          setPayload({
            title: payload.new.title,
            content: payload.new.content,
          });
        }
      )
      .subscribe();

    return () => {
      setUpdated(false);
      setPayload({
        title: "",
        content: "",
      });
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="space-y-2">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {updated ? payload.title : initialContent?.title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {updated ? payload.content : initialContent?.content}
        </p>
      </div>

      {editMode && (
        <div>
          <Input
            type="text"
            placeholder="Update your title here"
            onChange={(e) => {
              onTitleUpdate(e.target.value);
            }}
          />

          <Textarea
            placeholder="Update your content here."
            onChange={(e) => {
              onContentUpdate(e.target.value);
            }}
          />
        </div>
      )}

      <Button
        onClick={() => {
          setEditMode((pre) => !pre);
        }}
      >
        {editMode ? "Close it" : "Edit it"}
      </Button>
    </div>
  );
};

export default Editor;
