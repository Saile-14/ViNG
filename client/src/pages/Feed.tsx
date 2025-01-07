import { usePosts } from "@/lib/hooks/usePosts";

export function Feed() {
  const { data: posts, isLoading, isError, error } = usePosts();

  if (isLoading) return <div>Loading...</div>;
  if (isError)   return <div>Error: {String(error)}</div>;
  if (!posts)    return <div>No posts found.</div>;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Created at: {post.createdAt}</small>
        </li>
      ))}
    </ul>
  );
}