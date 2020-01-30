defmodule SalsaWeb.Router do
  use SalsaWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SalsaWeb do
    pipe_through :api

    resources "/tasks", TaskController, except: [:new, :edit]
  end
end
