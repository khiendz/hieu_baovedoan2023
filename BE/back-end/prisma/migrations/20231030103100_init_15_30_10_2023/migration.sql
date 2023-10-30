-- CreateTable
CREATE TABLE "Publisher" (
    "PublisherId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Address" TEXT,
    "PHONE" TEXT,
    "Website" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "BookId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Author" TEXT,
    "BookTypeId" INTEGER NOT NULL,
    "ISBN" TEXT,
    "Quantity" INTEGER,
    "Location" TEXT,
    "PublicYear" DATETIME,
    "Img" TEXT,
    "PublisherId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Book_BookTypeId_fkey" FOREIGN KEY ("BookTypeId") REFERENCES "BookType" ("BookTypeID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_PublisherId_fkey" FOREIGN KEY ("PublisherId") REFERENCES "Publisher" ("PublisherId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("Author", "BookId", "BookTypeId", "ISBN", "Img", "Location", "PublicYear", "Quantity", "Title") SELECT "Author", "BookId", "BookTypeId", "ISBN", "Img", "Location", "PublicYear", "Quantity", "Title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
