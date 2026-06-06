import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { ExperienceType } from "@prisma/client";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ type: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const body = await request.json();
  const experience = await prisma.experience.create({
    data: {
      type: body.type as ExperienceType,
      institution: body.institution,
      role: body.role,
      from: body.from,
      to: body.to,
      description: body.description ?? [],
      logo: body.logo || null,
      order: Number(body.order) || 0,
    },
  });
  return NextResponse.json(experience, { status: 201 });
}
