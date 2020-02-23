defmodule Salsa.Moves do
  import Ecto.Query, warn: false
  alias Salsa.Repo

  alias Salsa.Moves.Move

  def list_moves do
    Repo.all(Move)
  end

  def create_move(attrs \\ %{}) do
    %Move{}
    |> Move.changeset(attrs)
    |> Repo.insert()
  end
end
