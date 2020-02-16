defmodule Salsa.Moves.Move do
  use Ecto.Schema
  import Ecto.Changeset

  schema "moves" do
    field :name, :string
    field :notes, :string
    field :type, MoveType

    timestamps()
  end

  @doc false
  def changeset(move, attrs) do
    move
    |> cast(attrs, [:name, :notes, :type])
    |> validate_required([:name, :notes, :type])
  end
end
