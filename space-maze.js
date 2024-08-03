
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
    const arrowPointDown = "d"

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
....2155777.....
.7.27HH55577.2..
...25HH55557272.
...25H5HHH557.7.
7.71HH555HH57...
..25555555H51...
..7255HHH5HL7.7.
2..755H5H5117.7.
77.275H555755.2.
.72577HH555557..
.777555H55H572..
.7.55H5555H57...
..7.5HHHHHH72...
.77775555777....
.7..227755.7..7.
..7....77772....`],
  [rdWormhole, bitmap`
....2833888.....
.8.283333388.2..
...833993338282.
..88393399338.8.
8.88993333938...
.8239333333388..
..83333993388.8.
2..8339339888.8.
88.2839939833.2.
.8238839393338..
.8883333393382..
.8.3393339338...
..8.339993382...
.88883333888....
.8..228833.8..8.
..8..8.88882....`],
  [arrowPointDown, bitmap`
................
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.6666666666666..
..66666666666...
...666666666....
....6666666.....
.....66666......
......666.......
.......6........
................`],
)
setSolids([player,asteroid,gate,spacerock])
setPushables({
    [ spacerock ]: [spacerock],
	[ player ]: [spacerock],
})

//---------------controls-------------------------------

  onInput("w", () => {
    getFirst(player).y -=1;
    playTune(moveSound);
  })
onInput("s", () => {
	getFirst(player).y += 1
    playTune(moveSound);
})
onInput("a", () => {
  getFirst(player).x -=1
  playTune(moveSound);
})
onInput("d", () => {
  getFirst(player).x +=1
  playTune(moveSound);
})

// ------------ lv reset -------
onInput("j", () => {
  playerDeath();
});

// ---------------levels/maps ------------------------
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
pa.k
sa.a
.s..
.a..`, //2
  map`
psss.
ssss.
ss...
.sss.
s.ska`,//3
  map`
..a...
....ad
.aa.ac
...aaa
aa.aka
p..g..`,//4
  map`
.....ap..a.
aa.a.aaa.a.
...a...a...
.aaaaa.aaa.
.....a.a.a.
.aaa.a.a.a.
.a...a...a.
.a.aaa.aaa.
.a.akg.a...
.a.aaaaa.aa
ca.........`,//5
  map`
..p..
.aaa.
.kab.`,//6
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
p...a.s...`,//7
  map`
ca...rs..a
.a.aaaa.a.
.ar.a.a.a.
...s..a...
ba.saaa.aa
aaa.abs...
a.rs.asaa.
a.asaa...r
a..apa.aab
a....a.g.k`,//8
  map`
.g.a.......
.a..saaaaa.
ra.a.a.s.a.
.aaaaaaa.r.
kaca...aaa.
aa.a.a.a...
...aaasr.aa
.aaa.asaaap
.a..sa...a.
.a.a.aaara.
...a.......`,//9
  map`
!ab.k
.a...
.a.aa
pa..?`,//10
  map`
a.s.....a..b
a.aaaas.a.aa
a.r..as.a.ak
baaa.a....a.
..r..aaa..a.
aaaaraba..a.
..ca...ab.g.
.aaa.a.aaaaa
?a...ar..bap
aa.araaa.aa.
!..a..ba....`//11
 /* map`
...a.....
ca...aa..
aaa.aa..a
.pa.a...a
.aa.aaa..
..a.akaa.
a...a.g..
aaa.aaa.a
.......a.`,*/

];
const startScreen = [
  map`
......
......
......
......
......
......`
];
const endScreen = [
 map`
...
...
...`,
];



//------------------- music and sounds ------------

const moveSound = tune`
117.6470588235294: C4~117.6470588235294,
3647.0588235294117`
const crysSound = tune`
108.30324909747293: A5/108.30324909747293,
108.30324909747293: B5-108.30324909747293,
3249.097472924188`
const deathSound = tune`
192.30769230769232: F4^192.30769230769232,
192.30769230769232: G4^192.30769230769232,
192.30769230769232: F4^192.30769230769232,
192.30769230769232: E4^192.30769230769232,
192.30769230769232: D4^192.30769230769232,
5192.307692307692`
const gateOpenSound = tune`
176.47058823529412: C4-176.47058823529412,
176.47058823529412: D4-176.47058823529412,
176.47058823529412: E4-176.47058823529412,
5117.64705882353`
const nextLvSound = tune `
176.47058823529412: F5^176.47058823529412,
176.47058823529412: G5^176.47058823529412,
176.47058823529412: A5^176.47058823529412,
176.47058823529412: G5^176.47058823529412,
4941.176470588235`
const winSound = tune `
153.84615384615384: B4~153.84615384615384 + C5^153.84615384615384,
153.84615384615384: C5~153.84615384615384 + D5^153.84615384615384,
153.84615384615384: E5~153.84615384615384 + F5^153.84615384615384,
153.84615384615384: C5~153.84615384615384 + D5^153.84615384615384,
153.84615384615384: D5~153.84615384615384 + E5^153.84615384615384,
153.84615384615384: B4~153.84615384615384 + C5^153.84615384615384,
4000`
const portalSound = tune`
144.92753623188406: B5~144.92753623188406,
144.92753623188406: F5~144.92753623188406,
144.92753623188406: F5~144.92753623188406,
4202.898550724638`
//--------------------------------------------
let playerPosX;
let playerPosY;
let crystals = 0;
let stepCount = 0;
let previousX = 0;
let previousY = 0;
let gateCoordinates = { x: 0, y: 0 };
let playerSprite = getFirst(player);

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
function playerDeath ()
  {
    playTune(deathSound);
    clearText();
    stepCount = 0;
    previousX = 0;
    previousY = 0;
    crystals = 0;
    setMap(levels[level]);
    gateCoordinates = { x: 0, y: 0 };
    addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
    let playerSprite = getFirst(player);
    playerPosX = playerSprite.x;
    playerPosY = playerSprite.y;
  }
function stepOnPortal ()
  {
    const onBluePort = tilesWith(blWormhole, player)
    const onRedPort = tilesWith(rdWormhole, player)
    console.log("red worm:", onRedPort.length)
    if(onRedPort.length == 1)
    {
      console.log("blue worm:", getFirst(blWormhole).x, getFirst(blWormhole).y)
      playTune(portalSound);
      getFirst(player).x = getFirst(blWormhole).x;
      getFirst(player).y = getFirst(blWormhole).y;
    }
    console.log("blue worm:", onBluePort.length)
    if(onBluePort.length == 1)
    {
      console.log("red worm:", getFirst(rdWormhole).x, getFirst(rdWormhole).y)
      playTune(portalSound);
      getFirst(player).x = getFirst(rdWormhole).x;
      getFirst(player).y = getFirst(rdWormhole).y;
      console.log("Player's coordinates(x,y):", getFirst(player).x, getFirst(player).y)
    }
  }

// -------------------- start screen -------------------------
setMap(startScreen[0])
  setBackground("x");
/*addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})*/
addText("Welcome! ",
            {
              x:6,
              y:1,
              color: color`6`
            })
addText( "Tip - press:",
            {
              x:4,
              y:3,
              color: color`6`
            })
addText( "i: collect\n crystals",
            {
              x:3,
              y:5,
              color: color`6`
            })
addText( "k: use\n crystal",
            {
              x:3,
              y:8,
              color: color`6`
            })
addText( "w,s,a,d: move",
            {
              x:3,
              y:11,
              color: color`6`
            })
addText( "\nj: Start playing!!",
            {
              x:1,
              y:12,
              color: color`6`
            })


//--------------------after input-------------------------

afterInput(() => {

  
    //console.log("Player's prev coordinates(x,y):", previousX, previousY);

///----------------player position ---------------------
  let playerSprite = getFirst(player);
  previousX = playerPosX;
  previousY = playerPosY;
  playerPosX = playerSprite.x;
  playerPosY = playerSprite.y;
  //console.log("Player's coordinates(x,y):", playerPosX, playerPosY); 
  stepCount += 1;

// ----------------change crack to spaceRip and damage handling ------------
  
  changeHoleWhenStepped (previousX,previousY,spacerip);
  const onRip = tilesWith(player, spacerip)
  if(onRip.length ==1)
  {
    playerDeath();
  }  

// ------------------------- wormholes!!!!!!!!!!!!-----------
 
stepOnPortal();
  
//------------------ collecting the crystal ---------------

  if (playerPosX >= 0 && playerPosY >= 0) {
    //check if tile that player is standing on contains sprite - crystal
        let spriteToRemove = getTile(playerPosX, playerPosY).find(sprite => sprite.type === crystal);
        if (spriteToRemove) {
           onInput("i", () => {
            playTune(crysSound);
            spriteToRemove.remove();
            if(level==4){
              let arrowRemove = getFirst(arrowPointDown);
              arrowRemove.remove();
            }
            crystals += 1;
             console.log("Crystals:" , crystals);
      
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

  
  //--------------------------Lv 3 - step counter------------------------------

  if(level==6 || level==7 )
  {
    let maxSteps = 100
    if (level==7){ maxSteps = 41}
    if (level==6){ maxSteps = 5}
    let remainingSteps = maxSteps - stepCount;
    if( remainingSteps < 10)
    {
      remainingSteps = '0' + remainingSteps;
    }
    addText("Steps left:" + remainingSteps, { y: 4, color: color`4` });
    console.log("steps left:" + (maxSteps - stepCount));
    if( stepCount > maxSteps )
    {
      playerDeath();
    }
  }
  
//------------------------------------------------------------

  
  //checking if player stepped on a black hole, then restarting the level
  
  const onBlackHole = tilesWith(player, blackhole)
  if(onBlackHole.length ==1)
  {
    playerDeath();
  }

  // check if stepped on a planet - then win screen or proceed to the next level
  const  onPlanet = tilesWith(player, planet)
  if ( onPlanet.length >= 1){ 
    level +=1;
    if (level < levels.length) { 
      playTune(nextLvSound);
      setMap(levels[level]);
      stepCount = 0;
      clearText();
      addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
      //reset the gate coordinates after changing map
      gateCoordinates = { x: 0, y: 0 };
      }
    else {
      playTune(winSound);
      clearText();
      setMap(endScreen[0]);
      addText("You win!\n", { y: 4, color: color`6` });
      addText("Thanks for playing!", { y: 6, color: color`6` });
      addText("Made by: klumey", {y:8, color: color`6` });
      }
    }
})
