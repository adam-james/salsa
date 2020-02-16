defmodule SalsaWeb.Resolvers.Moves do
  def list_moves(_parent, _args, _resolution) do
    {:ok, Salsa.Moves.list_moves()}
  end

  def create_move(_parent, args, _resolution) do
    Salsa.Moves.create_move(args)
  end
end
