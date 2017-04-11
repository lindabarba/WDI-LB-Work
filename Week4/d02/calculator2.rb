class Calculator
  attr_accessor :num1, :num2, :answer

  def num1
    @num1 = gets.chomp.to_f
  end

  def num2
    @num2 = gets.chomp.to_f
  end

  def add
    if num1 == true &&  num2 == true
      @answer = num1 + num2
      puts "#{num1} plus #{num2} equals #{answer}."
    else num1 != true || num2 != true
      puts "Set both numbers please."
    end
  end

  def subtract
    if num1 == true &&  num2 == true
    @answer = num1 - num2
    puts "#{num1} minus #{num2} equals #{answer}."
    else num1 != true || num2 != true
      puts "Set both numbers please."
    end
  end

  def multiply
    if num1 == true &&  num2 == true
    @answer = num1 * num2
    puts "#{num1} times #{num2} equals #{answer}."
    else num1 != true || num2 != true
      puts "Set both numbers please."
    end
  end

  def divide
    if num1 == true &&  num2 == true
    @answer = num1 / num2
    puts "#{num1} divided #{num2} equals #{answer}."
    else num1 != true || num2 != true
      puts "Set both numbers please."
    end
  end

end

# my_calc = Calculator.new
