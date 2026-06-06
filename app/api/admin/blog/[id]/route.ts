import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { tags: true },
  });
  if (!blog) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { tags = [], date, ...rest } = body;

  const tagObjects = await Promise.all(
    tags.map((name: string) =>
      prisma.blogTag.upsert({ where: { name }, update: {}, create: { name } })
    )
  );

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      ...rest,
      date: date ? new Date(date) : undefined,
      tags: { set: tagObjects.map((t) => ({ id: t.id })) },
    },
    include: { tags: true },
  });
  return NextResponse.json(blog);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.blog.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
