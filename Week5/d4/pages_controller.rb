PagesController < ApplicationContoller
  def show
    render "/pages/#{params[:page]}"
  end
end

# all this for static pages

# routes:
# get "pages/:page", to: "pages#show"

# # for root route

# root "pages#show", page: "welcome"

# get "/welcome", to: "pages#show", page: "welcome"

# for nav bar:
# don't use link_to use:
# <a href="/pages/welcome">welcome</a>
# put that in the logo etc
