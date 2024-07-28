
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08

----------------------CONTROLS--------------
w,s,a,d - to move
j - reset current map if stuck
i - collect an item


*/


// ------------objects and bitmaps ------------
    const player = "p"
    const space = "x"
    const planet = "k"
    const asteroid = "a"
    const gate = "g"
    const crystal = "c"

setLegend(
	[ player, bitmap`
................
................
................
......LLLLL.....
....LLLLLLLL....
....4LLLLLL4....
....4L4LL4L4L...
..LLLL4LL4LLL...
L11LLLLLLLLLL11L
LLL111LLLLLL11LL
.LLLL11111111LLL
...LLLLLLLLLLLLL
........LLLLL...
................
................
................` ],
    [ space, bitmap`
0000000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0020000000000200
0000000000002220
0000000000000200
0000000200000000
0000000000000000
0002000000000000
0022200000000000
0002000000000200
0000000000000000` ],
  [ asteroid, bitmap `
................
.....LLLLLLLL...
...LL1111111LL..
..L11LL111LLL1L.
..L1111111LLL1L.
.L11111LL111111L
L111111LL111L11L
L11LL1111111L11L
L11LL1111111111L
L11LL111LLL111LL
.L111111LLL11L1L
..L11L11111111LL
..L11LL1111111L.
...LL1111111LL..
....LLLLLLLL....
................`],
  [planet, bitmap`
................
.....999999.....
...3333339999...
..933333999999..
.99999999966999.
.99999999996699.
.96666699999666.
.66666699999999.
.69999999339939.
.93399999933333.
.33999999999333.
.39966699999999.
..999966999666..
...9999966669...
....99999999....
................` ],
  [gate, bitmap`
......CCC.......
......C.C.......
......CCC.......
......C.C.......
......CCC.......
......C.C.......
.....C111C......
....C1LLL1C.....
....CLLLLLC.....
....CLLLLLC.....
....C1LLL1C.....
.....C111C......
......C.C.......
......CCC.......
......C.C.......
......CCC.......`],
  [crystal, bitmap`
.......7........
...77777777.....
...77HHHHH777...
.777HHHHHHHH77..
.77HHHHHHHHHH7..
.7HHH88888HHH7..
.77H888888HH77..
777788888877777.
..77888888877777
.7HH8888888HH77.
.7HH8888888HH77.
.7HHHHHHHHHHH77.
..7HHHHHHHHH77..
..777HHHHH777...
....7777777.....
................`],
)
setSolids([player,asteroid,gate])
setPushables({
	[ player ]: []
})

//---------------controls----------------------

  onInput("w", () => {
    getFirst(player).y -=1
  })
onInput("s", () => {
	getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -=1
})
onInput("d", () => {
  getFirst(player).x +=1
})



// ---------------levels ----------
let level = 0;
const levels = [
  map`
p.
.k`, //0
  map`
.aa..
.....
...a.
..a..
pak..`, //1
  map`
...a.....
ca...aa..
aaa.aa..a
.pa.a...a
.aa.aaa..
..a.akaa.
a...a.g..
aaa.aaa.a
.......a.`, //2
];

setMap(levels[level])
  setBackground("x");

onInput("j", () => {
    setMap(levels[level])
});
 afterInput(() => {
  
    


}),

afterInput(() => {
  let playerSprite = getFirst(player)
  let playerPosX = playerSprite.x;
  let playerPosY = playerSprite.y;
  const crystalLv = 2
  console.log("Player's coordinates(x,y):", playerPosX, playerPosY); 
  
if (crystalLv == level){
  let crystals = 0
  const collectCrystal = tilesWith(player, crystal)
  if(collectCrystal.length > 0){
    onInput("i", () => {
      getFirst(crystal).remove();
      crystals += 1;
      })
  }
  if(crystals > 0)
  {
    const gateSprite = getFirst(gate)
    //let playerGateDistance = Math.abs(gateSprite.x - playerPosX)
    //playerGateDistance += Math.abs(gateSprite.x - playerPosY);
    console.log("Player - gate coordinates(x,y):", Math.abs(gateSprite.x - playerPosX), Math.abs(gateSprite.y - playerPosY));
    if(Math.abs(gateSprite.x - playerPosX) <= 1 && Math.abs(gateSprite.y - playerPosY) <=1 ){
    {
      onInput("k", () => {
        getFirst(gate).remove();
        crystals -= 1;
      })
    }
    }
  }
  }
  const  onPlanet = tilesWith(player, planet)
  if ( onPlanet.length >= 1){ 
    level +=1;
    if (level < levels.length) { 
      setMap(levels[level]);
      }
    else {
      addText("You win!", { y: 4, color: color`6` }); 
      }
    }
})
