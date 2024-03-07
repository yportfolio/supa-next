import {
  getCurrentUser,
  getCommentCount,
  liked,
  commented,
  getLikeCount,
  like,
} from "@/_actions";
import LikeButton from "@/app/(main)/(routes)/[documentId]/_components/LikeButton";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoreHorizontal, ThumbsUp } from "lucide-react";
import React from "react";

type TToolbar = {
  documentId: string;
};
export default async function Toolbar({ documentId }: TToolbar) {
  const { user } = await getCurrentUser();
  if (!user) return <div>Unauthenticated</div>;

  const [commentCountRes, likeCountRes, likedByMeRes, commentedByMeRes] =
    await Promise.all([
      getCommentCount(documentId),
      getLikeCount(documentId),
      liked(documentId, user.id),
      commented(documentId, user.id),
    ]);

  const { count: commentCount } = commentCountRes;
  const { count: likeCount } = likeCountRes;
  const { count: likedByMe } = likedByMeRes;
  const { count: commentedByMe } = commentedByMeRes;

  return (
    <div className="flex justify-between my-4">
      <div className="space-x-2">
        <LikeButton
          userId={user.id}
          documentId={documentId}
          likedByMe={likedByMe || 0}
          likeCount={likeCount || 0}
        />

        <Button size="icon" variant="ghost">
          {commentedByMe && commentedByMe > 0 ? (
            <MessageSquare fill="black" />
          ) : (
            <MessageSquare />
          )}
          {commentCount}
        </Button>
      </div>

      <Button size="icon" variant="ghost">
        <MoreHorizontal />
      </Button>
    </div>
  );
}
