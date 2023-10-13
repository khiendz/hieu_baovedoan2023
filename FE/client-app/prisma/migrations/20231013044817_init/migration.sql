-- CreateTable
CREATE TABLE "Book" (
    "book_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "ISBN" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "public_year" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Member" (
    "member_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "joinDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BorrowedBook" (
    "transaction_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "member_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "borrow_date" DATETIME NOT NULL,
    "due_date" DATETIME NOT NULL,
    "return_date" DATETIME,
    "late_fee" INTEGER,
    CONSTRAINT "BorrowedBook_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member" ("member_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BorrowedBook_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book" ("book_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LateFee" (
    "late_fee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transaction_id" INTEGER NOT NULL,
    "fee_amount" INTEGER NOT NULL,
    CONSTRAINT "LateFee_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "BorrowedBook" ("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "work_schedule" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Barcode" (
    "barcode_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" INTEGER NOT NULL,
    "barcode_value" TEXT NOT NULL,
    CONSTRAINT "Barcode_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book" ("book_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BackUpData" (
    "backup_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "backup_timestamp" TEXT NOT NULL,
    "backup_file" TEXT NOT NULL
);
