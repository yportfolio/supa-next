"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type EditorProps = {
  content: string;
  editable: boolean;
  onContentUpdate?: (content: string) => void;
};

const Tiptap = ({ content, editable = true, onContentUpdate }: EditorProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    extensions: [StarterKit],
    content: JSON.parse(content),
    onUpdate({ editor }) {
      onContentUpdate && onContentUpdate(JSON.stringify(editor.getJSON()));
    },
    editable,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
