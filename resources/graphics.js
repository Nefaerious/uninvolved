var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var sprite, state;

renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var rectangle = new PIXI.Graphics();
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 20, 20);
rectangle.endFill();
rectangle.x = screen.width/2;
rectangle.y = screen.height/2;

PIXI.loader
  .add("../resources/villager_male.png")
  .load(setup);

function setup() {
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["../resources/villager_male.png"].texture
  );

  state = update;


  game.addChild(rectangle);
  game.addChild(sprite);
  renderer.render(game);
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(game);
}
function update(){
  sprite.x +=1;
}

gameLoop();
