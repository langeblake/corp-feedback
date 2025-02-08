import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const feedbackItem = await prisma.feedback.update({
      where: { id: Number(id) },
      data: { upvoteCount: { increment: 1 } },
    });

    if (!feedbackItem) {
      return res.status(404).json({ message: 'Feedback item not found' });
    }

    return res.status(200).json(feedbackItem);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', ['PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}