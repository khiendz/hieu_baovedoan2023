-- CreateTable
CREATE TABLE "_BookToBookType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookToBookType_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("BookId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToBookType_B_fkey" FOREIGN KEY ("B") REFERENCES "BookType" ("BookTypeId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBookType_AB_unique" ON "_BookToBookType"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBookType_B_index" ON "_BookToBookType"("B");
