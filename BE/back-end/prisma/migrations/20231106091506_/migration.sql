/*
  Warnings:

  - You are about to drop the column `BookTypeId` on the `Book` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_BookToBookType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookToBookType_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("BookId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToBookType_B_fkey" FOREIGN KEY ("B") REFERENCES "BookType" ("BookTypeID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "BookId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "ISBN" TEXT,
    "Quantity" INTEGER,
    "Location" TEXT,
    "PublicYear" DATETIME,
    "Img" TEXT,
    "Barcode" TEXT NOT NULL DEFAULT '',
    "PublisherId" INTEGER NOT NULL DEFAULT 0,
    "AuthorId" INTEGER NOT NULL DEFAULT 0,
    "LateFeeTypeId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Book_PublisherId_fkey" FOREIGN KEY ("PublisherId") REFERENCES "Publisher" ("PublisherId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "Author" ("AuthorId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("AuthorId", "Barcode", "BookId", "ISBN", "Img", "LateFeeTypeId", "Location", "PublicYear", "PublisherId", "Quantity", "Title") SELECT "AuthorId", "Barcode", "BookId", "ISBN", "Img", "LateFeeTypeId", "Location", "PublicYear", "PublisherId", "Quantity", "Title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBookType_AB_unique" ON "_BookToBookType"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBookType_B_index" ON "_BookToBookType"("B");
