	
	//GAmeArea
var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function(width, height) {
		this.canvas.setAttribute("id", "gameCanvas")
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext("2d");
		document.getElementById("game").insertBefore(this.canvas, document.getElementById("game").childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function(e){
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function(e){
			myGameArea.keys[e.keyCode] = false;
		})
	},
	
	clear : function(){
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	
	},
	
	stop : function(){
		document.getElementById("game").removeChild(document.getElementById("gameCanvas"));
		clearInterval(this.interval);
		var f = document.createElement("form");
		f.setAttribute("method", "get")
		f.setAttribute("class", "fill");
		f.setAttribute("id", "form");
		f.setAttribute("style", "background-color: rgb(91, 192, 222);");
		f.innerHTML = '<p class="gameText"> Your Score Is: </p>' + '<p class="gameText score">' +Math.round(SCORE) + '</p>' + '<input type="hidden" name="score" value="' +Math.round(SCORE) + '">';
		f.innerHTML += '<p id="nameInput" class="gameText formText"> Your Name: <input type ="text" class="inputText" name="name"></p><input type ="submit" class="btn btn-primary" value="Submit">'
		document.getElementById("game").appendChild(f);
	}
}
	
	
	//component constructor
function component(width, height, color, x, y, type, affectedByGravity, bouncy, speedX, speedY, health, name){
	this.type = type;
	if(this.type == "image" || this.type == "background"){
		this.image =new Image();
		this.image.src = color;
	}else {
		this.color = color;
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.name = name;

	this.speedX = speedX;
	this.speedY = speedY;
	if(affectedByGravity || bouncy){
		this.gravity = 0.05;
		this.gravitySpeed = 0;
		if(bouncy){
			this.bounce = 0.6;
		}
	}
	this.health = health;
	this.update = function(){
		ctx = myGameArea.context;
		
		if(this.type == "text"){
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}else if(this.type == "image" || this.type =="background"){
			ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
			
			if(type == "background"){
				if(this.x == 0){
					ctx.drawImage(this.image, this.x, this.y + this.height, this.width, this.height);
				}else{
					ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
				}
				
			}
		}else{
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	
	}
	this.newPos = function(){
		this.x += this.speedX;
		this.y += this.speedY;
		if(affectedByGravity){
			this.gravitySpeed += this.gravity;
			this.y += this.gravitySpeed;
			this.hitBottom();
		}
	
		
		if(this.type =="background"){
			if(myBackgroundSpeed < 0){
				if(this.x <= -(this.width-myBackgroundSpeed)){
					this.x = 0;
				}
				if(this.y <= -(this.height-myBackgroundSpeed)){
					this.y = 0;
				}
			}else{
				if(this.x >= myBackgroundSpeed){
					this.x = -(this.width + myBackgroundSpeed);
				}
				if(this.y >= myBackgroundSpeed){
					this.y = -(this.height + myBackgroundSpeed);
				}
			}
			
		}
	}
	
	this.hitBottom = function(){
		var rockbottom = myGameArea.canvas.height - this.height;
		if(this.y > rockbottom){
			this.y = rockbottom;
			if(bouncy){
				this.gravitySpeed = -(this.gravitySpeed * this.bounce);
			}
		}
	}
	
	this.crashWith = function(otherobj){
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
			crash = false;
		}
		return crash;
	}
}

function sound(src){
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}
	
function everyinterval(n){
	if((myGameArea.frameNo / n) % 1 == 0) {return true;}
	return false;
}