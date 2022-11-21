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
import { useState } from "react";

interface postInterface {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}
const Post = ({ id, userImg, username, img, caption }: postInterface) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const session = useSession();
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
          </div>{" "}
        </>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
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
            <button className="font-semibold text-blue-400">Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
