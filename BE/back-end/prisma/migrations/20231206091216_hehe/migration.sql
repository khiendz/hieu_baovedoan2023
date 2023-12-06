/*
  Warnings:

  - You are about to drop the column `KateFee` on the `BorrowedBook` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BorrowedBook" (
    "TransactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MemberId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    "BorrowDate" DATETIME,
    "DueDate" DATETIME,
    "ReturnDate" DATETIME,
    CONSTRAINT "BorrowedBook_MemberId_fkey" FOREIGN KEY ("MemberId") REFERENCES "Member" ("MemberId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BorrowedBook_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("BookId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BorrowedBook" ("BookId", "BorrowDate", "DueDate", "MemberId", "ReturnDate", "TransactionId") SELECT "BookId", "BorrowDate", "DueDate", "MemberId", "ReturnDate", "TransactionId" FROM "BorrowedBook";
DROP TABLE "BorrowedBook";
ALTER TABLE "new_BorrowedBook" RENAME TO "BorrowedBook";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
