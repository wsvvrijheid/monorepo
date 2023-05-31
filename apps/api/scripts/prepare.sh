#!/usr/bin/env sh
# Load the .env file https://stackoverflow.com/a/30969768/8206907
set -a; source .env; set +a
DUMP_FILE=sql/database.dump.sql
INIT_FILE=sql/init.sql

# CREATE DATABASE
echo "Creating database..."
dropdb --if-exists -U mustafa $DATABASE_NAME && createdb -U mustafa $DATABASE_NAME
echo "Database created!"

echo "\n_________________________________________________________\n"

if test -f "${INIT_FILE}"; then
    echo "Initializing database..."
    psql -U mustafa $DATABASE_NAME < sql/init.sql
    echo "Database initialized!"
else
    echo "No init.sql file found!"
fi

echo "\n_________________________________________________________\n"

if [[ "${REMOTE_DB_PASSWORD}" && "${REMOTE_DB_HOST}" && "${REMOTE_DB_USER}" && "${REMOTE_DB_NAME}" ]]; then
    echo "Dumping database..."
    PGPASSWORD=$REMOTE_DB_PASSWORD pg_dump -h $REMOTE_DB_HOST -U $REMOTE_DB_USER $REMOTE_DB_NAME \
    -n public --no-owner -c > sql/database.dump.sql
    echo "Database dumped!"
else
    echo "No remote database credentials found. Skipping database dump."
fi

echo "\n_________________________________________________________\n"

if test -f "$DUMP_FILE"; then
    echo "Restoring database..."
    psql -U mustafa $DATABASE_NAME -Fc < sql/database.dump.sql
    echo "Database restored!"
else
    echo "No database dump found. Skipping database restore."
fi