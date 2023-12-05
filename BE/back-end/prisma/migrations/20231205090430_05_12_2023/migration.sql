/*
  Warnings:

  - Made the column `Phone` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "AccountId" INTEGER
);
INSERT INTO "new_User" ("AccountId", "Address", "FirstName", "LastName", "Phone", "UserId") SELECT "AccountId", "Address", "FirstName", "LastName", "Phone", "UserId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");
CREATE TABLE "new_Member" (
    "MemberId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Address" TEXT,
    "Phone" TEXT NOT NULL,
    "Email" TEXT,
    "JoinDate" DATETIME,
    "MemberRoleId" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Member" ("Address", "Email", "JoinDate", "MemberId", "MemberRoleId", "Name", "Phone") SELECT "Address", "Email", "JoinDate", "MemberId", "MemberRoleId", "Name", "Phone" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_Phone_key" ON "Member"("Phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
