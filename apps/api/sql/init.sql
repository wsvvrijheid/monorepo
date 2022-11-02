DROP SCHEMA IF EXISTS samenpublic;
CREATE SCHEMA samenpublic;

CREATE USER samen_user WITH ENCRYPTED PASSWORD 'Samen123';

GRANT ALL privileges ON DATABASE samen_db TO samen_user;

ALTER USER samen_user WITH superuser;

GRANT USAGE ON SCHEMA samenpublic TO public;

GRANT CREATE ON SCHEMA samenpublic TO public;