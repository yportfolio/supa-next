"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import React from "react";

export default function PostForm() {
  const supabase = createClient();

  const handleOnclick = async () => {
    const { error } = await supabase
      .from("post")
      .insert({ content: { title: "first", body: "well" } });

    if (error) {
      console.error("error", error);
    }
  };
  return (
    <div>
      <Button onClick={handleOnclick}>Add post</Button>
    </div>
  );
}
