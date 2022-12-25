#!/usr/bin/env sh
# Load the .env file https://stackoverflow.com/a/30969768/8206907
set -a; source .env; set +a

echo "database dumping..."
PGPASSWORD=$REMOTE_DB_PASSWORD pg_dump -h $REMOTE_DB_HOST -U $REMOTE_DB_USER $REMOTE_DB_NAME -n public --no-owner > docker-entrypoint-initdb.d/database_dump.sql
echo "database dumped!"
echo " "
echo " "
echo "init sql running..."
psql -U postgres $DATABASE_NAME < docker-entrypoint-initdb.d/init-1.sql
echo "init sql done"
echo " "
echo " "
echo "database dump restoring..."
psql -U postgres $DATABASE_NAME < docker-entrypoint-initdb.d/database_dump.sql
echo "database dump restored"