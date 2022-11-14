-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
