import { redirect } from "next/navigation";

import { SearchCommand } from "@/components/search-command";

import { createClient } from "@/utils/supabase/server";
import Navigation from "@/components/Navigation";

const MainLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { documentId: string };
}) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navigation documentId={params.documentId} disablePublish />
      <main className="h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
