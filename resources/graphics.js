var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var townhouse, state;

renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

PIXI.loader
  .add("../resources/townhouse.png")
  .load(setup);

function setup() {
  townhouse = new PIXI.Sprite(
    PIXI.loader.resources["../resources/townhouse.png"].texture
  );

  state = update;

  townhouse.x = screen.width/2-60;
  townhouse.y = screen.height/2-50;


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

gameLoop();
