var game = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(256,256);
var townhouse, male_villager, state;

renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);


setTimeout(function(){PIXI.loader
  .add("../resources/townhouse.png")
  .add("../resources/male_villager.png")
  .load(setup);},1000);

function setup() {
  townhouse = new PIXI.Sprite(
    PIXI.loader.resources["../resources/townhouse.png"].texture
  );
  male_villager = new PIXI.Sprite(
    PIXI.loader.resources["../resources/male_villager.png"].texture
  );

  state = play;

  townhouse.x = screen.width/2-54;
  townhouse.y = screen.height/2-38;



  for(var p in people){
    male_villager.x = p.x;
    male_villager.y = p.y;
    game.addChild(male_villager);
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
  male_villager.x +=1;
}
