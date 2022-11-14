-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bride" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,

    CONSTRAINT "Bride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groom" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,

    CONSTRAINT "Groom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wedding" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "brideId" TEXT NOT NULL,
    "groomId" TEXT NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_name_key" ON "Wedding"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_brideId_key" ON "Wedding"("brideId");

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_groomId_key" ON "Wedding"("groomId");

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_brideId_fkey" FOREIGN KEY ("brideId") REFERENCES "Bride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_groomId_fkey" FOREIGN KEY ("groomId") REFERENCES "Groom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
