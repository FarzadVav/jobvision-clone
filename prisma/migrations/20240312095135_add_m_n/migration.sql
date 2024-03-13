/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `citites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `componies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `cooperationtypes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `jobads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `provinces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Citites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CooperationTypes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Provinces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `citites` DROP FOREIGN KEY `Citites_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `componies` DROP FOREIGN KEY `Componies_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `componies` DROP FOREIGN KEY `Componies_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `jobads` DROP FOREIGN KEY `JobAds_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `jobads` DROP FOREIGN KEY `JobAds_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `jobads` DROP FOREIGN KEY `JobAds_cooperation_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `Tags_category_id_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `citites` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `province_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `componies` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `city_id` VARCHAR(191) NULL,
    MODIFY `province_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `cooperationtypes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `jobads` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `category_id` VARCHAR(191) NOT NULL,
    MODIFY `cooperation_type_id` VARCHAR(191) NOT NULL,
    MODIFY `company_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `provinces` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tags` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `category_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `TagsOnJobAds` (
    `tag_id` VARCHAR(191) NOT NULL,
    `job_ad_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tag_id`, `job_ad_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Categories_name_key` ON `Categories`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Citites_name_key` ON `Citites`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `CooperationTypes_name_key` ON `CooperationTypes`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Provinces_name_key` ON `Provinces`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Tags_name_key` ON `Tags`(`name`);

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Citites` ADD CONSTRAINT `Citites_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Componies` ADD CONSTRAINT `Componies_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Componies` ADD CONSTRAINT `Componies_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `Citites`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_cooperation_type_id_fkey` FOREIGN KEY (`cooperation_type_id`) REFERENCES `CooperationTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Componies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnJobAds` ADD CONSTRAINT `TagsOnJobAds_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnJobAds` ADD CONSTRAINT `TagsOnJobAds_job_ad_id_fkey` FOREIGN KEY (`job_ad_id`) REFERENCES `JobAds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
