var myGamePiece;
var myObstacle = [];
var myScore;
var myBackground;
var myMusic;
var mySound;
var SCORE = 0;
var death= 0;
var speed = 4;
var myBackgroundSpeed = -2
var obstacleSpeed = 4;
var wallIntensity = 150; //več = manj pogosto

function startGame(){
			
			myGamePiece = new component(30,30,"smiley.gif", 100, 120, "image", true, false,0,0,0,0);
			myScore = new component("30px", "Consolas", "black", 280, 40, "text", false, false,0,0,0,0);
			myBackground = new component(656, 270, "country.png", 0, 0, "background", false,false,0,0,0,0);
			myMusic = new sound("SweetDinosaur.mp3");
			mySound = new sound("death.wav");
			myMusic.play();
			myGameArea.start(480,270);
}


function updateGameArea(){
	var x, y;
	
	for(i = 0; i < myObstacle.length; i += 1){
		if(myGamePiece.crashWith(myObstacle[i])){
			speed = 0;
			myGamePiece.image.src = "angry.gif";
			myMusic.stop();
			mySound.play();
			death += 1;
			if(death > 25){
				mySound.stop();
			}
			
			if(myGamePiece.y > 235){
				myGameArea.stop();
				document.getElementById("form").setAttribute("action", "angrySmiley");
			}
			
			
			//return;
		}
	}
	myGameArea.clear();
	myBackground.newPos();
	myBackground.update();
	myGameArea.frameNo += 1;
	if(everyinterval(500) && wallIntensity > 30){
		wallIntensity -= 20;
		obstacleSpeed += 2;		
	}
	if(myGameArea.frameNo == 1 || everyinterval(wallIntensity)){
		x = myGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 150;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		minGap = 70;
		maxGap = 120;
		gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
		
		myObstacle.push(new component(10, height, "bricksx64.png", x, 0,"image", false,false));
		myObstacle.push(new component(10, x-height-gap, "bricksx64.png", x, height+gap,"image",false,false));
	}
	for(i = 0; i < myObstacle.length; i += 1){
		myObstacle[i].x += -speed ;
		myObstacle[i].update();
	}
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	myBackground.speedX = -speed * 0.8;
	if(myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65]) && myGamePiece.x > 0){myGamePiece.speedX  = -speed * 1.5;}
	if(myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68]) && myGamePiece.x < myGameArea.canvas.width - myGamePiece.width){myGamePiece.speedX  = speed * 1.5;}
	if(myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87]) && myGamePiece.y > 0){
		myGamePiece.speedY  = -speed * 1.5;
		myGamePiece.gravitySpeed = 0;
	}
	if(myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83]) && myGamePiece.y < myGameArea.canvas.height - myGamePiece.height){myGamePiece.speedY  = speed * 1.5;}
	
	if(speed != 0){
		SCORE += (( speed*10 / wallIntensity) + (myGameArea.frameNo / 30)) / 100;
		
	}
	
	
	myScore.text = "SCORE: " + Math.round(SCORE);
	myScore.update();
	myGamePiece.newPos();
	myGamePiece.update();
	
	
	
}

