-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provinces` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Provinces_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cities` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cities_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CooperationTypes` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CooperationTypes_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Companies` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `about` TEXT NULL,
    `activity` TEXT NULL,
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

-- CreateTable
CREATE TABLE `JobAds` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `work_times` TEXT NOT NULL,
    `business_trips` TEXT NOT NULL,
    `age` JSON NOT NULL,
    `salary` JSON NOT NULL,
    `benefits` JSON NOT NULL,
    `abilities` JSON NOT NULL,
    `education` JSON NOT NULL,
    `languages` JSON NOT NULL,
    `techs` JSON NOT NULL,
    `gender` BOOLEAN NULL,
    `end_military_service` BOOLEAN NULL,
    `is_urgent` BOOLEAN NOT NULL,
    `is_remote` BOOLEAN NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `cooperation_type_id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagsOnJobAds` (
    `tag_id` VARCHAR(191) NOT NULL,
    `job_ad_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tag_id`, `job_ad_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cities` ADD CONSTRAINT `Cities_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Companies` ADD CONSTRAINT `Companies_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `Provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Companies` ADD CONSTRAINT `Companies_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `Cities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_cooperation_type_id_fkey` FOREIGN KEY (`cooperation_type_id`) REFERENCES `CooperationTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAds` ADD CONSTRAINT `JobAds_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnJobAds` ADD CONSTRAINT `TagsOnJobAds_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagsOnJobAds` ADD CONSTRAINT `TagsOnJobAds_job_ad_id_fkey` FOREIGN KEY (`job_ad_id`) REFERENCES `JobAds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
