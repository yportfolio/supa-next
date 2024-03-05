"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function NewPost() {
  const router = useRouter();
  const supabase = createClient();

  const newPost = async () => {
    const { data: doc, error } = await supabase
      .from("document")
      .insert({ title: "undefined", content: "empty content" })
      .select();

    return { doc, error };
  };

  const onCreate = () => {
    const promise = newPost().then(({ doc, error }) => {
      if (doc === null) {
        throw new Error(`doc creating error, ${error?.code}`);
      }

      router.push(`/documents/${doc[0].id}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <Button onClick={onCreate}>
      <PlusCircle className="h-4 w-4 mr-2" />
      Create a note
    </Button>
  );
}
