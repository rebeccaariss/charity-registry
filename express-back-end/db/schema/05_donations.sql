DROP TABLE IF EXISTS donations CASCADE;

CREATE TABLE "donations"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity_donated" INTEGER NOT NULL,
    "donation_date" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "claim_date" TIMESTAMP(0)
    WITH
        TIME zone NULL,
        "fulfilled_date" TIMESTAMP(0)
    WITH
        TIME zone NULL,
        "created_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "donations" ADD PRIMARY KEY("id");
ALTER TABLE
    "donations" ADD CONSTRAINT "donations_item_id_foreign" FOREIGN KEY("item_id") REFERENCES "items"("id");   
ALTER TABLE
    "donations" ADD CONSTRAINT "donations_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");