import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { threadId, content } = await req.json();
  if (!threadId || !content) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const comment = await prisma.comment.create({
    data: { threadId: Number(threadId), content },
  });
  return NextResponse.json(comment);
}
