import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdatePost } from "@/lib/hooks/useUpdatePost";
import { Pen, PencilIcon } from "lucide-react";

interface EditButtonProps {
  postId: number;
  initialTitle: string;
  initialContent: string;
  onPostUpdated: () => void; // Callback to refresh posts after update
}

export default function EditButton({
  postId,
  initialTitle,
  initialContent,
  onPostUpdated,
}: EditButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => {
      onPostUpdated();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Failed to update post:", error);
    },
  });

  const handleSubmit = () => {
    updatePost({ postId, data: {title, content} });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PencilIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
                Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
