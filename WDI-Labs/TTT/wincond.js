/*--- this will handle all possible winning combinations ---*/
/*
player x = 1
player o = -1
array = [a, b, c, d, e, f, g, h, i]
// array will hold key:value pairs, these will be assigned by click
*/
//player x winning rows
var xWinRow1 = (array[0] + array[1] + array[2] === 3)
var xWinRow
