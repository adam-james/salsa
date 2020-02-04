FROM elixir:1.9.0-alpine as build

# install build dependencies
RUN apk add --update git build-base nodejs yarn python

# prepare build dir
RUN mkdir /app
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# set build ENV
ENV MIX_ENV=prod

# install mix dependencies
COPY mix.exs mix.lock ./
COPY config config
RUN mix deps.get
RUN mix deps.compile

# build project
COPY lib lib
COPY priv priv
RUN mix compile

# build release (uncomment COPY if rel/ exists)
# COPY rel rel
RUN mix release

# prepare release image
FROM alpine:3.9 AS app
RUN apk add --update bash openssl postgresql-client

RUN mkdir /app
WORKDIR /app

COPY --from=build /app/_build/prod/rel/salsa ./
RUN chown -R nobody: /app
USER nobody

ENV HOME=/app

COPY entrypoint.sh .

CMD [ "/bin/bash", "entrypoint.sh" ]
