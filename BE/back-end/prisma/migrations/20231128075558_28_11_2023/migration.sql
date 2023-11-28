/*
  Warnings:

  - You are about to drop the `BackupData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `Employee` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BackupData";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserAccount";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Phone" INTEGER NOT NULL,
    "AccountId" INTEGER
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "RoleId" INTEGER NOT NULL DEFAULT 0,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Account_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Account_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "RoleAccount" ("RoleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoleAccount" (
    "RoleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RoleName" TEXT NOT NULL,
    "Description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "EmployeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "WorkSchedule" TEXT,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Employee_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("EmployeeId", "UserId", "WorkSchedule") SELECT "EmployeeId", "UserId", "WorkSchedule" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
