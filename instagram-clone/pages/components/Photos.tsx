import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getAllPostsByUser } from "../utils/apiCalls";

const Posts = () => {
  const [posts, setPosts] = useState([] as any);
  const { data: session } = useSession() as any;
  useEffect(() => {
    const fetchData = async () => {
      const postsResponse = await getAllPostsByUser(session.user.username);
      setPosts(postsResponse);
    };
    fetchData();
    return;
  }, []);
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {posts.map((post: any, id: any) => (
          <div key={id} className="relative group">
            <img src={post?.image} alt={"hello world"} />
          </div>
        ))}
      </div>

      {!posts ||
        (posts.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
};

export default Posts;
