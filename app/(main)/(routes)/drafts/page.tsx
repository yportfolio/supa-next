import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";
import NewPost from "@/app/(main)/(routes)/drafts/_components/NewPost";

const DocumentsPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.email}&apos;s Jotion
      </h2>
      <NewPost />
    </div>
  );
};

export default DocumentsPage;
