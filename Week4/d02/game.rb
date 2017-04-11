class Game
  attr_accessor :player1, :player2

  def initialize(player1, player2)
    @player1 = player1
    @player2 = player2
  end

end

my_game = Game.new "JOB", "Lindsey"
puts my_game.player1
puts my_game.player2



# class Game
#   attr_accessor :player1, :player2
# end

# g = Game.new
# g.player1
