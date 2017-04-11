puts "Beep-boop whrrrr bleep!"
puts "Welcome to the R2-D2 calculator!"

operator = ""

begin
  puts "Please enter which operator you would like to use ('+', '-', '*', '/'). Enter 'q' to exit."
  operator = gets.chomp
  if operator == "q"
    exit
  end
  if operator == "+" || operator == "-" || operator == "*" || operator == "/"
    puts "Enter your first operand: "
    operand_one = gets.chomp.to_i
    puts "Enter your second operand: "
    operand_two = gets.chomp.to_i
    answer = operand_one.method(operator).(operand_two)
    puts "The solution to #{operand_one} #{operator} #{operand_two} is #{answer}."
  else
    puts "Whhhhhheeeaaar! Beeeee-oooohhhh! You did not enter a viable operator!"
  end
end until operator == "q"

