-- CreateTable
CREATE TABLE "Article" (
    "ArticleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Thumb" TEXT NOT NULL,
    "Content" TEXT NOT NULL
);
