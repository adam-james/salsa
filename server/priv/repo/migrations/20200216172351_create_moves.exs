defmodule Salsa.Repo.Migrations.CreateMoves do
  use Ecto.Migration

  def change do
    create table(:moves) do
      add :name, :string
      add :notes, :string
      add :type, :string

      timestamps()
    end
  end
end
