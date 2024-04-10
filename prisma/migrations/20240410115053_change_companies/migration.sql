/*
  Warnings:

  - You are about to drop the column `province_id` on the `companies` table. All the data in the column will be lost.
  - Made the column `knowledgeBased` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `companies` DROP FOREIGN KEY `Companies_province_id_fkey`;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `province_id`,
    MODIFY `knowledgeBased` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `score` INTEGER NOT NULL DEFAULT 5;
