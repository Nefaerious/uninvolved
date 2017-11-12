var distCutoff = 5;
var hungerTime = 60;

var width = 1000;
var height = 1000;


var buildings = [];
var people = [];
var beasts = [];
var environment = [];

// buildings
var townHall = {id: 0, x:0, y: 0, width: 10, height: 10, type: "townHall"};

// people
var person = {id: 0, x: 0, y: 0, health: 1.00, hunger: 1.00, firstName:"John", lastName: "Smith", male: true, ob: false, obName: false, speed: 10, marriedTo: false};

// beasts


// environments
var lastTime  = window.performance.now();
var thisTime = window.performance.now();


function loop(){
	thisTime = window.performance.now();
	console.log(people);
	for(var i =0; i<people.length; i++){
		var p = people[i];
		move(p);
		checkOb(p);
		setOb(p);
	}
	lastTime = thisTime;
}

function move(p){
	if(distToOb(p) > 5){
		var dTime = thisTime - lastTime;
		var pheta = Math.atan2(p.ob.y-p.y, p.ob.x - p.x);
		var dX = dTime * (p.speed / 1000) * Math.cos(pheta);
		var dY = dTime * (p.speed / 1000) * Math.sin(pheta);
		p.x += dX;
		p.y += dY;
	}
}

function checkOb(p){
	if(distToOb(p) < 5){
		switch(p.obName){
			case 'mate':
				if(p.ob.obName=="mate"){
					marry(p,p.ob);
				}
				p.ob = false;
				p.ob.Name = false;
			break;
		}
	}
}

function setOb(p){
	p.obName = "mate";
	var bestM = false;
	var bestDist = Number.MAX_SAFE_INTEGER;
	for(var i=0; i<people.length; i++){
		var m = people[i];
		thisDist = distTwo(p,m);
		if(m != p && m.male == !p.male && !m.marriedTo && thisDist<bestDist){
			bestM = m;
			bestDist = thisDist;
		}
	}
	if(bestM != false){
		p.ob = bestM;
	}
}

function marry(a,b){
	a.marriedTo = b;
	b.marriedTo = a;
	if(a.male){
		b.lastName = a.lastName;
	}else{
		a.lastName = b.lastName;
	}
}

function init() {
	console.log("INIT");
	var th = getClone(townHall);
	th.x = 500;
	th.y = 500;
	buildings.push(th);

	var guy = getClone(person);
	guy.x = 475;
	guy.y = 475;
	people.push(guy);

	var girl = getClone(person);
	girl.male = false;
	girl.firstName = "Jill";
	girl.lastName = "Stein";
	girl.x = 525;
	girl.y = 475;
	people.push(girl);
}

function getClone(o) {
	return Object.assign({}, o); 
}

function distTwo(a, b) {
	return Math.sqrt(Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2));
}


function distThree(a, x, y) {
	return Math.sqrt(Math.pow(a.x-x,2) + Math.pow(a.y-y,2));
}

function distToOb(a){
	return distThree(a, a.ob.x, a.ob.y);
}

function shit(){

}

init();

var count = 0;

lastTime = window.performance.now();
setInterval(function(){ 
	if(count++ < 1000){
		loop();
	}
}, 8);
