DROP TABLE IF EXISTS fundraisers CASCADE;

CREATE TABLE "fundraisers"(
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "amount_raised" DECIMAL(10, 2) NOT NULL,
    "goal_amount" DECIMAL(10, 2) NOT NULL,
    "status" VARCHAR(255) DEFAULT 'Active',
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "fundraisers" ADD PRIMARY KEY("id");
ALTER TABLE
    "fundraisers" ADD CONSTRAINT "fundraisers_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");