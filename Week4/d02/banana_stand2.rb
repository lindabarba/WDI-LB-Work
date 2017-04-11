class BananaStand
  # attr_reader :color, :year_opened, :manager
  # attr_writer :color, :year_opened, :manager
  # line below takes care of the previous two
  attr_accessor :color, :year_opened, :manager

  # @@company = "Bluth Company"

  # def initialize(color, year_opened, manager, company)
  def initialize(color, year_opened, manager)
    @color = color
    @year_opened = year_opened
    @manager = manager
    # @company = company
  end

end

my_stand = BananaStand.new "Pink", 1985, "Job"
puts my_stand.manager
puts my_stand.color
puts my_stand.year_opened

