class BeansController < ApplicationController

  def index
    @beans = Bean.all
  end

  def new
    @beans = Bean.new
  end

  def create
    @beans = Bean.new(params.require(:bean).permit(:name, :roast, :origin, :quantity))

    if @bean.save
      redirect_to_beans_path
    else
      render :new
    end
  end

  def show
    @bean = Bean.find(params[:id])
  end

  def delete
    @bean = Bean.find(params[:id])
    @bean.destroy
    redirect_to_beans_path
  end

end
