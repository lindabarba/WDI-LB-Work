class HomesController < ApplicationController

  def index
    @homes = [
      {description: 'Tiny', sf: 325},
      {description: 'Small', sf: 900},
      {description: 'Comfortable', sf: 1650},
      {description: 'Sweet', sf: 3700}
    ]
  end

end
