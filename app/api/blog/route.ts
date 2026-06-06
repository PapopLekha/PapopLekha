import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { tags: true },
    });
    if (!blog) return new NextResponse("Not Found", { status: 404 });
    return NextResponse.json(blog);
  }

  const blogs = await prisma.blog.findMany({
    where: { published: true },
    include: { tags: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(blogs);
}
