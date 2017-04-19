Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :scientists do
    # resources :experiments, only: [:index, :new, :create]
    # resources :experiments, shallow: true, except: [:index]
    resources :experiments, shallow: true do
      resources :logs
    end
  end
  # this line below works
  # resources :experiments, only: [:show, :edit, :update, :destroy]
  # resources :experiments, except: [:index, :new, :create]

end
