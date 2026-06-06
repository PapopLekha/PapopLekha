import { PrismaClient, ExperienceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ── Experience ──────────────────────────────────────────────────────────────
  const experiences: {
    type: ExperienceType;
    institution: string;
    role: string;
    from: string;
    to: string;
    description: string[];
    logo?: string;
    order: number;
  }[] = [
    {
      type: ExperienceType.WORK,
      institution: "GNS-Systems",
      role: "HPC System Engineer",
      from: "2026",
      to: "present",
      description: [
        "Part of the team migrating the legacy cluster management system to an Ansible-based solution",
      ],
      logo: "/experience/gns.jpg",
      order: 0,
    },
    {
      type: ExperienceType.WORK,
      institution: "Redcare Pharmacy",
      role: "Working Student",
      from: "2023",
      to: "2026",
      description: [
        "Automated monitoring and reporting of Gematik E-prescription updates, with scheduled reminders to reduce manual tracking",
        "Built tools for bulk refactoring of E-prescription data, speeding up test case generation and development",
        "Scripted extraction and formatting of E-Health card data from terminal devices for use in testing workflows",
      ],
      logo: "/experience/rcp.jpg",
      order: 1,
    },
    {
      type: ExperienceType.EDUCATION,
      institution: "RWTH Aachen University",
      role: "B.Sc. Computer Science",
      from: "2022",
      to: "2025",
      description: [
        "Focus on High Performance Computing",
        "Thesis: Evaluating Automated Memory Management Strategies for Heterogeneous Architectures using Microbenchmarking",
      ],
      logo: "/experience/rwth.png",
      order: 0,
    },
    {
      type: ExperienceType.EDUCATION,
      institution: "Assumption College",
      role: "High School",
      from: "2019",
      to: "2022",
      description: [
        "GPA 3.6 / 4.0",
        "President of Assumption College Interact Club",
        "Head of COM department Cheer team",
      ],
      logo: "/experience/assumption.png",
      order: 1,
    },
    {
      type: ExperienceType.ORGANISATION,
      institution: "SPACE AC",
      role: "Software Developer",
      from: "2020",
      to: "2022",
      description: [
        "Research & development of multiple CanSat projects",
        "Software Developer of High Altitude Balloon project",
        "Sorbital based fuel rocket research & development",
      ],
      logo: "/experience/spaceac.jpg",
      order: 0,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.upsert({
      where: {
        // use a stable composite key via institution+role+from
        id: (
          await prisma.experience.findFirst({
            where: { institution: exp.institution, role: exp.role, from: exp.from },
            select: { id: true },
          })
        )?.id ?? "new",
      },
      update: exp,
      create: exp,
    });
  }
  console.log(`Seeded ${experiences.length} experience entries`);

  // ── Blog ────────────────────────────────────────────────────────────────────
  const testTag = await prisma.blogTag.upsert({
    where: { name: "test" },
    update: {},
    create: { name: "test" },
  });
  const devTag = await prisma.blogTag.upsert({
    where: { name: "development" },
    update: {},
    create: { name: "development" },
  });

  await prisma.blog.upsert({
    where: { slug: "test" },
    update: {},
    create: {
      slug: "test",
      title: "Test",
      published: true,
      date: new Date("2026-06-06"),
      excerpt: "A first blog post to verify the layout, typography, and routing of the blog section.",
      content: [
        "Welcome to my blog! This is a test post to verify the layout and styling of the blog section.",
        "The blog now uses the same PostgreSQL database as the rest of the site. Each post is a row in the Blog table with a slug, title, date, excerpt, content paragraphs, and tags.",
        "Each post has a title, date, tags, an excerpt shown on the listing card, and an array of paragraphs that form the body of the full post page.",
        "More posts coming soon once the site is properly set up. For now, this placeholder confirms that routing, the banner image fallback, the Hypertext title animation, and the content layout are all working correctly.",
      ],
      tags: { connect: [{ id: testTag.id }, { id: devTag.id }] },
    },
  });
  console.log("Seeded test blog post");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
