-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_orderId_fkey";

-- AlterTable
ALTER TABLE "Queue" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
