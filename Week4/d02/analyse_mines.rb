hammonds_mines = {
  :working => [
    {
      :location      => "Mongolia",
      :depth         => "150 meters",
      :annual_budget => 850_000,
      :specimens => [
        "Brachiosaurus",
        "Triceratops",
        "Gallimimus",
        "Compsognathus"
      ]
    },
    {
      :location      => "Nicaragua",
      :depth         => "200 meters",
      :annual_budget => 1_500_000,
      :specimens => [
        "Tyrannosaurus Rex",
        "Stegosaurous",
        "Triceratops"
      ]
    },
    {
      :location      => "Patagonia",
      :depth         => "400 meters",
      :annual_budget => 1_200_000,
      :specimens => [
        "Dilophosaurus",
        "Brachiosaurus",
        "Triceratops",
        "Velociraptor"
      ]
    },
    {
      :location      => "Mexico",
      :depth         => "350 meters",
      :annual_budget => 900_000,
      :specimens => [
        "Stegosaurous",
        "Gallimimus",
        "Parasaurolophus"
      ]
    }
  ],
  :planned => [
    "China",
    "Nicaragua 2"
  ]
}

def low_budget_mines
  cheap_mines = []
  hammonds_mines[:working].each do |i|
    if i[:annual_budget] <= 1_000_000
      cheap_mines.push(i)
    end
  end
  return cheap_mines
end

def high_yield_mines
  four_spec_mines = []
  hammonds_mines[:specimens].each do |i|
    if i[:specimens].length >= 4
      four_spec_mines.push(i[:location])
    end
  end
  return four_spec_mines
end

def high_yield_mines
  four_spec_mines = []
  @working_mines = hammonds_mines[:working]
  @working_mines[:specimens].each do |i|
    if i[:specimens].length >= 4
      four_spec_mines.push(i[:location])
    end
  end
  return four_spec_mines
end


puts hammonds_mines.low_budget_mines
puts hammonds_mines.high_yield_mines
