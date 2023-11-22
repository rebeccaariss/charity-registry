DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE "items"(
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "item_description" TEXT NOT NULL,
    "quantity_needed" INTEGER NOT NULL,
    "urgent" BOOLEAN NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "item_price" DECIMAL(8, 2) NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "items" ADD PRIMARY KEY("id");
ALTER TABLE
    "items" ADD CONSTRAINT "items_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");
