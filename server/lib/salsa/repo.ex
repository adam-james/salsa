defmodule Salsa.Repo do
  use Ecto.Repo,
    otp_app: :salsa,
    adapter: Ecto.Adapters.Postgres
end
