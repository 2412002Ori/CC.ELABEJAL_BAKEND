-- CreateEnum
CREATE TYPE "month_name" AS ENUM ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'inactive', 'pending');

-- CreateTable
CREATE TABLE "areas" (
    "area_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "contract_requests" (
    "request_id" SERIAL NOT NULL,
    "id_number" VARCHAR(20) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "request_date" DATE NOT NULL,
    "activity" TEXT,
    "email" VARCHAR,
    "phone" VARCHAR,

    CONSTRAINT "contract_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "contract_id" SERIAL NOT NULL,
    "registered_user" INTEGER,
    "contract_number" VARCHAR(50) NOT NULL,
    "location_id" INTEGER,
    "rent_amount" DECIMAL(10,2),
    "activity" TEXT,
    "duration_description" TEXT,
    "init_date" DATE,
    "end_date" DATE,
    "business_name" VARCHAR(100),
    "entry_time" TIME(6),
    "exit_time" TIME(6),
    "id_number" VARCHAR,
    "daysWork" JSONB,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("contract_id")
);

-- CreateTable
CREATE TABLE "fines" (
    "fine_id" SERIAL NOT NULL,
    "contract_id" INTEGER,
    "amount" DECIMAL(10,2),
    "payment_date" DATE,
    "reason" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "fines_pkey" PRIMARY KEY ("fine_id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "item_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "inventory_loans" (
    "loan_id" SERIAL NOT NULL,
    "item_id" INTEGER,
    "loan_date" DATE,
    "return_date" DATE,
    "description" TEXT,
    "status" BOOLEAN,
    "number_id" VARCHAR,

    CONSTRAINT "inventory_loans_pkey" PRIMARY KEY ("loan_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "description" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "maintenance_id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "name" VARCHAR(100),
    "description" TEXT,
    "maintenance_date" DATE,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2),
    "payment_date" DATE,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "page_month" "month_name",
    "year_payment" INTEGER,
    "description" TEXT,
    "contract_number" VARCHAR,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "tenant_id" SERIAL NOT NULL,
    "id_number" VARCHAR(20) NOT NULL,
    "rif" VARCHAR(20),
    "full_name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(100),
    "address" TEXT,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("tenant_id")
);

-- CreateTable
CREATE TABLE "transfers" (
    "transfer_id" SERIAL NOT NULL,
    "reason" TEXT,
    "transfer_date" DATE NOT NULL,
    "id_number" VARCHAR,
    "new_contract" VARCHAR,
    "old_contract" VARCHAR,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("transfer_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "password" VARCHAR(255),
    "role_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "status" "user_status",
    "name " VARCHAR,
    "lastname" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "areas_name_key" ON "areas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_id_number" ON "contract_requests"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_contract_number_key" ON "contracts"("contract_number");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_id_number_key" ON "tenants"("id_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_registered_user_fkey" FOREIGN KEY ("registered_user") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "fk_contracts_tenant_id_to_id_number" FOREIGN KEY ("id_number") REFERENCES "tenants"("id_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fines" ADD CONSTRAINT "fines_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("contract_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventory_loans" ADD CONSTRAINT "inventory_loans_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "inventories"("item_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("area_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("area_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "contracts" FOREIGN KEY ("contract_number") REFERENCES "contracts"("contract_number") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
