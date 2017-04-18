class BeansController < ApplicationController

  def index
    @beans = Bean.all
  end

  def new
    @beans = Bean.new
  end

  def create
    @beans = Bean.new(bean_params)

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

  def edit
    @bean = Bean.find(params[:id])
  end

  def update
    @bean = Bean.find(params[:id])

    if @bean.update_attributes(bean_params)
      redirect_to_beans_path
    else
      render :edit
    end
  end

  private

  def bean_params
    params.require(:bean).permit(:name, :roast, :origin, :quantity)
  end

end
