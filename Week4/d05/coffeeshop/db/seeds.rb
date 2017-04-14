# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Bean.destroy_all

beans = Bean.create([
    {name: "Jim's Jittery Java", roast: "Medium", origin: "The OC Baby", quantity: 50.25},
    {name: "Jon's FDA-Banned Brew", roast: "Strong", origin: "The Home of Magic Mountain", quantity: 101}
])
