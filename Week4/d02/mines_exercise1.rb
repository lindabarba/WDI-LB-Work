# Exercise 1:
# What kind of data structure is hammonds_mines? HASH

# How many "working" mines does he have?
  working_mines = hammonds_mines[:working].length

# How many are "planned"?
  planned_mines = hammonds_mines[:planned].length

# Access the depth of John Hammond's mine in Mexico. Save the depth to an appropriately named variable.
  mexico_depth = hammonds_mines[:working][3][:depth]

# What is the data type of the depth? STRING

# Can you write a Ruby statement that will tell us if it under the limit for unregulated mines in Mexico, which is 200 meters? What would that statement be?
  mexico_depth.to_i < 200 # this will return false

# Access the annual budget for Hammond's mine in Patagonia. Save the budget to an appropriately named variable.
  patagonia_budget = hammonds_mines[:working][2][:annual_budget]

# If there are 50 workers there, how much is the maximum each can be payed every month (in US dollars)?
  patagonia_max_worker_pay_per_mo = (patagonia_budget/12)/50

# Access the list of dinosaur specimens found in Nicaragua.
  hammonds_mines[:working][1][:specimens]

# Access all the Stegosaurouses.
  hammonds_mines[:working][0][:specimens].include?("Stegosaurous")
  hammonds_mines[:working][1][:specimens].include?("Stegosaurous")
  hammonds_mines[:working][2][:specimens].include?("Stegosaurous")
  hammonds_mines[:working][3][:specimens].include?("Stegosaurous")
