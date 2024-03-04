import PostForm from "@/app/dashboard/_components/PostForm";
import { createClient } from "@/utils/supabase/server";
import React from "react";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: posts } = await supabase.from("post").select();

  return (
    <div>
      <h1>DashboardPage</h1>
      <PostForm />
      {posts?.map((post) => JSON.stringify(post.content))}
    </div>
  );
}
