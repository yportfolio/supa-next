"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "postcss";
import React from "react";

import { Database, Tables, Enums } from "@/types/database.types";
import { useRouter } from "next/navigation";

type TDoc = Tables<"document">;

export default function DocSumCard({ doc }: { doc: TDoc }) {
  const router = useRouter();
  return (
    <Card className="w-full">
      <CardHeader className="h-[40px] overflow-clip">
        <CardTitle>{doc.title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[140px] overflow-clip">
        {doc.summary}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => router.push(`${doc.id}`)}>view</Button>
      </CardFooter>
    </Card>
  );
}
