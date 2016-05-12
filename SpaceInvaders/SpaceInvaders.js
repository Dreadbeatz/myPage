var myBackground;
var myShip;
var myShipSpeed = 5;
var myBackgroundSpeed = 20;
var enemyShip = [];
var myBullet = [];
var myBulletSpeed = 5;
var enemyBullet = [];
var enemyBulletSpeed = 5;
var shotTime = 0;
var shotInterval = 25;
var myScore;
var myBulletSpeedText;
var SCORE = 0;
var enemyInterval = 180;
var enemyCycle = 1;
var enemySpeed = 2;
var damage = 3;
var enemyDamage = 6;
var myHealth;
var death = false;
var bossesKilled =0;

var upgrade = null;
var upgradedDir = false;

var myShpisSrc = "fighter1.png";
var myShipSrcUpg = new Image();
myShipSrcUpg.src = "fighter.png"; 

var upgradeFire = "electricMutate.png";
var upgradeDir = "thornsMutate.png";
var enemyShipSrc1 = "A1.png";
var enemyShipSrc2 = "C11.png";
var enemyShipSrc3 = "E4.png";
var enemyBoss ="boss.png";

var myMusic;
var laserSound;
var deathSound;

function startGame(){
	myBulletSpeedText = new component("18px","Consolas","white", 0,470,"text",false,false,0,0,0,0);
	myHealth = new component("18px","Consolas","white",200,470,"text",false,false,0,0,0,0);
	myScore = new component("18px", "Consolas", "white", 0, 445, "text", false, false,0,0,0,0);
	myBackground = new component(350,880,"stars.png",0,0,"background",false,false,0,0,0,0);
	myShip = new component(50,50, myShpisSrc, 160, 400, "image", false, false,0,0,100,0);
	myMusic = new sound("RainingBits.ogg");
	myMusic.play();
	deathSound = new sound("death.wav");
	laserSound = new sound("laser4.wav");
	myGameArea.start(350,480);
}

function updateGameArea(){
	myGameArea.clear();
	myGameArea.frameNo += 1;
	updateMyBackground();
	if(everyinterval(enemyInterval) || myGameArea.frameNo == 50){
		enemyCycle += 1;
		if(enemyCycle < 8){
			spawnenemyShip(enemyCycle, enemyShipSrc1,2,"blue",20);
		}else if(enemyCycle < 16){
			spawnenemyShip(enemyCycle, enemyShipSrc2,5,"red",30);
		}else if(enemyCycle < 24){
			spawnenemyShip(enemyCycle, enemyShipSrc3,7,"white",40);
		}else if(enemyCycle > 24 && enemyCycle < 26){
			enemyShip.push(new component(100,80,enemyBoss, 80,10,"image",false,false,-enemySpeed,enemySpeed,70,"boss"));//boss1
		}
		
		
	}
	enemyShot();
	if(everyinterval(enemyInterval*8)){
		enemySpeed += 1;
	}
	if(enemyShip.length > 0){
		updateAllEnemyShip();
	}
	if(myShip.health <= 0){
		myMusic.stop();
		if(!death){
			deathSound.play();
			death = true;
		}
		
		myShipSpeed = 0;
		myBulletSpeed = 0;
		enemyBulletSpeed = 0;
		myBackground.y = 0;
		enemyCycle = 100;
		shotInterval = 0;
		for(i = 0; i < enemyShip.length; i+= 1){
			enemyShip[i].speedX = 0;
		}
		myGameArea.stop();
		document.getElementById("form").setAttribute("action", "spaceInvaders");
	}
	myUpgrades();
	updateMyShip();
	myBulletSpeedText.text = "Bullet speed: " + (30 - shotInterval);
	myBulletSpeedText.update();
	myScore.text = "SCORE: " + SCORE;
	myScore.update();
	myHealth.text = "HEALTH: " + myShip.health;
	myHealth.update();
}

function spawnenemyShip(numberOfShip,src, h,n,s){
	for(i = 1; i<=numberOfShip; i+= 1){
		enemyShip.push(new component(s,s,src, 80 * i,10,"image",false,false,-enemySpeed,0,h,n));
	}
	
}

function updateAllEnemyShip(){
	for(i = 0; i < enemyShip.length; i += 1){
		if(enemyShip[i].name == "boss"){
			if(enemyShip[i].x < 0){
				enemyShip[i].speedX = enemySpeed;
				enemyShip[i].speedY = 0;
			}else if(enemyShip[i].x > (myGameArea.canvas.width - enemyShip[i].width)){
				enemyShip[i].speedX = -enemySpeed;
				enemyShip[i].speedY = -enemySpeed;
			}else if(enemyShip[i].y < 0){
				enemyShip[i].speedX = -enemySpeed;
				enemyShip[i].speedY = enemySpeed;
			}
		}else if(enemyShip[i].x < -enemyShip[i].width || enemyShip[i].x > myGameArea.canvas.width){
			enemyShip[i].speedX = -enemyShip[i].speedX;
			enemyShip[i].y += enemyShip[i].height + 10;
		} 
		if(enemyShip[i].y > 480){
			enemyShip.splice(i,1);
		}
		if(enemyShip[i].crashWith(myShip)){
			enemyShip.splice(i,1);
			myShip.health -= 15;
		}
		enemyShip[i].newPos();
		enemyShip[i].update();
	}
}

function updateMyShip(){
	myShip.speedX = 0;
	myShip.speedY = 0;
	if(myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65]) && myShip.x > 0){myShip.speedX  = -myShipSpeed/1.2;}
	if(myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68]) && myShip.x < myGameArea.canvas.width - myShip.width){myShip.speedX  = myShipSpeed/1.2;}
	if(myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87]) && myShip.y > 0){myShip.speedY  = -myShipSpeed/1.8;}
	if(myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83]) && myShip.y < myGameArea.canvas.height - myShip.height){myShip.speedY  = myShipSpeed;}
	shot();
	myShip.newPos();
	myShip.update();
}

function updateMyBackground(){
	myBackground.speedY = myBackgroundSpeed;
	myBackground.newPos();
	myBackground.update();
}

function shot(){
	if(myGameArea.keys && (myGameArea.keys[32]) && ((myGameArea.frameNo - shotTime) > shotInterval || shotTime == 0) && !death){
		var bulletX = myShip.x +(myShip.width / 2) - 2;
		var bulletY = myShip.y;
		if(!upgradedDir){
			myBullet.push(new component(4, 8, "yellow", bulletX,bulletY,"color", false, false, 0,-myBulletSpeed,0,0));
		}else{
			myBullet.push(new component(4, 8, "yellow", bulletX,bulletY,"color", false, false, 0,-myBulletSpeed,0,0));
			myBullet.push(new component(4, 8, "yellow", bulletX-12,bulletY,"color", false, false, -1,-myBulletSpeed,0,0));
			myBullet.push(new component(4, 8, "yellow", bulletX+12,bulletY,"color", false, false, 1,-myBulletSpeed,0,0));
		}
		laserSound.play();
		shotTime = myGameArea.frameNo;
	}
	if(myBullet.length > 0){
		for(i = 0; i < myBullet.length; i += 1){
			myBullet[i].newPos();
			myBullet[i].update();
			for(j = 0; j < enemyShip.length; j +=1){
				if(myBullet[i].crashWith(enemyShip[j])){
					myBullet.splice(i,1);
					enemyShip[j].health -= damage;
					if(enemyShip[j].health <= 0){
						if(enemyShip[j].name == "blue"){
							SCORE += 2;
						}else if(enemyShip[j].name == "red"){
							SCORE += 5;
						}else if(enemyShip[j].name == "white"){
							SCORE += 8;
						}else if(enemyShip[i].name ="boss"){
							SCORE += 50;
							enemyCycle = 1;
							myGameArea.frameNo = 0;
							shotTime = 0;
							bossesKilled++;
							if(bossesKilled > 2){
								myMusic.play();
							}
						}
						SCORE += enemySpeed;
						enemyShip.splice(j,1);
					}
					
				}else if(myBullet[i].y < 0){
					myBullet.splice(i,1);
				} 
			}
		}
	}
}

function enemyShot(){
	if(everyinterval(100)){
		for(i = 0; i < 5 && i < enemyShip.length; i += 1){
			var enemyBulletX = enemyShip[i].x + (enemyShip[i].width / 2) - 2;
			var enemyBulletY = enemyShip[i].y + enemyShip[i].height;
			if(enemyShip[i].name != "boss"){
				enemyBullet.push(new component(4,8,"yellow",enemyBulletX,enemyBulletY,"color",false,false,0,enemyBulletSpeed,0,0));
			}else {
				enemyBullet.push(new component(4,8,"yellow",enemyBulletX,enemyBulletY,"color",false,false,0,enemyBulletSpeed,0,0));
				enemyBullet.push(new component(4,8,"yellow",enemyBulletX-10,enemyBulletY,"color",false,false,1,enemyBulletSpeed,0,0));
				enemyBullet.push(new component(4,8,"yellow",enemyBulletX+10,enemyBulletY,"color",false,false,-1,enemyBulletSpeed,0,0));
				enemyBullet.push(new component(4,8,"yellow",enemyBulletX-25,enemyBulletY,"color",false,false,-1,enemyBulletSpeed,0,0));
				enemyBullet.push(new component(4,8,"yellow",enemyBulletX+25,enemyBulletY,"color",false,false,1,enemyBulletSpeed,0,0));
			}
			
		}
	}
	if(enemyBullet.length > 0){
		for(i = 0; i < enemyBullet.length; i += 1){
			enemyBullet[i].newPos();
			enemyBullet[i].update();
			 if(enemyBullet[i].crashWith(myShip)){
				enemyBullet.splice(i,1);
				myShip.health -= enemyDamage;
			}else if(enemyBullet[i].y > 480){
				enemyBullet.splice(i,1);
			}
		}
	}
}

function myUpgrades(){
	if(everyinterval(700)){
		var ran = Math.floor((Math.random()*10)+1);
		var img;
		var randx = Math.floor((Math.random()*300));
		var randy = Math.floor((Math.random()*200) + 240);
			if(ran > 7 && !upgradedDir){
				img = upgradeDir;
				var N = "dir";
			}else if(shotInterval > 5){
				img = upgradeFire;
				var N = "fire";
			}
		upgrade = new component(20,35, img, randx,randy,"image",false,false,0,0,0,N);
		
	}
	if(upgrade != null && (upgrade.name == "dir" || upgrade.name == "fire")){
		if(upgrade.crashWith(myShip)){
			if(upgrade.name == "dir"){
				upgradedDir = true;
				damage = 1;
				myShip.image.src = myShipSrcUpg.src;
			}else if(upgrade.name == "fire"){
				shotInterval -= 2;
			}
			upgrade = null;
		}
		upgrade.newPos();
		upgrade.update();
	}
}