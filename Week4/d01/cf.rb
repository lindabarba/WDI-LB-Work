 # choices = []
 begin
   print "Enter a, b, or c: "
   choice = gets.chomp
   if choice == "a"
    puts "a is for apple"
   elsif choice == "b"
    puts "b is for banana"
   elsif choice == "c"
    puts "c is for cantaloupe"
   else
    puts "you're a rebel"
  end
 end until choice == "no more fruit"
