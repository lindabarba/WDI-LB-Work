class Game

  def initialize
    puts "Welcome to Tic-Tac-Toe!\n\n"
  end

  def play
    puts "Let's play!"
    @score = {x: 0, o: 0, t:0}
    print "How many wins do you want to play until?"
    @num_wins = gets.chomp.to_i
    until @score.has_value(@num_wins)
    # until @score[:x] == (@num_wins) || @score[:o] == @num_wins
      new_game
      until @winner
        print_board
        until do_move
        end
        @turn = @turn == :x ? :o : :x
        @winner = get_winner
      end
      print_board
      puts "Winner/Tie #{@winner.to_s.upcase}\n"
      @score[@winner] += 1
      puts "Score is: X has #{@score[:x]} wins, O has #{@score[:o]} wins, and there are #{@score[:t]} ties."
  end

# any methods below this private keyword cannot be invoked on the object
private

  def get_winner
    return @board[:a1] if @board[:a1] && @board[:a1] == @board[:b1] && @board[:a1] == @board[:c1]
    return @board[:a2] if @board[:a2] && @board[:a2] == @board[:b2] && @board[:a2] == @board[:c2]
    return @board[:a3] if @board[:a3] && @board[:a3] == @board[:b3] && @board[:a3] == @board[:c3]
    return @board[:a1] if @board[:a1] && @board[:a1] == @board[:a2] && @board[:a1] == @board[:c3]
    return @board[:b1] if @board[:b1] && @board[:b1] == @board[:b2] && @board[:b1] == @board[:b3]
    return @board[:c1] if @board[:c1] && @board[:c1] == @board[:c2] && @board[:c1] == @board[:c3]
    return @board[:a1] if @board[:a1] && @board[:a1] == @board[:b2] && @board[:a1] == @board[:c3]
    return @board[:c1] if @board[:c1] && @board[:c1] == @board[:b2] && @board[:c1] == @board[:a3]
    return :t unless @board.has_value?(nil)
    false
  end

  def do_move
    print "Player #{@turn.to_s.upcase}'s turn (ex: B2): "
    @move = gets.chomp.downcase
    # check to see if square occupied - all is true except nil
    if @board[@move.to_sym]
      puts "That cell is already \n"
      return false
    # check to see if move entered is in proper range by
    # using range and indexing to first char entered
    elsif ('a'..'c').include?(@move[0]) && ('1'..'3').include?(@move[1])
      @board[@move.to_sym] = @turn
      return true
    else
      puts "Bad move! Enter valid square."
      return false
    end
    puts "Game over."
  end

  def new_game
    @board = {
      a1: nil, b1: nil, c1: nil,
      a2: nil, b2: nil, c2: nil,
      a3: nil, b3: nil, c3: nil
    }
    @turn = :x
    @winner = nil
  end

  def print_board
    puts "   A   B   C"
    puts ""
    puts "1) #{xo :a1} | #{xo :b1} | #{xo :c1}"
    # puts "1) #{@board[:a1]} | #{@board[:b1]} | #{@board[:c1]}"
    puts "------------"
    puts "2) #{xo :a2} | #{xo :b2} | #{xo :c2}"
    puts "------------"
    puts "3) #{xo :a3} | #{xo :b3} | #{xo :c3}"
  end

  def xo(coor)
    return @board[coor].to_s.upcase if @board[coor]
    ' '
  end

end

game = Game.new
game.play
