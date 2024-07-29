
/* 
@title: Space maze!
@author: klumey
@tags: []
@addedOn: 2024-07-28

----------------------CONTROLS--------------
w,s,a,d - to move
j - reset current map if stuck
i - collect/use an item
k - use an item


*/


// ------------objects and bitmaps ------------
    const player = "p"
    const space = "x"
    const planet = "k"
    const asteroid = "a"
    const gate = "g"
    const crystal = "c"
    const spacerock = "s"
    const blackhole = "b"
    const crack = "r"
    const spacerip = "y"

setLegend(
	[ player, bitmap`
................
................
................
......LLLLL.....
....LLLLLLLL....
...L4LLLLLL4L...
..4L4L4LL4L4L4..
1LLLLL4LL4LLLLL1
L11LLLLLLLLLL1LL
LLLL11LLLLLL11LL
.LLLL11L111L1LLL
...LLLLLLLLLLLL.
......LLLLLLL...
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
  [spacerock, bitmap`
................
...22222222222..
..2200000000022.
.22001111LLL0022
.20011LLLLLLL002
.2011LL11LLL1L02
.201LLL11LLL1102
.201LLLL1LLL1102
.201LLLLLLLLLL02
.201LLLLLL11LL02
.20LLLLLLL11LL02
.20L11LLLL11LL02
.200L1LLLLLLL002
.2200LLL11110022
..2200000000022.
...22222222222..`],
  [blackhole, bitmap`
................
................
................
.......00.......
..99900000009...
.99900000000999.
996600000000099.
9699000000000993
9696000000000699
3966900000000969
3996966000006969
..39996666966999
...399966996993.
......99993333..
................
................`],
  [crack, bitmap`
................
.............1..
........L...11..
........LL..L1..
.......L0..1L...
........L11LL...
........L10L....
........00L.....
.LLLL.11L1......
...LL010L1......
....1L0L1.......
....LL110LL.....
...1L1..L0......
...11....LL.....
.LL1............
................`],
  [spacerip, bitmap`
.....L.........0
.L0.L.....LL.LLL
..0LL.70LLL0LL0.
..L..L777HHHH0..
..LL00HH7888H00.
...L0HH8788HH00.
.LL0H888778HHL..
.L777755788H0L..
.7777HH788HHLL0L
LLH8757788H0L..0
.0H878887HHLL...
.0888HHH700L....
.088HHH00LL.....
L0HHH0L0LLL.....
LLLLLLL....0LL0.
L0.........0L...`],
)
setSolids([player,asteroid,gate,spacerock])
setPushables({
    [ spacerock ]: [spacerock],
	[ player ]: [spacerock],
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



// ---------------levels/maps ----------
let level = 2;
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
  map`
..ba...ba.
a.aa.a.aaa
as...a....
asaaaaaaa.
....aka.a.
.a..a.b.a.
.aa.a..sa.
.ba.aaasa.
aaasaba.s.
p...a.s...`,//3
  map`
ca....s..a
.a.aaaa.a.
.a..a.a.a.
...s..a...
ba.saaa.aa
aaa.abs...
a..s.asaa.
a.asaa....
a..apa.aab
a....a.g.k`,//4
];

setMap(levels[level])
  setBackground("x");
addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
onInput("j", () => {
    setMap(levels[level])
});

//--------------------------------------------

let previousX = getFirst(player).x
let previousY = getFirst(player).y
let playerSprite = getFirst(player);
let playerPosX = playerSprite.x;
let playerPosY = playerSprite.y;
let crystals = 0;
let stepCount = 0;
let holesCount = 0;
let holeX = 0;
let holeY = 0;

//--------------------after input-------------------------

afterInput(() => {
    //console.log("Player's prev coordinates(x,y):", previousX, previousY);


///----------------player position -----------
  playerPosX = playerSprite.x;
  playerPosY = playerSprite.y;
  previousX = getFirst(player).x
  previousY = getFirst(player).y
  console.log("Player's coordinates(x,y):", playerPosX, playerPosY); 
  stepCount += 1;
  
  let collectCrystal = tilesWith(player, crystal)
  if(collectCrystal.length > 0){
    onInput("i", () => {
      getFirst(crystal).remove();
      crystals = 1;
      
      })
  }
  if(crystals > 0)
  {
    let gateSprite = tilesWith(gate);
    let gateDisX = Math.abs(gateSprite[0].x - playerPosX);
    let gateDisY = Math.abs(gateSprite[0].y - playerPosY);
    console.log("Player - gate coordinates(x,y):", gateDisX, gateDisY);
    if(gateDisX <= 1 && gateDisY <=1 ){
    {
      onInput("k", () => {
        clearTile(gateSprite.x, gateSprite.y);
        crystals = 0;
        console.log("Crystals:", crystals);
      })
    }
    }
  }

//else if (level == 3)
//{
  //--------------------------Lv 3------------------------------
  if(level==3)
  {
    const maxSteps = 42
    addText("Steps left:" + (maxSteps - stepCount), { y: 4, color: color`4` });
    onInput("j", () => {
      stepCount = 0;
    });
    if( stepCount > maxSteps )
    {
      clearText();
      stepCount = 0;
      setMap(levels[level]);
      addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
    }
  }
  
  const onBlackHole = tilesWith(player, blackhole)
  if(onBlackHole.length >=1)
  {
    clearText();
    stepCount = 0;
    setMap(levels[level]);
  }
//}
  // -------------------------------------------------------------
  const  onPlanet = tilesWith(player, planet)
  if ( onPlanet.length >= 1){ 
    level +=1;
    if (level < levels.length) { 
      setMap(levels[level]);
      stepCount = 0;
      clearText();
      addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
      }
    else {
      clearText();
      addText("You win!", { y: 4, color: color`6` }); 
      }
    }

})
