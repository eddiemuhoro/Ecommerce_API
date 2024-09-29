/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `favourite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usellaReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `buyer_id` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `favourite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `buyer_id` on the `favourite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `follow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followerId` on the `follow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followingId` on the `follow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `belongsTo` on the `history` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `buyer_id` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_id` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seller_id` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `usellaReviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "favourite" DROP CONSTRAINT "favourite_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_belongsTo_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "usellaReviews" DROP CONSTRAINT "usellaReviews_id_fkey";

-- DropIndex
DROP INDEX "follow_followingId_followerId_key";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "buyer_id",
ADD COLUMN     "buyer_id" UUID NOT NULL,
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "favourite" DROP CONSTRAINT "favourite_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "buyer_id",
ADD COLUMN     "buyer_id" UUID NOT NULL,
ADD CONSTRAINT "favourite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "follow" DROP CONSTRAINT "follow_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "followerId",
ADD COLUMN     "followerId" UUID NOT NULL,
DROP COLUMN "followingId",
ADD COLUMN     "followingId" UUID NOT NULL,
ADD CONSTRAINT "follow_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "history" DROP CONSTRAINT "history_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "images" DROP DEFAULT,
DROP COLUMN "belongsTo",
ADD COLUMN     "belongsTo" UUID NOT NULL,
ADD CONSTRAINT "history_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "buyer_id",
ADD COLUMN     "buyer_id" UUID NOT NULL,
DROP COLUMN "product_id",
ADD COLUMN     "product_id" UUID NOT NULL,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payment" DROP CONSTRAINT "payment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "images" DROP DEFAULT,
DROP COLUMN "seller_id",
ADD COLUMN     "seller_id" UUID NOT NULL,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "review" DROP CONSTRAINT "review_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usellaReviews" DROP CONSTRAINT "usellaReviews_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "usellaReviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT true,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "follow_followerId_idx" ON "follow"("followerId");

-- CreateIndex
CREATE INDEX "follow_followingId_idx" ON "follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "follow_followerId_followingId_key" ON "follow"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourite" ADD CONSTRAINT "favourite_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usellaReviews" ADD CONSTRAINT "usellaReviews_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_belongsTo_fkey" FOREIGN KEY ("belongsTo") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
