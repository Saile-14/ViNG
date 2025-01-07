import { useUserPosts } from "@/lib/hooks/useUserPosts";

export function MyProfile() {
  const { data: posts, isLoading, isError, error } = useUserPosts();

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