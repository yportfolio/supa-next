import { createClient } from "@/utils/supabase/server";

export async function readDocumentById(id: string) {
  const supabase = createClient();
  const { data: doc, error } = await supabase
    .from("document")
    .select()
    .eq("id", id)
    .single();

  return { doc, error };
}

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return user;
}
