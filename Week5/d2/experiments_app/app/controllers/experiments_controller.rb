class ExperimentsController < ApplicationController

  def show
    @experiment = Experiment.find(params[:id])
    @log = Log.new
  end

end
