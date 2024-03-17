-- AlterTable
ALTER TABLE `companies` MODIFY `about` TEXT NULL,
    MODIFY `activity` TEXT NULL;

-- AlterTable
ALTER TABLE `jobads` MODIFY `description` TEXT NOT NULL,
    MODIFY `work_times` TEXT NOT NULL,
    MODIFY `business_trips` TEXT NOT NULL;
