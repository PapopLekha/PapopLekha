import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { ExperienceType } from "@prisma/client";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(experience);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const experience = await prisma.experience.update({
    where: { id },
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
  return NextResponse.json(experience);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.experience.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
