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
import { useContext } from "react";
import { AuthContext } from "@/main";
import EditButton from "@/components/edit-button";
import DeleteButton from "@/components/delete-button";

export default function Feed() {
  const { data: posts, isLoading, isError, error, refetch } = usePosts();

  const auth = useContext(AuthContext)
  
    if (isLoading) return <div>Loading...</div>;
    if (isError)   return <div>Error: {String(error)}</div>;
    if (!posts)    return <div>No posts found.</div>;
  
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
                  <CardFooter className="flex justify-between min-h-[64px]">
                    {post.createdAt != post.updatedAt ? <small>
  Updated at: {new Date(post.updatedAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
</small> : <small>
                      Created at: {new Date(post.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </small>}
                    {auth?.currentUser == post.userId ? <div className="flex gap-x-4">
                      <EditButton
                        postId={post.id}
                        initialTitle={post.title}
                        initialContent={post.content}
                        onPostUpdated={refetch} 
                      />
                    <DeleteButton postId={post.id} onPostDeleted={refetch} />
                    </div> : null}                 
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