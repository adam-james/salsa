defmodule Salsa.MovesTest do
  use Salsa.DataCase

  alias Salsa.Moves

  describe "moves" do
    alias Salsa.Moves.Move

    @valid_attrs %{name: "name", notes: "notes", type: "step", style: "colombian"}
    @invalid_attrs %{name: "name", notes: "notes", type: "incorrect", style: "missing"}

    def move_fixture(attrs \\ %{}) do
      {:ok, move} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Moves.create_move()
    end

    test "list_moves/0 returns all moves" do
      {:ok, move} = move_fixture()
      assert Moves.list_moves() == [move]
    end

    test "create_move/1 with valid data creates record" do
      assert {:ok, %Move{} = move} = Moves.create_move(@valid_attrs)
      assert move.name == "name"
      assert move.notes == "notes"
      assert move.type == :step
    end

    test "create_move/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Moves.create_move(@invalid_attrs)
    end
  end
end
