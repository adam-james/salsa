defmodule SalsaWeb.Schema.TodosTypes do
  use Absinthe.Schema.Notation

  object :task do
    field :id, :id
    field :completed, :boolean
    field :description, :string
  end

  @desc "The type of move."
  enum :move_type do
    value(:step, description: "A step.")
    value(:turn, description: "A turn or spin.")
  end

  @desc "A style of salsa."
  enum :salsa_style do
    value(:cuban)
    value(:colombian)
    value(:on_one)
    value(:on_two)
  end

  @desc "A move."
  object :move do
    field :id, :id
    field :type, :move_type
    field :name, :string
    field :notes, :string
    field :style, :salsa_style
  end
end
