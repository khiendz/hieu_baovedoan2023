/*
  Warnings:

  - You are about to drop the column `Name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "EmployeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "WorkSchedule" TEXT,
    "EmployeeTypeId" INTEGER NOT NULL DEFAULT 0,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Employee_EmployeeTypeId_fkey" FOREIGN KEY ("EmployeeTypeId") REFERENCES "EmployeeType" ("EmployeeTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("EmployeeId", "EmployeeTypeId", "UserId", "WorkSchedule") SELECT "EmployeeId", "EmployeeTypeId", "UserId", "WorkSchedule" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
