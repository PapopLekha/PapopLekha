-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('WORK', 'EDUCATION', 'ORGANISATION');

-- AlterTable
ALTER TABLE "_ProjectToTag" ADD CONSTRAINT "_ProjectToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProjectToTag_AB_unique";

-- AlterTable
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProjectToTechnology_AB_unique";

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "banner" TEXT,
    "content" TEXT[],

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BlogTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "ExperienceType" NOT NULL,
    "institution" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "description" TEXT[],
    "logo" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogToBlogTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BlogToBlogTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTag_name_key" ON "BlogTag"("name");

-- CreateIndex
CREATE INDEX "_BlogToBlogTag_B_index" ON "_BlogToBlogTag"("B");

-- AddForeignKey
ALTER TABLE "_BlogToBlogTag" ADD CONSTRAINT "_BlogToBlogTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToBlogTag" ADD CONSTRAINT "_BlogToBlogTag_B_fkey" FOREIGN KEY ("B") REFERENCES "BlogTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
