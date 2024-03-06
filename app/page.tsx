import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";
import { getDocuments } from "@/_actions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import DocSumCard from "@/app/_components/DocSumCard";
import { Tables } from "@/types/database.types";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  const { docs, error } = await getDocuments();

  if (docs === null || docs.length === 0) {
    return <div>No doc founded</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{JSON.stringify(error)}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link
            className="flex items-center font-semibold text-lg md:text-base"
            href="/"
          >
            Acme Inc
          </Link>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <main className="animate-in flex flex-col gap-20 max-w-4xl px-3 min-h-screen">
        {docs.map((doc) => (
          <DocSumCard doc={doc} key={doc.id} />
        ))}
      </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
