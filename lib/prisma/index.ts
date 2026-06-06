import { PrismaClient, Prisma } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;
//check if we are running in production mode
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //check if there is already a connection to the database
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export type projectWithInfo = Prisma.ProjectGetPayload<{
  include: {
    tags: true;
    technologies: { select: { name: true } };
  };
}>;

export type blogWithTags = Prisma.BlogGetPayload<{
  include: { tags: true };
}>;

export type experienceEntry = Prisma.ExperienceGetPayload<{}>;

export { prisma };
