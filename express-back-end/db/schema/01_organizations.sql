DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE "organizations"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "street_number" VARCHAR(255) NOT NULL,
    "street_name" VARCHAR(255) NOT NULL,
    "unit" VARCHAR(255) NULL,
    "city" VARCHAR(255) NOT NULL,
    "province" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "organizations" ADD PRIMARY KEY("id");
