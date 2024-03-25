/*
  Warnings:

  - You are about to drop the `_jobadstotags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_jobadstotags` DROP FOREIGN KEY `_JobAdsToTags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_jobadstotags` DROP FOREIGN KEY `_JobAdsToTags_B_fkey`;

-- DropTable
DROP TABLE `_jobadstotags`;

-- CreateTable
CREATE TABLE `TagsOnJobAds` (
    `tag_id` VARCHAR(191) NOT NULL,
    `job_ad_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tag_id`, `job_ad_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TagsOnJobAds` ADD CONSTRAINT `TagsOnJobAds_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnJobAds` ADD CONSTRAINT `TagsOnJobAds_job_ad_id_fkey` FOREIGN KEY (`job_ad_id`) REFERENCES `JobAds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
