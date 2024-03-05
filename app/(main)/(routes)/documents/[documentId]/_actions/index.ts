"use server";

import { createClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function createDocument(title: string, content: string) {
  const supabase = createClient();
  const { data: doc, error } = await supabase
    .from("document")
    .insert({ title: "undefined", content: "empty content" })
    .single();

  return { doc, error };
}

export async function readDocumentById(id: string) {
  noStore();
  const supabase = createClient();

  return await supabase.from("document").select().eq("id", id).single();
}

export async function deleteDocumentById(id: string) {
  const supabase = createClient();
  await supabase.from("todo").delete().eq("id", id);
  revalidatePath("/todo");
}

export async function updateDocumentById(id: string, completed: boolean) {
  const supabase = createClient();
  await supabase.from("todo").update({ completed }).eq("id", id);
  revalidatePath("/todo");
}
