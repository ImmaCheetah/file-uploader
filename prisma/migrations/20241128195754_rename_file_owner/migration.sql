/*
  Warnings:

  - You are about to drop the column `ownerId` on the `File` table. All the data in the column will be lost.
  - Added the required column `fileOwnerId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_ownerId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "ownerId",
ADD COLUMN     "fileOwnerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileOwnerId_fkey" FOREIGN KEY ("fileOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
