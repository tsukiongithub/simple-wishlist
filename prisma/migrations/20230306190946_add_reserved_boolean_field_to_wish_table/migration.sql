-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "linkToProduct" TEXT,
    "reserved" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Wish" ("id", "linkToProduct", "name") SELECT "id", "linkToProduct", "name" FROM "Wish";
DROP TABLE "Wish";
ALTER TABLE "new_Wish" RENAME TO "Wish";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
