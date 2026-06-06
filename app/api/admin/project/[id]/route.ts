import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { tags: true, technologies: true },
  });
  if (!project) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { tags = [], technologies = [], date, ...rest } = body;

  const tagObjects = await Promise.all(
    tags.map((name: string) =>
      prisma.tag.upsert({ where: { name }, update: {}, create: { name } })
    )
  );
  const techObjects = await Promise.all(
    technologies.map((name: string) =>
      prisma.technology.upsert({
        where: { name },
        update: {},
        create: { name, experties: 0 },
      })
    )
  );

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      date: date ? new Date(date) : undefined,
      tags: { set: tagObjects.map((t) => ({ id: t.id })) },
      technologies: { set: techObjects.map((t) => ({ id: t.id })) },
    },
    include: { tags: true, technologies: true },
  });
  return NextResponse.json(project);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
