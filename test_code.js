
/* 
@title: Space maze!
@author: klumey
@tags: []
@addedOn: 2024-07-28

----------------------CONTROLS--------------
w,s,a,d - to move
j - reset current map if stuck
i - collect an item
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
    const blWormhole = "!"
    const rdWormhole = "?"

setLegend(
	[ player, bitmap`
................
................
................
....DD444DD.....
...DD111L0D4....
.4DD41111LLD4...
4DL1D141414L4D4.
D11L11D1D1L000DD
4111LLLLLLLLL004
DD11111L1LLL0004
.44DLLLLLL000DDD
...DDDD4444DDD..
................
................
................
................` ],
    [ space, bitmap`
0000100000001000
0000000000010100
0000000000001000
0000000000000000
0100000000000000
1010000100000000
0100000000000010
0000000000000000
0001000000000000
0000000000000000
0000000000000000
0000000000000000
0001000000001000
0011100000000000
0001000010000000
0000000000000000` ],
  [ asteroid, bitmap `
................
....22121L1L....
...211L11LLLL...
..222LLLLLL1LL..
.22111LLLLLLLLL.
.211L1LL11LLLLL.
.2211LL11LLL1LL.
.211LLL111L1LLL.
.221LLLLLLLL1LL.
.21111LL1LLLLLL.
.2111L1LLLL1LLL.
.2211LLLLL1LLLL.
.22121L1LL11LL..
...2111LLLLLL...
....2221LL1L....
................`],
  [planet, bitmap`
................
.....933C3C.....
...99399333CC...
..6669939933CC..
.6999999939333C.
.66996693333C3C.
.996669999393CC.
.6696993339933C.
.669999999333CC.
.999996999939CC.
.6669969939933C.
.699969333333CC.
..6699999993CC..
...699966933C...
....66633C3C....
................` ],
  [gate, bitmap`
.....269CC2.....
.....2CFFC2.....
.....2CFFC2.....
.....29CCC2.....
....22CFFC22....
...29CC00CCC2...
..29CLL11LLCC2..
..260L1111L0C2..
..29CLL11LLCC2..
...29CC00CCC2...
....22CFFC22....
.....29FFC2.....
.....269CC2.....
.....2CFFC2.....
.....2CFFC2.....
.....269CC2.....`],
  [crystal, bitmap`
7..7..7...777..7
..7757HHHH55...7
...75HH828H57.7.
..75HH8H888857..
.75HH88H2888H57.
..HHH88H28888H7.
.7HH88H22888887.
75H88H28H2888H57
75HH2H28H28H2857
75H882288222887.
.5H88H28H288887.
7.HHH8H22888885.
..7HHH8H2888H75.
7755HH8H28885...
.7.77HHH28H57...
7..7.7HHHH5577..`],
  [spacerock, bitmap`
................
...22222222222..
..2211111111122.
.221LL1111111122
.21L1LLLL11L1112
.2LLLLL1LLL11112
.2LLLLLLL1LL1112
.2LL1LLLLLL1LL12
.2L1LLLLLLLLL112
.2LL1LLL1LLLLL12
.2LLLLL1L1L1LL12
.2LLLLLL1LLLLL12
.2LLLLLLLLLLL1L2
.22LLLLLLLLLLL22
..22LLLLLLLLL22.
...22222222222..`],
  [blackhole, bitmap`
................
................
....99666699....
...9662222669...
..622200002266..
66220000000226..
992000000000226.
966000000000029.
396966000000026.
.999969666902299
..92093336696669
..92000099993393
..662200000269..
...6622222226...
.....9966966....
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
  [blWormhole, bitmap`
................
................
................
...7777777777...
.77..7.7..7.777.
7.7....7......7.
7.7..7...7.7..7.
.7.7..77.....77.
.7777777777777..
.77.7..7...77...
...7.7...77.7...
...7..7.77.7....
....7.7.77.7....
....7.7.777.....
....7.7.7.7.....
....7.7.7.7.....`],
  [rdWormhole, bitmap`
................
................
................
...3333333333...
.33..3.3..3.333.
3.3....3......3.
3.3..3...3.3..3.
.3.3..33.....33.
.3333333333333..
.33.3..3...33...
...3.3...33.3...
...3..3.33.3....
....3.3.33.3....
....3.3.333.....
....3.3.3.3.....
....3.3.3.3.....`],
)
setSolids([player,asteroid,gate,spacerock])
setPushables({
    [ spacerock ]: [spacerock],
	[ player ]: [spacerock],
})

//---------------controls-------------------------------

  onInput("w", () => {
    getFirst(player).y -=1;
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
// ------------ lv reset -------
onInput("j", () => {
    setMap(levels[level])
});

// ---------------levels/maps ------------------------
let level = 0;
const levels = [
  map`
p?..
....
....
..!k`, //0
  map`
p!.
...
.?k`,
];
const endScreen = [
 map`
...
...
...`,
];

setMap(levels[level])
  setBackground("x");
addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})

let playerPosX = 0;
let playerPosY = 0;
let previousX = 0;
let previousY = 0;
let crystals = 0;
let stepCount = 0;
let gateCoordinates = { x: 0, y: 0 };
let onBluePort = { x: 0, y: 0 };
let onRedPort = { x: 0, y: 0 };
let rdWormHCord = { x: 0, y: 0 };
let blWormHCord = { x: 0, y: 0 };
let playerSprite = getFirst(player)


// ------------------------ functions ------------------------------------
function changeHoleWhenStepped (x, y, changedSprite)
  {
    if (x >= 0 && y >= 0) {
    //check if tile that player is standing on contains sprite - crack
        let crackRemove = getTile(x, y).find(sprite => sprite.type === crack);
        if (crackRemove) {
            crackRemove.remove();
            addSprite(x,y,changedSprite)
          }
      }
  }
function stepOnPortal ()
  {
    let onBluePort = tilesWith(blWormhole, player)
    let onRedPort = tilesWith(rdWormhole, player)
    let rdWormHCord = getFirst(rdWormhole)
    let blWormHCord = getFirst(blWormhole)
    if(onRedPort.length >= 1)
    {
      teleportPlayer(blWormHCord.x, blWormHCord.y)
    }
    if(onBluePort.length >= 1)
    {
      teleportPlayer(rdWormHCord.x, rdWormHCord.y)
    }
  }
function teleportPlayer(x,y)
  {
    playerSprite.x = x;
    playerSprite.y = y;
  }

//--------------------after input-------------------------

afterInput(() => {

  
    console.log("Player's prev coordinates(x,y):", previousX, previousY);


///----------------player position ---------------------
  let playerSprite = getFirst(player)
  playerPosX = playerSprite.x;
  playerPosY = playerSprite.y;
  console.log("Player's coordinates(x,y):", playerPosX, playerPosY); 
  stepCount += 1;
// ----------------change crack to spaceRip and damage handling ------------
  changeHoleWhenStepped (previousX,previousY,spacerip);
  const onRip = tilesWith(player, spacerip)
  if(onRip.length >=1)
  {
    //playTune(deathSound);
    clearText();
    stepCount = 0;
    setMap(levels[level]);
  }
// ------------------------- wormholes!!!!!!!!!!!!-----------
  let rdWormHCord = { x: 0, y: 0 };
  let blWormHCord = { x: 0, y: 0 };

stepOnPortal();
  
//------------------ collecting the crystal ---------------

  
  let collectCrystal = tilesWith(player, crystal)
  let crystalSprite = getAll("c");
  if (playerPosX >= 0 && playerPosY >= 0) {
    //check if tile that player is standing on contains sprite - crystal
        let spriteToRemove = getTile(playerPosX, playerPosY).find(sprite => sprite.type === crystal);
        if (spriteToRemove) {
           onInput("i", () => {
            playTune(crysSound);
            spriteToRemove.remove();
            crystals += 1;
      
          })
      }
    }
  
// --------------------- opening the gate with crystal -----------------------
  if(crystals > 0)
  {
    //get coords of the first gate visible on map
    let gateSprite = getAll("g")[0];
    //new coordinates
    gateCoordinates.x = gateSprite.x;
    gateCoordinates.y = gateSprite.y;
    //calculate the distance
    let gateDisX = Math.abs(gateSprite.x - playerPosX);
    let gateDisY = Math.abs(gateSprite.y - playerPosY);
    console.log("Player - gate coordinates(x,y):", gateDisX, gateDisY);
    //check if player is standing next to the gate
    if(gateDisX <= 1 && gateDisY <=1 ){
      //check if coordinates are only for this map
      if (gateSprite.x === gateCoordinates.x && gateSprite.y === gateCoordinates.y) {
        onInput("k", () => {
          playTune(gateOpenSound);
          //use new coordinates and clear tile with the gate
          clearTile(gateCoordinates.x, gateCoordinates.y);
          crystals = 0;
          console.log("Crystals:", crystals);
        })
    }
    }
  }


  
  //checking if player stepped on a black hole, then restarting the level
  
  const onBlackHole = tilesWith(player, blackhole)
  if(onBlackHole.length >=1)
  {
    playTune(deathSound);
    clearText();
    stepCount = 0;
    setMap(levels[level]);
  }

  // check if stepped on a planet - then win screen or proceed to the next level
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
      //reset the gate coordinates after changing map
      gateCoordinates = { x: 0, y: 0 };
      onBluePort = false;
      onRedPort = false;
      rdWormHCord = false;
      blWormHCord = false;
      }
    else {
      clearText();
      setMap(endScreen[0]);
      addText("You win!\n", { y: 4, color: color`6` });
      addText("Thanks for playing!", { y: 6, color: color`6` });
      
      }
    }
  previousX = playerPosX;
  previousY = playerPosY;
})
