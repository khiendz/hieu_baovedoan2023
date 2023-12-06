-- CreateTable
CREATE TABLE "EmployeeType" (
    "EmployeeTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "EmployeeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "WorkSchedule" TEXT,
    "Name" TEXT NOT NULL DEFAULT '',
    "Phone" TEXT NOT NULL DEFAULT '',
    "EmployeeTypeId" INTEGER NOT NULL DEFAULT 0,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Employee_EmployeeTypeId_fkey" FOREIGN KEY ("EmployeeTypeId") REFERENCES "EmployeeType" ("EmployeeTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("EmployeeId", "UserId", "WorkSchedule") SELECT "EmployeeId", "UserId", "WorkSchedule" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_Phone_key" ON "Employee"("Phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
