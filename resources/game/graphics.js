var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var townhouse, male_villager, state, villager, array = [];

renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);


PIXI.loader
  .add("../resources/townhouse.png")
  .add("../resources/male_villager.png")
  .load(setup);

function setup() {
  townhouse = new PIXI.Sprite(
    PIXI.loader.resources["../resources/townhouse.png"].texture
  );
  male_villager = new PIXI.Sprite(
    PIXI.loader.resources["../resources/male_villager.png"].texture
  );

  state = play;
  townhouse.x = screen.width/2-44;
  townhouse.y = screen.height/2-38;

  for(var p in people){
    villager = male_villager;

    villager.x = p.x;
    villager.y = p.y;
    array.push(villager);
    game.addChild(villager);
  }
  game.addChild(townhouse);
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(game);
}
function play(){
  var counter = 0;
  for(var p in people){
    array[counter].x = p.x;
    array[counter].y = p.y;
    counter++;
  }
}
