/*
  Warnings:

  - You are about to drop the `_groups_on_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `group_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `invoices_cashier_id_fkey` ON `invoices`;

-- DropIndex
DROP INDEX `invoices_client_id_fkey` ON `invoices`;

-- DropIndex
DROP INDEX `invoices_coupon_id_fkey` ON `invoices`;

-- DropIndex
DROP INDEX `InvoicesOnServices_invoice_id_fkey` ON `invoicesonservices`;

-- DropIndex
DROP INDEX `InvoicesOnServices_service_id_fkey` ON `invoicesonservices`;

-- AlterTable
ALTER TABLE `services` ADD COLUMN `group_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_groups_on_services`;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
