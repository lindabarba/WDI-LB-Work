class MeaninglessController < ApplicationController

  def time
    @current_time = Time.now
  end

end
