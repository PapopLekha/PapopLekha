import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ type: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(experiences);
}
