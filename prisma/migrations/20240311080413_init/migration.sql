-- CreateTable
CREATE TABLE `Componies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `about` VARCHAR(191) NULL,
    `activity` VARCHAR(191) NULL,
    `knowledgeBased` BOOLEAN NULL DEFAULT false,
    `score` INTEGER NULL DEFAULT 5,
    `year` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Componies_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
