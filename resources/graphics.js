var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var townhouse, male_villager, state;

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

  state = update;

  townhouse.x = screen.width/2-54;
  townhouse.y = screen.height/2-38;


  for(var p in people){
    game.addChild(male_villager);
    male_villager.x = p.x;
    male_villager.y = p.y;
  }
  game.addChild(townhouse);
  renderer.render(game);
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(game);
}
function update(){

}
setTimeout(gameLoop(), 1000);
