import React, { useEffect, useState } from "react";
import { getAllPosts } from "../utils/apiCalls";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const postsResponse = await getAllPosts();
      setPosts(postsResponse);
    };
    fetchData().catch(console.error);
    return;
  }, [posts]);
  return (
    <div>
      {posts.map((post: any) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.image}
            caption={post.caption}
          />
        );
      })}
    </div>
  );
};

export default Posts;
