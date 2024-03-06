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

export async function updateTitle(title: string, id: string) {
  revalidatePath(`/${id}`);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("document")
    .update({ title, updated_by: user?.id })
    .eq("id", id)
    .select();

  return { data, error };
}

type IUpdateContent = {
  content: string;
  summary: string;
};

export async function updateContent(
  { content, summary }: IUpdateContent,
  id: string
) {
  revalidatePath(`/${id}`);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("document")
    .update({ content, summary })
    .eq("id", id)
    .select();

  return { data, error };
}
