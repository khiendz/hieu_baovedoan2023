-- CreateTable
CREATE TABLE "MemberRole" (
    "MemberRoleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Value" TEXT NOT NULL,
    "Description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "MemberId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Address" TEXT,
    "Phone" INTEGER,
    "Email" TEXT,
    "JoinDate" DATETIME,
    "MemberRoleId" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Member" ("Address", "Email", "JoinDate", "MemberId", "Name", "Phone") SELECT "Address", "Email", "JoinDate", "MemberId", "Name", "Phone" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
