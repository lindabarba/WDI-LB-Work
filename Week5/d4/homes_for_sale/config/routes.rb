Rails.application.routes.draw do
  root "houses#index"
  resources :houses
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:new, :create]
  # session will need to get to form for new session to login, create
  # the session, destroy to logout
  resources :sessions, only: [:new, :create, :destroy]

  get "/login", to: "sessions#new"
  # use this for development purposes
  get "/logout", to: "sessions#destroy"
end
