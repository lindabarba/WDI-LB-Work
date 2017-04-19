class ScientistsController < ApplicationController

  def new
    @scientist = Scientist.first
    @experiment = Experiment.new
  end

end
