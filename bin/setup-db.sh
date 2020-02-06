#!/usr/bin/env bash

# TODO can you do this in Terraform?

source ./bin/secret.sh

echo Creating database and database user...

psql -U $PGUSER@salsa-db -h salsa-db.postgres.database.azure.com \
  -c "CREATE DATABASE salsa_prod;" postgres

psql -U $PGUSER@salsa-db -h salsa-db.postgres.database.azure.com \
  -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';" postgres

psql -U $PGUSER@salsa-db -h salsa-db.postgres.database.azure.com \
  -c "GRANT ALL PRIVILEGES ON DATABASE salsa_prod TO $DB_USER;" postgres
