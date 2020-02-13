# Salsa

An application for studying those new steps you learned.

## To run

For the first time:

1. Install Docker.
2. Run `docker-compose up`
3. Run `docker-compose run server mix ecto.create`
4. Run `docker-compose run server mix ecto.migrate`

Subsequent runs on the same computer only require `docker-compose up`.
