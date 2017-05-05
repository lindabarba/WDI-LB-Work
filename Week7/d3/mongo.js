use mySDB
db.hotel.insert( {name: "My Hotel", location: "LA"} )
db.hotel.insert( {rooms: [ {theme: "woods", about: [ {roomNo: 1}, {rate: 200}, {vacant: true } ], [ {theme: "winter", about: [ {roomNo: 1}, {rate: 200}, {vacant: true } ] } ] )
//roomNo, rate, vacant are 3 room objects
db.hotel.insert({ })
