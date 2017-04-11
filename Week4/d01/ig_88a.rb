begin
  puts "Freeze! Who are you?"
  name = gets.chomp
  if name == "Han Solo"
    puts "You are mine at last, Solo!"
    5.times {puts "Zap!"}
    chance = rand(2)
    if chance == 0
      puts "Solo is caught! Jabba the Hutt will pay handsomely..."
      exit
    else
      puts "I'll get you next time, Solo!"
      exit
    end
  elsif name == "Zap!"
    10.times {puts "Zap!"}
    exit
  else name != "Han Solo"
    puts "You must die! Zap zap kaboom!"
  end
end until name == "Zap!"
