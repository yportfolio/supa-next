"use client";

import { publishDocument } from "@/_actions";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React from "react";

export default function Publish({ documentId }: { documentId: string }) {
  const router = useRouter();

  const handlePublish = async () => {
    await publishDocument(documentId);
    router.push(`/${documentId}`);
  };

  return <Button onClick={handlePublish}>publish</Button>;
}
