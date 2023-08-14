-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('zh_CN', 'en_US');

-- CreateEnum
CREATE TYPE "MenuItemType" AS ENUM ('Dir', 'MENU', 'BUTTON', 'LINK');

-- CreateTable
CREATE TABLE "system_user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50),
    "phone_number" VARCHAR(25),
    "name" VARCHAR(30),
    "first_name" VARCHAR(30),
    "middle_name" VARCHAR(30),
    "last_name" VARCHAR(30),
    "nick_name" VARCHAR(50),
    "avatar_url" VARCHAR(1000),
    "gender" VARCHAR(255),
    "country" VARCHAR(50),
    "province" VARCHAR(50),
    "city" VARCHAR(50),
    "address" VARCHAR(1000),
    "biography" VARCHAR(2000),
    "website" VARCHAR(1000),
    "profile" VARCHAR(1000),
    "birth_date" DATE,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_number_verified" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "auth_id" INTEGER,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_auth" (
    "id" SERIAL NOT NULL,
    "auth_type" INTEGER NOT NULL,
    "open_id" VARCHAR(255) NOT NULL,
    "auth_token" VARCHAR(255) NOT NULL,
    "data" JSON,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_role" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "remark" VARCHAR(2000),
    "user_capacity" INTEGER,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_user_role" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_permission" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "remark" VARCHAR(2000),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_role_permission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_dictionary" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_dictionary_trans" (
    "id" SERIAL NOT NULL,
    "lang" "Lang" NOT NULL,
    "label" VARCHAR(255),
    "remark" VARCHAR(2000),
    "dictionary_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_dictionary_trans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_dictionary_item" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER DEFAULT 0,
    "dictionary_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_dictionary_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_dictionary_kv_trans" (
    "id" SERIAL NOT NULL,
    "lang" "Lang" NOT NULL,
    "label" VARCHAR(255),
    "remark" VARCHAR(2000),
    "dictionary_kv_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_dictionary_kv_trans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_setting" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_setting_trans" (
    "id" SERIAL NOT NULL,
    "lang" "Lang" NOT NULL,
    "label" VARCHAR(255),
    "remark" VARCHAR(2000),
    "setting_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_setting_trans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_menu_item" (
    "id" SERIAL NOT NULL,
    "type" "MenuItemType" NOT NULL,
    "url" VARCHAR(255),
    "icon" VARCHAR(50),
    "component_path" VARCHAR(255),
    "cached" BOOLEAN NOT NULL DEFAULT false,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "built_in" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "auth_code" VARCHAR(255),
    "parent_id" INTEGER,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_menu_item_trans" (
    "id" SERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "label" VARCHAR(255),
    "remark" VARCHAR(2000),
    "menu_item_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_menu_item_trans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_user_traffic" (
    "id" SERIAL NOT NULL,
    "app" VARCHAR(50),
    "version" VARCHAR(50),
    "env" VARCHAR(50),
    "source" VARCHAR(50),
    "user_agent" VARCHAR(1000),
    "ip" VARCHAR(50),
    "area" VARCHAR(255),
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "enter_at" TIMESTAMPTZ(3),
    "leave_at" TIMESTAMPTZ(3),
    "duration" INTEGER,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_user_traffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_user_traffic_record" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "url" VARCHAR(1000),
    "path" VARCHAR(1000),
    "enter_at" TIMESTAMPTZ(3),
    "leave_at" TIMESTAMPTZ(3),
    "duration" INTEGER,
    "user_traffic_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "system_user_traffic_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_user_username_key" ON "system_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "system_user_email_key" ON "system_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "system_auth_user_id_key" ON "system_auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "system_auth_auth_type_open_id_key" ON "system_auth"("auth_type", "open_id");

-- CreateIndex
CREATE UNIQUE INDEX "system_role_code_key" ON "system_role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "system_permission_code_key" ON "system_permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "system_dictionary_code_key" ON "system_dictionary"("code");

-- CreateIndex
CREATE UNIQUE INDEX "system_dictionary_trans_dictionary_id_lang_key" ON "system_dictionary_trans"("dictionary_id", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "system_dictionary_item_key_key" ON "system_dictionary_item"("key");

-- CreateIndex
CREATE UNIQUE INDEX "system_dictionary_kv_trans_dictionary_kv_id_lang_key" ON "system_dictionary_kv_trans"("dictionary_kv_id", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "system_setting_key_key" ON "system_setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "system_setting_trans_setting_id_lang_key" ON "system_setting_trans"("setting_id", "lang");

-- CreateIndex
CREATE UNIQUE INDEX "system_menu_item_trans_menu_item_id_lang_key" ON "system_menu_item_trans"("menu_item_id", "lang");

-- AddForeignKey
ALTER TABLE "system_auth" ADD CONSTRAINT "system_auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_user_role" ADD CONSTRAINT "system_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_user_role" ADD CONSTRAINT "system_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "system_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_permission" ADD CONSTRAINT "system_role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "system_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_permission" ADD CONSTRAINT "system_role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "system_permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_dictionary_trans" ADD CONSTRAINT "system_dictionary_trans_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "system_dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_dictionary_item" ADD CONSTRAINT "system_dictionary_item_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "system_dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_dictionary_kv_trans" ADD CONSTRAINT "system_dictionary_kv_trans_dictionary_kv_id_fkey" FOREIGN KEY ("dictionary_kv_id") REFERENCES "system_dictionary_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_setting_trans" ADD CONSTRAINT "system_setting_trans_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "system_setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_menu_item" ADD CONSTRAINT "system_menu_item_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "system_menu_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_menu_item_trans" ADD CONSTRAINT "system_menu_item_trans_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "system_menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_user_traffic" ADD CONSTRAINT "system_user_traffic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "system_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_user_traffic_record" ADD CONSTRAINT "system_user_traffic_record_user_traffic_id_fkey" FOREIGN KEY ("user_traffic_id") REFERENCES "system_user_traffic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
