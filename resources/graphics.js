var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var sprite, state;

renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

PIXI.loader
  .add("../resources/villager_male.png")
  .load(setup);

function setup() {
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["../resources/villager_male.png"].texture
  );

  state = update;

  game.addChild(sprite);
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
