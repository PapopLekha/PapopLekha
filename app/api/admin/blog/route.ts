import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const blogs = await prisma.blog.findMany({
    include: { tags: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { tags = [], date, ...rest } = body;

  const tagObjects = await Promise.all(
    tags.map((name: string) =>
      prisma.blogTag.upsert({ where: { name }, update: {}, create: { name } })
    )
  );

  const blog = await prisma.blog.create({
    data: {
      ...rest,
      date: date ? new Date(date) : new Date(),
      tags: { connect: tagObjects.map((t) => ({ id: t.id })) },
    },
    include: { tags: true },
  });
  return NextResponse.json(blog, { status: 201 });
}
