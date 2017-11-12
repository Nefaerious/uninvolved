var ctx;
window.onload = function(){
  var canvas = document.getElementById("paper");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "silver";
  ctx.fillRect(50,50,50,50);
};
