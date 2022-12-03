import type { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() as any;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { postId } = req.query as any;
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      orderBy: [{ id: "desc" }],
    });
    res.json(comments);
  } else if (req.method === "POST") {
    const postData = JSON.parse(req.body);
    const savedPost = await prisma.comment.create({
      data: postData,
    });
    res.json(savedPost);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
