defmodule SalsaWeb.Schema.TodosTypes do
  use Absinthe.Schema.Notation

  object :task do
    field :id, :id
    field :completed, :boolean
    field :description, :string
  end
end
