import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { tags: true, technologies: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
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

  const project = await prisma.project.create({
    data: {
      ...rest,
      date: date ? new Date(date) : new Date(),
      tags: { connect: tagObjects.map((t) => ({ id: t.id })) },
      technologies: { connect: techObjects.map((t) => ({ id: t.id })) },
    },
    include: { tags: true, technologies: true },
  });
  return NextResponse.json(project, { status: 201 });
}
