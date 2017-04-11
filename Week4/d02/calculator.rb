class Calculator
  attr_accessor :num1, :num2, :answer

  # def num1
  #   @num1 = num1.to_f
  # end

  # def num1
  #   @num2 = num2.to_f
  # end

  def add
    # if @num1 == true && @num2 == true
    @answer = @num1 + @num2
    return "#{@num1} plus #{@num2} equals #{@answer}."
    # else
    #   @num1 == false || @num2 == false
    #   print "Set both numbers."
    # end
  end

  def subtract
    @answer = @num1 - @num2
    return "#{@num1} minus #{@num2} equals #{@answer}."
  end

  def multiply
    @answer = @num1 * @num2
    return "#{@num1} times #{@num2} equals #{@answer}."
  end

  def divide
    @answer = @num1.to_f / @num2.to_f
    return "#{@num1} divided #{@num2} equals #{@answer}."
  end

end
