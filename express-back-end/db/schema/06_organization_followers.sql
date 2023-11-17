DROP TABLE IF EXISTS organization_followers CASCADE;

CREATE TABLE "organization_followers"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "org_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "organization_followers" ADD PRIMARY KEY("id");  
ALTER TABLE
    "organization_followers" ADD CONSTRAINT "organization_followers_org_id_foreign" FOREIGN KEY("org_id") REFERENCES "organizations"("id");
ALTER TABLE
    "organization_followers" ADD CONSTRAINT "organization_followers_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");