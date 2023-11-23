DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE "projects"(
    "id" SERIAL NOT NULL,
    "org_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start_date" DATE NULL,
    "end_date" DATE NULL,
    "status" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "project_type" TEXT NULL,
    "published" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "projects" ADD PRIMARY KEY("id");
ALTER TABLE
    "projects" ADD CONSTRAINT "projects_org_id_foreign" FOREIGN KEY("org_id") REFERENCES "organizations"("id");
