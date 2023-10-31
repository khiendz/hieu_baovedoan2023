-- CreateTable
CREATE TABLE "LateFeeType" (
    "LateFeeTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "FeeAmount" DECIMAL NOT NULL,
    "DateCount" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "BookId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "BookTypeId" INTEGER NOT NULL,
    "ISBN" TEXT,
    "Quantity" INTEGER,
    "Location" TEXT,
    "PublicYear" DATETIME,
    "Img" TEXT,
    "Barcode" TEXT NOT NULL DEFAULT '',
    "PublisherId" INTEGER NOT NULL DEFAULT 0,
    "AuthorId" INTEGER NOT NULL DEFAULT 0,
    "LateFeeTypeId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Book_BookTypeId_fkey" FOREIGN KEY ("BookTypeId") REFERENCES "BookType" ("BookTypeID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_PublisherId_fkey" FOREIGN KEY ("PublisherId") REFERENCES "Publisher" ("PublisherId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "Author" ("AuthorId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("AuthorId", "Barcode", "BookId", "BookTypeId", "ISBN", "Img", "Location", "PublicYear", "PublisherId", "Quantity", "Title") SELECT "AuthorId", "Barcode", "BookId", "BookTypeId", "ISBN", "Img", "Location", "PublicYear", "PublisherId", "Quantity", "Title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
