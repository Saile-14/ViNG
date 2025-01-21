// /components/DeleteButton.tsx
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useDeletePost } from "@/lib/hooks/useDeletePost";

interface DeleteButtonProps {
  postId: number;
  onPostDeleted: () => void;
}

export default function DeleteButton({ postId, onPostDeleted }: DeleteButtonProps) {
  const { mutate: deletePost, isPending } = useDeletePost({
    onSuccess: () => {
      onPostDeleted();
    },
    onError: (error: Error) => {
      console.error("Failed to delete post:", error);
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(postId);
    }
  };

  return (
    <Button
      className="bg-red-700 hover:bg-red-800"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : <Trash2Icon />}
    </Button>
  );
}
