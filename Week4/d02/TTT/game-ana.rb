class Game

  def initialize
    puts"Welcome to RRR"
  end

  def play
    @score = {x: 0, o: 0, t: 0}
    print "How many wind do you want to play until? "
    @num_wins = gets.chomp.to_i
    until @score.has_value?(@num_wins)
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
      @score[@winner] +=1
      puts "Score is: X-#{@score[:x]} wins O-#{@score[:o]} wins Cats #{@score[:t]}"
    end
  end


private

  def get_winner
    return @board[:a1] if @board[:a1] && @board[:a1] == @board[:b1] &&@board[:a1] == @board[:c1]
    return @board[:a2] if @board[:a2] && @board[:a2] == @board[:b2] &&@board[:a2] == @board[:c2]
    return @board[:a3] if @board[:a3] && @board[:a3] == @board[:b3] &&@board[:a3] == @board[:c3]
    return @board[:a1] if @board[:a1] && @board[:a1] == @board[:a2] &&@board[:a1] == @board[:c3]
    return @board[:b1] if @board[:b1] && @board[:b1] == @board[:b2] &&@board[:b1] == @board[:b3]
    return @board[:c1] if @board[:c1] && @board[:c1] == @board[:c2] &&@board[:c1] == @board[:c3]
    return @board[:a1] if @board[:a1] && @board[:a1] == @board[:b2] &&@board[:a1] == @board[:c3]
    return @board[:c1] if @board[:c1] && @board[:c1] == @board[:b2] &&@board[:c1] == @board[:a3]
    return :t unless @board.has_value?(nil)
    false
  end

def do_move
  print "Player #{@turn.to_s.upcase}'s turn (ex B2): "
  @move = gets.chomp.downcase
  if @board[@move.to_sym]
    puts "That cell is not empty\n"
    return false

  elsif ('a'..'c').include?(@move[0]) && ('1'..'3').include?(@move[1])
    @board[@move.to_sym] = @turn
    return true
  else
    puts "Bad move\n"
    return false
  end
  puts "Game over! #{@winner.to_s.upcase} Wins"
end


  def print_board
    puts "     A    B    C"
    puts "1) #{xo :a1}  |  #{xo :b1}  |  #{xo :c1}  "
    puts "----------------"
    puts "2) #{xo :a2}  |  #{xo :b2}  |  #{xo :c3}  "
    puts "----------------"
    puts "3) #{xo :a3}  |  #{xo :b3}  |  #{xo :c3}  "

  end

  def xo(coor)
    return @board[coor].to_s.upcase if @board[coor]
    ' '
  end

  def new_game
    @board = {a1: nil, b1: nil, c1: nil,
              a2: nil, b2: nil, c2: nil,
              a3: nil, b3: nil, c3: nil,
    }
    @turn = :x
    @winner = nil
  end
end

game = Game.new
game.play
