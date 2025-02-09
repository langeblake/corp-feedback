import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch all feedback items
export async function GET() {
  try {
    const feedbackItems = await prisma.feedback.findMany();

    const now = new Date();
    const updatedFeedbackItems = feedbackItems.map(item => ({
      ...item,
      daysAgo: Math.floor((now.getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)), // Days difference
    }));

    return NextResponse.json(updatedFeedbackItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}

// POST: Add a new feedback item
export async function POST(req: Request) {
  try {
    const { text, company, badgeLetter } = await req.json();

    const newFeedback = await prisma.feedback.create({
      data: {
        text,
        upvoteCount: 0,
        company,
        badgeLetter,
      },
    });

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add feedback" }, { status: 500 });
  }
}

// PATCH: Update the upvote count of a feedback item
export async function PATCH(req: Request) {
  const { id } = await req.json();

  try {
    const feedbackItem = await prisma.feedback.update({
      where: { id: Number(id) },
      data: { upvoteCount: { increment: 1 } },
    });

    if (!feedbackItem) {
      return NextResponse.json({ message: 'Feedback item not found' }, { status: 404 });
    }

    return NextResponse.json(feedbackItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}