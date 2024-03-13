/*
  Warnings:

  - You are about to drop the column `tag_id` on the `jobads` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `jobads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `jobads` DROP FOREIGN KEY `JobAds_tag_id_fkey`;

-- AlterTable
ALTER TABLE `jobads` DROP COLUMN `tag_id`,
    DROP COLUMN `tags`;
