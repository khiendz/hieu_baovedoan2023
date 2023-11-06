/*
  Warnings:

  - You are about to drop the `_BookToBookType` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `BookType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookTypeID` on the `BookType` table. All the data in the column will be lost.
  - Added the required column `BookTypeId` to the `BookType` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_BookToBookType_B_index";

-- DropIndex
DROP INDEX "_BookToBookType_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookToBookType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Book_BookType" (
    "Book_BookTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BookId" INTEGER NOT NULL,
    "BookTypeId" INTEGER NOT NULL,
    CONSTRAINT "Book_BookType_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("BookId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_BookType_BookTypeId_fkey" FOREIGN KEY ("BookTypeId") REFERENCES "BookType" ("BookTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookType" (
    "BookTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Img" TEXT
);
INSERT INTO "new_BookType" ("Description", "Img", "Name") SELECT "Description", "Img", "Name" FROM "BookType";
DROP TABLE "BookType";
ALTER TABLE "new_BookType" RENAME TO "BookType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
