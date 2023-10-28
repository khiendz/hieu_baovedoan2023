/*
  Warnings:

  - You are about to drop the `BackUpData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Barcodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BorrowedBooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LateFees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAccounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "BookType_Name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BackUpData";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Barcodes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Books";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BorrowedBooks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Employees";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LateFees";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Members";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Payments";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserAccounts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Book" (
    "BookId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Author" TEXT,
    "BookTypeId" INTEGER NOT NULL,
    "ISBN" TEXT,
    "Quantity" INTEGER,
    "Location" TEXT,
    "PublicYear" DATETIME,
    "Img" TEXT,
    CONSTRAINT "Book_BookTypeId_fkey" FOREIGN KEY ("BookTypeId") REFERENCES "BookType" ("BookTypeID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Member" (
    "MemberId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Address" TEXT,
    "Phone" INTEGER,
    "Email" TEXT,
    "JoinDate" DATETIME
);

-- CreateTable
CREATE TABLE "BorrowedBook" (
    "TransactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MemberId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    "BorrowDate" DATETIME,
    "DueDate" DATETIME,
    "ReturnDate" DATETIME,
    "KateFee" INTEGER,
    CONSTRAINT "BorrowedBook_MemberId_fkey" FOREIGN KEY ("MemberId") REFERENCES "Member" ("MemberId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BorrowedBook_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("BookId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LateFee" (
    "LateFeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TransactionId" INTEGER NOT NULL,
    "FeeAmount" INTEGER NOT NULL,
    CONSTRAINT "LateFee_TransactionId_fkey" FOREIGN KEY ("TransactionId") REFERENCES "BorrowedBook" ("TransactionId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "PaymentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LateFeeId" INTEGER,
    "PaymentDate" DATETIME,
    "Amount" REAL,
    "StatePayments" INTEGER,
    CONSTRAINT "Payment_LateFeeId_fkey" FOREIGN KEY ("LateFeeId") REFERENCES "LateFee" ("LateFeeId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "EmployeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Phone" INTEGER,
    "WorkSchedule" TEXT,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Employee_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "UserAccount" ("UserId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT,
    "Password" TEXT,
    "Role" TEXT
);

-- CreateTable
CREATE TABLE "Barcode" (
    "BarcodeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BookId" INTEGER NOT NULL,
    "BarcodeValue" TEXT,
    CONSTRAINT "Barcode_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("BookId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BackupData" (
    "BackupId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BackupTimestamp" TEXT,
    "BackupFile" TEXT
);
