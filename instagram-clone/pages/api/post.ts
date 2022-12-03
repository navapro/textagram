import type { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const postData = JSON.parse(req.body);
    const savedPost = await prisma.post.create({
      data: postData,
    });
    res.json(savedPost);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
