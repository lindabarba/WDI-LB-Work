class BananaStand

# class variable
  @@company = "Bluth Company"

  def initialize(color, year_opened, manager, company)
    # initialy set to these
    # @color = "Yellow"
    # @year_opened = 1953
    # @manager = "George Michael"
    @color = color
    @year_opened = year_opened
    @manager = manager
    @company = company
  end

  def company
    @@company
  end

  def color
    @color
  end

  def year_opened
    @year_opened
  end

  def manager
    @manager
  end

  def manager=(new_manager)
    @manager = new_manager
  end

  def color=(new_color)
    @color = new_color
  end

  def year_opened=(new_year_opened)
    @year_opened = new_year_opened
  end

end

my_stand = BananaStand.new "Pink", 1985, "Job", "Bob Loblaw"
# my_stand.manager = "Pee-wee Herman"
# my_stand.color = "Blue"
# my_stand.year_opened = "1980"
puts my_stand.manager
puts my_stand.color
puts my_stand.year_opened
puts my_stand.company

