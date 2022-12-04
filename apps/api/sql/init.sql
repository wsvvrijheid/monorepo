DROP SCHEMA IF EXISTS wsvvpublic;
CREATE SCHEMA wsvvpublic;

CREATE USER wsvv_user WITH ENCRYPTED PASSWORD 'Wsvv123';

GRANT ALL privileges ON DATABASE wsvv_db TO wsvv_user;

ALTER USER wsvv_user WITH superuser;

GRANT USAGE ON SCHEMA wsvvpublic TO public;

GRANT CREATE ON SCHEMA wsvvpublic TO public;