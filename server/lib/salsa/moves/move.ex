defmodule Salsa.Moves.Move do
  use Ecto.Schema
  import Ecto.Changeset

  schema "moves" do
    field :name, :string
    field :notes, :string
    field :type, MoveType
    field :style, SalsaStyle

    timestamps()
  end

  @doc false
  def changeset(move, attrs) do
    move
    |> cast(attrs, [:name, :notes, :type, :style])
    |> validate_required([:name, :notes, :type, :style])
  end
end
