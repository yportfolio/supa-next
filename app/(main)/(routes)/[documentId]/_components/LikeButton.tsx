"use client";
import { dislike, like } from "@/_actions";
import { Button } from "@/components/ui/button";
import { debounce } from "@/utils/performance/debounce";
import { RefreshCw, ThumbsUp } from "lucide-react";
import React, { useState } from "react";

type LikeButton = {
  userId: string;
  documentId: string;
  likedByMe: number;
  likeCount: number;
};
export default function LikeButton({
  userId,
  documentId,
  likedByMe,
  likeCount,
}: LikeButton) {
  const [isLoading, setIsLoading] = useState(false);

  const onLike = debounce(async () => {
    setIsLoading(true);
    await like(documentId);
    setIsLoading(false);
  }, 0);

  const onDislike = debounce(async () => {
    setIsLoading(true);
    await dislike(documentId, userId);
    setIsLoading(false);
  }, 0);

  return (
    <Button
      className="min-w-8"
      variant="ghost"
      onClick={likedByMe && likedByMe > 0 ? onDislike : onLike}
      disabled={isLoading}
    >
      {likedByMe && likedByMe > 0 ? (
        <ThumbsUp fill="black" className={`${isLoading && "animate-spin"} `} />
      ) : (
        <ThumbsUp className={`${isLoading && "animate-spin"} `} />
      )}
      {likeCount}
    </Button>
  );
}
