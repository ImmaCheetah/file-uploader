/*
  Warnings:

  - A unique constraint covering the columns `[fileUuid]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_fileUuid_key" ON "File"("fileUuid");
