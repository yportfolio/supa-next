"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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

  return { user, error };
}

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

export async function getCommentCount(docId: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("document_id", docId);

  return { count, error };
}

export async function getLikeCount(docId: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("like")
    .select("*", { count: "exact", head: true })
    .eq("document_id", docId);

  return { count, error };
}

export async function liked(docId: string, userId: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("like")
    .select("*", { count: "exact", head: true })
    .eq("document_id", docId)
    .eq("created_by", userId);

  return { count, error };
}

export async function commented(docId: string, userId: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("document_id", docId)
    .eq("created_by", userId);

  return { count, error };
}

export async function like(docId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("like")
    .insert({ document_id: docId })
    .single();

  revalidatePath(`${docId}`);

  return { data, error };
}

export async function dislike(docId: string, userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("like")
    .delete()
    .eq("document_id", docId)
    .eq("created_by", userId)
    .single();

  revalidatePath(`${docId}`);

  return { data, error };
}
