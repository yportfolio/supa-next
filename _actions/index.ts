"use server";

import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export async function publishDocument(id: string) {
  const supabase = createClient();
  const { data: doc, error } = await supabase
    .from("document")
    .update({ isPublished: true })
    .eq("id", id)
    .single();

  return { doc, error };
}

export async function getDocuments() {
  const supabase = createClient();
  const { data: docs, error } = await supabase.from("document").select();

  return { docs, error };
}
