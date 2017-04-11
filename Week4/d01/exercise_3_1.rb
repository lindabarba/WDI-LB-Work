# Ruby Lab: Arrays and Hashes

=begin
Complete the exercises below.
I recommend that you write these functions in Sublime, Atom or whatever the
text editor of your choice is. To execute the code in this file, navigate
to the directory that holds this file and enter the following command:
                            $ ruby ruby_lab.rb
Once you have completed writing these functions YOU SHOULD TEST THEM! Invoke these
methods on sample inputs to test that they return the correct value.
=end


# Exercises

# 1. ------------------------------------------------------------------------------------


# Write a method named put_arr_elems that puts each element in an array.
def put_arr_elems(elements)
  elements.each do |element|
    puts "#{element}"
  end
end


# Uncomment the line below to test out the function
# put_arr_elems([1,2,3,4])


# 2. ------------------------------------------------------------------------------------


# Write a method named puts_last that puts the last element in an array.

def puts_last(elements)
  elements.last do |element|
    puts "#{elements.last}"
  end
end

# Uncomment the line below to test out the function
# puts_last([1,2,3,4])


# 3. ------------------------------------------------------------------------------------


# Write a method named puts_key that puts each key in a hash.

example_hash = {javascript: 'language mainly used for client-side scripting',
                ruby: 'language popularized due to Ruby on Rails',
                whitespace: 'esoteric programming language that ignores everything but whitespaces'}

def puts_key(hash)
  puts hash.keys
end

# Uncomment the line below to test out the function
# puts_key example_hash


# 4. ------------------------------------------------------------------------------------


# Write a method named puts_value that puts each value in a hash.

def puts_value(hash)
  puts hash.values
end

# Uncomment the line below to test out the function.
# puts_value example_hash


# 5. ------------------------------------------------------------------------------------


# Write a method named sum that computes and returns the sum of integers in an array.

def sum(integers)
  total = 0
  integers.each do |idx|
    total = total + idx
  end
  return total
end

# Uncomment the line below to test out the function]
# puts sum([1,2,3]) #=> 6


# 6. ------------------------------------------------------------------------------------


# Write a function that reverses a string. Name this function reverse_string.
# For example, reverse_string("abc") should return "cba". It should take a string as
# input and return the string in reverse.

def reverse_string(letters)
  puts letters.reverse
end

# Uncomment the line below to test out the function.
# puts reverse_string("abc") #=> "cba"


# 7. ------------------------------------------------------------------------------------


# Write a method named charFrequency that when given a string returns a hash where each key is
# a character in a string and each value is the frequency that character
# occurs in the string. For example the string "aabc" should return
# {a: 2, b: 1, c: 1}
# array.count(x) = number of times x is in the array

def charFrequency(letters)
  hash = {}
  str.letters.each do |letter|
    hash[letter] = str.count(letter)
  end
  return hash
end

# # Uncomment the line below to test out the function.
puts charFrequency("aabc") #=> {a: 2, b: 1, c: 1}
# #
