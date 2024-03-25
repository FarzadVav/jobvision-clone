/*
  Warnings:

  - You are about to drop the column `end_military_ervice` on the `jobads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `jobads` DROP COLUMN `end_military_ervice`,
    ADD COLUMN `end_military_service` BOOLEAN NULL;
