-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "PaymentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "LateFeeId" INTEGER,
    "PaymentDate" DATETIME,
    "Amount" REAL,
    "StatePayments" INTEGER,
    "OrderCode" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Payment_LateFeeId_fkey" FOREIGN KEY ("LateFeeId") REFERENCES "LateFee" ("LateFeeId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("Amount", "LateFeeId", "PaymentDate", "PaymentID", "StatePayments") SELECT "Amount", "LateFeeId", "PaymentDate", "PaymentID", "StatePayments" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_OrderCode_key" ON "Payment"("OrderCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
