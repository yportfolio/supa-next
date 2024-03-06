import { createClient } from "@/utils/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

export async function readDocumentById(id: string) {
  // noStore();
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
