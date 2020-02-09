defmodule SalsaWeb.Resolvers.Todos do
  def list_tasks(_parent, %{completed: completed}, _resolution) do
    {:ok, Salsa.Todos.list_tasks(completed)}
  end
  def list_tasks(_parent, _args, _resolution) do
    {:ok, Salsa.Todos.list_tasks()}
  end

  def create_task(_parent, args, _resolution) do
    Salsa.Todos.create_task(args)
  end
end
