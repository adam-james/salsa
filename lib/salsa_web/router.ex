defmodule SalsaWeb.Router do
  use SalsaWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    resources "/tasks", SalsaWeb.TaskController, except: [:new, :edit]

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: SalsaWeb.Schema
    forward "/graphql", Absinthe.Plug, schema: SalsaWeb.Schema
  end
end
