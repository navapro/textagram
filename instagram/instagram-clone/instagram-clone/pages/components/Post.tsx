import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HearIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createComment, getAllComments } from "../utils/apiCalls";

interface postInterface {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}
const Post = ({ id, userImg, username, img, caption }: postInterface) => {
  const { data: session } = useSession() as any;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const sendComment = async (e: any) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    const commentBody = {
      userImg: session.user.image,
      content: commentToSend,
      postId: id,
    };
    await createComment(commentBody);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allComments = await getAllComments(id);
      setComments(allComments);
    };
    fetchData();
  }, [comments]);
  return (
    <div className="bg-white my-7 border rounded-sm pb-5">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 
        object-contain border p-1 mr-3"
          alt="user image"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {session && (
        <>
          <img src={img} alt="post image" className="object-cover w-full" />
          <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
              <HeartIcon className="btn" />
              <ChatIcon className="btn" />
              <PaperAirplaneIcon className="btn" />
            </div>
            <BookmarkIcon className="btn" />
          </div>
        </>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div
          className="ml-10 h-20 overflow-scroll
         scrollbar-thumb-black scrollbar-thin"
        >
          {comments.map((comment: any) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img className="h-7 rounded-full" src={comment.userImg} />
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {session && (
        <div>
          <form className="flex items-center p-4">
            <EmojiHappyIcon className="h-7" />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="border-none flex-1 focus:ring-0 outline-none"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
