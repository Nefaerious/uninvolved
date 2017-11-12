var distCutoff = 5;
var hungerTime = 600;
var babyTime = 60;
var width = 1000;
var height = 1000;

var fNames = ["AMELIA","OLIVIA","EMILY","AVA","ISLA","JESSICA","POPPY","ISABELLA","SOPHIE","MIA","RUBY","LILY","GRACE","EVIE","SOPHIA","ELLA","SCARLETT","CHLOE","ISABELLE","FREYA","CHARLOTTE","SIENNA","DAISY","PHOEBE","MILLIE","EVA","ALICE","LUCY","FLORENCE","SOFIA","LAYLA","LOLA","HOLLY","IMOGEN","MOLLY","MATILDA","LILLY","ROSIE","ELIZABETH","ERIN","MAISIE","LEXI","ELLIE","HANNAH","EVELYN","ABIGAIL","ELSIE","SUMMER","MEGAN","JASMINE","MAYA","AMELIE","LACEY","WILLOW","EMMA","BELLA","ELEANOR","ESME","ELIZA","GEORGIA","HARRIET","GRACIE","ANNABELLE","EMILIA","AMBER","IVY","BROOKE","ROSE","ANNA","ZARA","LEAH","MOLLIE","MARTHA","FAITH","HOLLIE","AMY","BETHANY","VIOLET","KATIE","MARYAM","FRANCESCA","JULIA","MARIA","DARCEY","ISABEL","TILLY","MADDISON","VICTORIA","ISOBEL","NIAMH","SKYE","MADISON","DARCY","AISHA","BEATRICE","SARAH","ZOE","PAIGE","HEIDI","LYDIA","SARA"];
var mNames = ["OLIVER","JACK","HARRY","JACOB","CHARLIE","THOMAS","OSCAR","WILLIAM","JAMES","GEORGE","ALFIE","JOSHUA","NOAH","ETHAN","MUHAMMAD","ARCHIE","LEO","HENRY","JOSEPH","SAMUEL","RILEY","DANIEL","MOHAMMED","ALEXANDER","MAX","LUCAS","MASON","LOGAN","ISAAC","BENJAMIN","DYLAN","JAKE","EDWARD","FINLEY","FREDDIE","HARRISON","TYLER","SEBASTIAN","ZACHARY","ADAM","THEO","JAYDEN","ARTHUR","TOBY","LUKE","LEWIS","MATTHEW","HARVEY","HARLEY","DAVID","RYAN","TOMMY","MICHAEL","REUBEN","NATHAN","BLAKE","MOHAMMAD","JENSON","BOBBY","LUCA","CHARLES","FRANKIE","DEXTER","KAI","ALEX","CONNOR","LIAM","JAMIE","ELIJAH","STANLEY","LOUIE","JUDE","CALLUM","HUGO","LEON","ELLIOT","LOUIS","THEODORE","GABRIEL","OLLIE","AARON","FREDERICK","EVAN","ELLIOTT","OWEN","TEDDY","FINLAY","CALEB","IBRAHIM","RONNIE","FELIX","AIDEN","CAMERON","AUSTIN","KIAN","RORY","SETH","ROBERT","ALBERT","SONNY"];

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
var tree = {x: 0, y: 0, health = 1.00};


var lastTime  = window.performance.now();
var thisTime = window.performance.now();


function loop(){
	thisTime = window.performance.now();
	console.log(people);
	for(var i =people.length-1; i>=0; i--){
		var p = people[i];
		move(p);
		checkOb(p);
		setOb(p);
		if(updateState(p) == false){
			console.log();
			people.splice(i);
		}
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
	if(p.hunger<0.5){

	}
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

function updateState(p){
	var dTime = thisTime - lastTime;
	p.hunger -= (dTime/1000) / hungerTime;
	if(p.hunger <= 0 || p.health <= 0){
		return false;
	}

	if(p.male == false){
		var babyChance = dTime * (1 / babyTime / 1000);
		if(Math.random() < babyChance){
			var baby = getClone(person);
			baby.lastName = p.lastName;
			baby.male = Math.random() > 0.5;
			if(baby.male){
				baby.firstName = mNames[Math.floor(Math.random()*mNames.length)];
			}else {
				baby.firstName = fNames[Math.floor(Math.random()*fNames.length)];
			}
			people.push(baby);
		}
		return true;
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

init();

var count = 0;

lastTime = window.performance.now();
setInterval(function(){ 
	if(count++ < 20){
		loop();
	}
}, 8);
