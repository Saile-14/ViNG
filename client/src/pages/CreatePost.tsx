import { useState } from "react";
import { useCreatePost } from "@/lib/hooks/useCreatePost"; // Your custom hook
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { Textarea } from "@/components/ui/textarea"; // shadcn/ui Textarea
import { Label } from "@/components/ui/label"; // shadcn/ui Label

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate , isPending, error } = useCreatePost(); // Custom hook for POST request

  const handleSubmit = async (e: React.FormEvent) => {

    
    e.preventDefault();

    mutate({title: title, content: content});

    if (!error) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            required
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Post"}
        </Button>
        {error ? <p className="text-red-500">{error.message}</p> : null}
      </form>
    </div>
  );
};

export default CreatePost;