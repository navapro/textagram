import type { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { userName } = req.query as any;
    const posts = await prisma.post.findMany({
      where: { userName: userName },
      orderBy: [{ id: "desc" }],
    });
    res.json(posts);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
