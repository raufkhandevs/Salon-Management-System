/*
  Warnings:

  - Added the required column `bill_date` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `InvoicesOnServices` table without a default value. This is not possible if the table is not empty.

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

-- DropIndex
DROP INDEX `services_group_id_fkey` ON `services`;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `bill_date` DATETIME(3) NOT NULL,
    ADD COLUMN `discount` DECIMAL(65, 30) NULL,
    ADD COLUMN `subtotal` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `total` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `invoicesonservices` ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_cashier_id_fkey` FOREIGN KEY (`cashier_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_coupon_id_fkey` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
