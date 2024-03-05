import { redirect } from "next/navigation";

import { SearchCommand } from "@/components/search-command";

import { Navigation } from "./_components/navigation";
import { createClient } from "@/utils/supabase/server";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if (error || !user) {
  //   redirect("/");
  // }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
