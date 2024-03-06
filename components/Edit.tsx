"use client";

import { publishDocument } from "@/_actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Edit({ documentId }: { documentId: string }) {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/drafts/${documentId}`);
  };

  return <Button onClick={handleEdit}>Edit</Button>;
}
