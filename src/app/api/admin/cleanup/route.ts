import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
    const headers = new Headers(req.headers);
    const authHeader = headers.get("Authorization");
  
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      // 🔹 Delete all feedback where `is_protected` is FALSE
      await prisma.feedback.deleteMany({
        where: { isProtected: false },
      });
  
      return NextResponse.json({ message: "Unprotected feedback items cleaned up!" }, { status: 200 });
    } catch (error) {
      console.error("🚨 Cleanup Error:", error);
      return NextResponse.json({ error: "Failed to clean up feedback"}, { status: 500 });
    }
  }
