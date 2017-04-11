puts "Hello, I am C-3PO, human-cyborg relations."

name = ""
print "And your name is? "
name = gets.chomp
if name == "Obi-Wan Kenobi"
  puts "Oh, marvelous! Simply marvelous! Say hello to R2-D2; he's been looking all over for you!"
else
  puts "It is a pleasure to meet you, #{name} . I'm terribly sorry for prying, but you don't by any chance go by the alias of Obi-Wan Kenobi, do you?"
  answer = gets.chomp
  if answer == "yes" || answer == "Yes" || answer == "YES" || answer == "y" || answer == "Y"
    puts "Oh, marvelous! Simply marvelous! Say hello to R2-D2; he's been looking all over for you!"
  elsif answer == "no" || answer == "No" || answer == "NO" || answer == "n" || answer == "N"
    puts "I've really enjoyed speaking with you, #{name}, but if you'll please excuse me, I have to help my friend find someone named Obi-Wan Kenobi."
    puts "Well R2, I suppose we'll just have to keep looking. R2-D2: (Agreeable droid noises)"
  else
    puts "I'm sorry, I didn't hear you correctly. I only respond to #{"yes"} or #{"no"}..."
    puts "Well R2, I suppose we'll just have to keep looking. R2-D2: Beep beep boop!"
  end
end
