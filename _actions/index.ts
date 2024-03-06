"use server";

import { createClient } from "@/utils/supabase/server";

export async function publishDocument(id: string) {
  const supabase = createClient();
  const { data: doc, error } = await supabase
    .from("document")
    .update({ isPublished: true })
    .eq("id", id)
    .single();

  return { doc, error };
}
