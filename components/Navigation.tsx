/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kgfxYoxT1CI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Publish from "@/components/Publish";
import Edit from "@/components/Edit";

const Navigation = ({
  documentId,
  disablePublish = false,
}: {
  documentId: string;
  disablePublish?: boolean;
}) => {
  return (
    <div className="flex items-center h-14 dark:border-gray-700 justify-between">
      <div className="flex">
        <Link
          className="flex items-center font-semibold text-lg md:text-base"
          href="/"
        >
          Acme Inc
        </Link>

        <div className="w-48 mx-4">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full pl-8 peer placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!disablePublish ? (
          <Publish documentId={documentId} />
        ) : (
          <Edit documentId={documentId} />
        )}

        <Button
          className="h-8 w-8 rounded-full border-0 bg-gray-300"
          size="icon"
          variant="outline"
        >
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
