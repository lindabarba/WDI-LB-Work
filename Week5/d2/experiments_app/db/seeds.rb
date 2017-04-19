# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# will destroy all experiments and logs as well
Scientist.destroy_all

@scientists = Scientist.create([
  {name: 'Dr. Frankenstein', discipline: 'Re-animation'},
  {name: 'Dr. Oz', mad: false}
])

@scientists[0].experiments.create(
  {summary: 'The Monster', budget: 999}
)

@scientists[0].experiments.first.logs.create(
{subject_name: 'Frankenstein', comment: "It's alive!", deceased: false}
)

@exp = Experiment.create([
  {summary: 'The great and powerful', budget: 20000, scientist: @scientists[1]},
  {summary: 'Following the Yellow Brick Road', budget: 5, scientist: @scientists[1]}
])

@logs = @exp[0].logs.create([
  {subject_name: 'Tin Man', comment: 'Needs a heart', deceased: false},
  {subject_name: 'Tin Man', comment: 'Now has a heart', deceased: false}
])



# puts @scientists.inspect

