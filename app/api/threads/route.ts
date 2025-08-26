import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // sesuaikan path jika berbeda

const prisma = new PrismaClient();

export async function GET() {
  const threads = await prisma.thread.findMany({
    include: { comments: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(threads);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const { title, content, imageUrl } = await req.json();
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const thread = await prisma.thread.create({
    data: { title, content: content || "", imageUrl: imageUrl || "" },
  });

  return NextResponse.json(thread);
}


// Tambahkan DELETE
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Thread ID required" }, { status: 400 });

  // Hapus komentar dulu
  await prisma.comment.deleteMany({ where: { threadId: Number(id) } });
  await prisma.thread.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}

