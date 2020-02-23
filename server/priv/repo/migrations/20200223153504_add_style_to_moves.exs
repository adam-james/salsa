defmodule Salsa.Repo.Migrations.AddStyleToMoves do
  use Ecto.Migration

  def change do
    alter table(:moves) do
      add :style, :string
    end
  end
end
