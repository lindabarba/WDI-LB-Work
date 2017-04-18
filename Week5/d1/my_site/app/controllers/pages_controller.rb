class PagesController < ApplicationController

  def show
    # page = params[:page]
    # render "pages/#{page}"
    render "pages/#{params[:page]}"
  end

end
