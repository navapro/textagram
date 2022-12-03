import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebase";
interface postProps {
  image: string;
  caption: string;
  userName: string;
  userImg: string;
}

const getFileUrl = async (filename: string) => {
  const fileUrl = await getDownloadURL(ref(storage, filename));
  return fileUrl;
};

const createPostInDataBase = async (post: postProps) => {
  const response = await fetch("api/post", {
    method: "POST",
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

const getAllPosts = async () => {
  const response = await fetch("api/posts", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const getAllPostsByUser = async (userName: any) => {
  const response = await fetch(`api/userPosts?userName=${userName}`, {
    method: "GET",
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const getAllComments = async (postId: string) => {
  const response = await fetch(`api/comments?postId=${postId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
const createComment = async (comment: any) => {
  const response = await fetch("api/comments", {
    method: "POST",
    body: comment,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
export {
  getFileUrl,
  createPostInDataBase,
  getAllPosts,
  getAllComments,
  createComment,
  getAllPostsByUser,
};
