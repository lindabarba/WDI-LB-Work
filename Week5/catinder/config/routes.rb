Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

# root 'welcome#index'

  get 'cats', to: 'cats#index'

  get 'cats/:id', to: 'cats#show', as: :cat

  get 'dog', to: 'cats#dog'

  get 'iguana', to: 'cats#iguana'

end
