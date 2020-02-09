defmodule SalsaWeb.Schema do
  use Absinthe.Schema
  import_types SalsaWeb.Schema.TodosTypes

  alias SalsaWeb.Resolvers

  query do

    @desc "Get all tasks"
    field :tasks, list_of(:task) do
      arg :completed, :boolean
      resolve &Resolvers.Todos.list_tasks/3
    end

  end

  mutation do

    @desc "Create a task"
    field :create_task, type: :task do
      arg :completed, non_null(:boolean)
      arg :description, non_null(:string)

      resolve &Resolvers.Todos.create_task/3
    end
  end
end
