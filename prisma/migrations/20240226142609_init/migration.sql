/*
  Warnings:

  - You are about to drop the column `expires` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "expires",
ADD COLUMN     "expiresAt" TIMESTAMP(3);
