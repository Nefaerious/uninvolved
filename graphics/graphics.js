var renderer = PIXI.autoDetectRenderer(256,256);
renderer.backgroundColor = 0xf0f0f0;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var game = new PIXI.container();
renderer.render(game);
