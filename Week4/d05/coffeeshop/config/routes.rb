Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

root to: 'beans#index'

get 'beans',  to: 'beans#index'
get 'beans/new', to: 'beans#new'
post 'beans',  to: 'beans#create'
get 'beans/:id', to: 'beans#show', as: :bean
get 'beans/:id/edit', to: 'beans#edit', as: :edit_bean
put 'beans', to: 'beans#update'
patch 'beans', to: 'beans#update'
delete 'beans/:id', to: 'beans#destroy'

end
