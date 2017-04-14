class BeansController < ApplicationController

  def index
    @beans = Bean.all
  end

  def show
    @bean = Bean.find(params[:id])
  end

end
