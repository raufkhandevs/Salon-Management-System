/*
  Warnings:

  - You are about to drop the `_invoices_on_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cashier_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `invoices_client_id_fkey` ON `invoices`;

-- DropIndex
DROP INDEX `invoices_coupon_id_fkey` ON `invoices`;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `cashier_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_invoices_on_services`;

-- CreateTable
CREATE TABLE `InvoicesOnServices` (
    `user_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `invoice_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `service_id`, `invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_cashier_id_fkey` FOREIGN KEY (`cashier_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_coupon_id_fkey` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoicesOnServices` ADD CONSTRAINT `InvoicesOnServices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoicesOnServices` ADD CONSTRAINT `InvoicesOnServices_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvoicesOnServices` ADD CONSTRAINT `InvoicesOnServices_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_roles_on_users` ADD CONSTRAINT `_roles_on_users_A_fkey` FOREIGN KEY (`A`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_roles_on_users` ADD CONSTRAINT `_roles_on_users_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_permissions_on_roles` ADD CONSTRAINT `_permissions_on_roles_A_fkey` FOREIGN KEY (`A`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_permissions_on_roles` ADD CONSTRAINT `_permissions_on_roles_B_fkey` FOREIGN KEY (`B`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_groups_on_services` ADD CONSTRAINT `_groups_on_services_A_fkey` FOREIGN KEY (`A`) REFERENCES `groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_groups_on_services` ADD CONSTRAINT `_groups_on_services_B_fkey` FOREIGN KEY (`B`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
