import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { usePosts } from "@/lib/hooks/usePosts";
import { Scale } from "lucide-react";

export default function Feed() {
  const { data: posts, isLoading, isError, error } = usePosts();

  if (isLoading) return <div>Loading...</div>;
  if (isError)   return <div>Error: {String(error)}</div>;
  if (!posts)    return <div>No posts found.</div>;

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <Carousel >
          <CarouselContent className=" sw-[1000px]">
            {posts.map((post: any, postIndex: number) => (
              <CarouselItem key={postIndex}>
                <Card>
                  <CardHeader><CardTitle>{post.title}</CardTitle></CardHeader>
                  <CardContent className="h-[200px]">{post.content}</CardContent>
                  <CardFooter><small>Created at: {post.createdAt}</small></CardFooter>
                </Card>             
            </CarouselItem>
      ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
    </>
    
  );
}