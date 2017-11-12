var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var sprite;

renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

PIXI.loader
  .add("../resources/villager.png")
  .load(setup);

function setup() {
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["../resources/villager.png"].texture
  );

  game.addChild(sprite);
  renderer.render(game);
}

function gameLoop() {

  requestAnimationFrame(gameLoop);

  //Move the cat 1 pixel to the right each frame
  sprite.x += 1;

  //Render the stage to see the animation
  renderer.render(stage);
}
