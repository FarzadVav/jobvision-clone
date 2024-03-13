/*
  Warnings:

  - You are about to drop the `citites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `componies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `citites` DROP FOREIGN KEY `Citites_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `componies` DROP FOREIGN KEY `Componies_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `componies` DROP FOREIGN KEY `Componies_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `jobads` DROP FOREIGN KEY `JobAds_company_id_fkey`;

-- DropTable
DROP TABLE `citites`;

-- DropTable
DROP TABLE `componies`;

-- CreateTable
CREATE TABLE `Cities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cities_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Companies` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `about` VARCHAR(191) NULL,
    `activity` VARCHAR(191) NULL,
    `knowledgeBased` BOOLEAN NULL DEFAULT false,
    `employees` JSON NOT NULL,
    `score` INTEGER NULL DEFAULT 5,
    `year` INTEGER NULL,
    `province_id` VARCHAR(191) NULL,
    `city_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Companies_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cities` ADD CONSTRAINT `Cities_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Companies` ADD CONSTRAINT `Companies_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Companies` ADD CONSTRAINT `Companies_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `Cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
