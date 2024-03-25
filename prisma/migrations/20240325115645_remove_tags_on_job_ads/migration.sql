/*
  Warnings:

  - You are about to drop the `tagsonjobads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tagsonjobads` DROP FOREIGN KEY `TagsOnJobAds_job_ad_id_fkey`;

-- DropForeignKey
ALTER TABLE `tagsonjobads` DROP FOREIGN KEY `TagsOnJobAds_tag_id_fkey`;

-- DropTable
DROP TABLE `tagsonjobads`;

-- CreateTable
CREATE TABLE `_JobAdsToTags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_JobAdsToTags_AB_unique`(`A`, `B`),
    INDEX `_JobAdsToTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_JobAdsToTags` ADD CONSTRAINT `_JobAdsToTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `JobAds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobAdsToTags` ADD CONSTRAINT `_JobAdsToTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
