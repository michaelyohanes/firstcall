CREATE USER myuser WITH PASSWORD 'mypass' CREATEDB;

CREATE DATABASE mydb;
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

\c mydb postgres
GRANT ALL ON SCHEMA public TO myuser;

-- initial data seeder --
\c mydb myuser
DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 2 CACHE 1;

CREATE TABLE "users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "username" text NOT NULL,
    "firstname" text NOT NULL,
    "lastname" text,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "deletedAt" timestamptz,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "users_username_key" UNIQUE ("username")
) WITH (oids = false);

INSERT INTO "users" ("id", "username", "firstname", "lastname", "createdAt", "updatedAt", "deletedAt") 
VALUES
(1,	'myadmin', 'Administrator', 'Testing', NOW(), NOW(),	NULL),
(2,	'myuser1', 'Marshall', 'Mathers', NOW(), NOW(),	NULL);
