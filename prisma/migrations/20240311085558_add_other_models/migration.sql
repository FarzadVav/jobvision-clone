/*
  Warnings:

  - You are about to drop the column `createdAt` on the `componies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `componies` DROP COLUMN `createdAt`,
    ADD COLUMN `city_id` INTEGER NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `employees` JSON NOT NULL,
    ADD COLUMN `province_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Citites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `province_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CooperationTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobAds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `work_times` VARCHAR(191) NOT NULL,
    `business_trips` VARCHAR(191) NOT NULL,
    `age` JSON NOT NULL,
    `salary` JSON NOT NULL,
    `benefits` JSON NOT NULL,
    `abilities` JSON NOT NULL,
    `education` JSON NOT NULL,
    `languages` JSON NOT NULL,
    `techs` JSON NOT NULL,
    `gender` BOOLEAN NOT NULL,
    `end_military_ervice` BOOLEAN NOT NULL,
    `is_urgent` BOOLEAN NOT NULL,
    `is_remote` BOOLEAN NOT NULL,
    `category_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `cooperation_type_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_cooperation_type_id_fkey` FOREIGN KEY (`cooperation_type_id`) REFERENCES `CooperationTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Componies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
