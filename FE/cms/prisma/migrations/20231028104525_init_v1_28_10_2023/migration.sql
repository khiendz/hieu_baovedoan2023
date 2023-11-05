/*
  Warnings:

  - You are about to drop the `Barcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BorrowedBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LateFee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAccount` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `BackUpData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `backup_file` on the `BackUpData` table. All the data in the column will be lost.
  - You are about to drop the column `backup_id` on the `BackUpData` table. All the data in the column will be lost.
  - You are about to drop the column `backup_timestamp` on the `BackUpData` table. All the data in the column will be lost.
  - Added the required column `BackupId` to the `BackUpData` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Barcode";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Book";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BorrowedBook";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Employee";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LateFee";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Member";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserAccount";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Books" (
    "BookId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Author" TEXT,
    "BookTypeId" INTEGER,
    "ISBN" TEXT,
    "Quantity" INTEGER,
    "Location" TEXT,
    "PublicYear" DATETIME,
    "Img" TEXT
);

-- CreateTable
CREATE TABLE "BookType" (
    "BookTypeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "Img" TEXT
);

-- CreateTable
CREATE TABLE "Members" (
    "MemberId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Address" TEXT,
    "Phone" INTEGER,
    "Email" TEXT,
    "JoinDate" DATETIME
);

-- CreateTable
CREATE TABLE "BorrowedBooks" (
    "TransactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MemberId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    "BorrowDate" DATETIME,
    "DueDate" DATETIME,
    "ReturnDate" DATETIME,
    "KateFee" INTEGER
);

-- CreateTable
CREATE TABLE "LateFees" (
    "LateFeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TransactionId" INTEGER NOT NULL,
    "FeeAmount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Payments" (
    "PaymentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LateFeeId" INTEGER NOT NULL,
    "PaymentDate" DATETIME NOT NULL,
    "Amount" REAL NOT NULL,
    "StatePayments" INTEGER
);

-- CreateTable
CREATE TABLE "Employees" (
    "EmployeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Phone" INTEGER,
    "WorkSchedule" TEXT,
    "UserId" INTEGER
);

-- CreateTable
CREATE TABLE "UserAccounts" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" TEXT
);

-- CreateTable
CREATE TABLE "Barcodes" (
    "BarcodeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BookId" INTEGER NOT NULL,
    "BarcodeValue" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BackUpData" (
    "BackupId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BackupTimestamp" TEXT,
    "BackupFile" TEXT
);
DROP TABLE "BackUpData";
ALTER TABLE "new_BackUpData" RENAME TO "BackUpData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Books_Title_key" ON "Books"("Title");

-- CreateIndex
CREATE UNIQUE INDEX "Books_ISBN_key" ON "Books"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "BookType_Name_key" ON "BookType"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Members_Email_key" ON "Members"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccounts_Username_key" ON "UserAccounts"("Username");
