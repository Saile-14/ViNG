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
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Feed() {
  const { data: posts} = usePosts();
  
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <Carousel className=" max-w-2xl ">
          <CarouselContent >
            {posts?.map((post: any, postIndex: number) => (
              <CarouselItem key={postIndex}>
                <Card className="max-h-2xl">
                  <CardHeader ><CardTitle className="">{post.title}</CardTitle></CardHeader>
                  <CardContent className="h-[200px]">{post.content}</CardContent>
                  <CardFooter className="flex justify-between">
                    <small>Created at: {post.createdAt}</small>
                    <div className="flex gap-4">
                      <Button><PencilIcon /></Button><Button className="bg-red-700 hover:bg-red-800"><Trash2Icon /></Button>
                    </div>                   
                  </CardFooter>
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