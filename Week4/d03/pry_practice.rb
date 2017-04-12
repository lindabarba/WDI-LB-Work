# This Exercise is about practicing using Pry for debugging
require "pry"

system "clear"

def instructions
  puts "At each `binding.pry` you'll be kicked into Pry."
  puts "Change the value of the variables to break out of the loops."
  puts "Type `exit` to resume program execution."
  binding.pry
end

# We're stuck in loops!

in_kansas = false

until in_kansas
  binding.pry
  puts "I've a feeling we're not in Kansas anymore"
end

puts "There's no place like home"

lion = ["cowardice", "fleas"]

while lion.include? "cowardice"
  lion.push "blah"
  binding.pry
  puts "What do they got that I ain't got?!"
end

puts "Why, I'd thrash him from top to bottomus!"

tinman = {
  :heart => []
}

while tinman[:heart].empty?
  puts "If I only had a heart..."
  binding.pry
end

puts "Follow the yellow brick road!"

oz = {great: true, powerful: true}

while oz[:great] && oz[:powerful]
  binding.pry
  puts "The Great Oz has spoken!"
end

puts "Pay no attention to the man behind the curtain!"

witches = [
  { :wicked => true,  :direction => :west },
  { :wicked => true,  :direction => :east },
  { :wicked => false, :direction => :north }
]

while witches[0][:wicked]
  binding.pry
  puts "I'll get you my pretty"
end
puts "I'm melting!"

puts "We're home!"
