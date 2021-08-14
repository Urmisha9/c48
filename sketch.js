var PLAY = 1;
var END = 0;
var gameState = PLAY; 

var jungle,jungle_img;
var harry,harry_gifloadImg,harry_gifcreateImg;
var harry_img;

var witch, witch_img, witchesGroup;
var spookySound;

var bat, bat_img, batsGroup;
var invisibleGround;

var score;
var gameOverImg, restartImg;

var life = 3;
var score;
 
function preload(){
  jungle_img = loadImage("jungle2.jpg");
  harry_gifloadImg = loadImage("harrypotter.gif");
  harry_gifcreateImg = createImage("harrypotter.gif");

  witch_img = loadImage("witch2.png");
  spookySound = loadSound("spooky.wav");
  bat_img = loadImage("bat.png");
  harry_img = loadImage("Harry1.png")

  life_img = loadImage("heart_1.png");
  gameOverImg = loadImage("gameOver.png");
  
  
}


function setup() {
  createCanvas(600, 400);
  spookySound.loop();
  
  //Moving background
  jungle = createSprite(600,200,400,20);
  jungle.addImage("jungle",jungle_img);
  jungle.x = jungle.width/2;
  jungle.scale = 0.999;
  
  //Playing Character
  harry = createSprite(50,180,20,50);
  harry.addImage("harry",harry_img);
  harry.scale = 1.5;

  //creating lives
  heart1 = createSprite(40,40,10,10);
  heart1.addImage(life_img);
  heart1.scale = 0.26;

  heart2 = createSprite(87,40,10,10);
  heart2.addImage(life_img);
  heart2.scale = 0.26;

  heart3 = createSprite(137,40,10,10);
  heart3.addImage(life_img);
  heart3.scale = 0.27;

  //gameover sprite
  gameOver = createSprite(250,200,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  
  
 
   batsGroup = new Group();
   witchesGroup = new Group();

  invisibleGround = createSprite(200,380,400,10);
  invisibleGround.visible = false;
  
  score = 0;
}

function draw() {
  background(180);
//image(harry_gif_loadImg,50,50);

if (gameState === PLAY){
  jungle.velocityX = -5;
  
  if(jungle.x<0){
    jungle.x = jungle.width/2
 }
 if(keyDown("space") && harry.y >= 159) {
  harry.velocityY = -12;
}

harry.velocityY = harry.velocityY + 0.8
spawnBats();
spawnWitches();


if(harry.isTouching(witchesGroup)){
  witchesGroup[0].destroy()
  life = life - 1

}
if(harry.isTouching(batsGroup)){
  batsGroup[0].destroy()
 score = score + 30


}

}

if(gameState === END){
  gameOver.visible = true;
  jungle.velocityX = 0;
  witchesGroup.setVelocityXEach(0);
  batsGroup.setVelocityXEach(0);

}
  
if(life === 2){
  heart1.visible = true
  heart2.visible = true
  heart3.visible = false

}  
if(life === 1){
  heart1.visible = true
  heart2.visible = false
  heart3.visible = false

}  
if(life === 0){
  heart1.visible = false
  heart2.visible = false
  heart3.visible = false
  gameState = END

} 



harry.collide(invisibleGround);



 

  drawSprites();
stroke("black")  
fill("black")
textSize(20)  
text("Score:"+ score,500,50);  

}


function spawnBats(){
   //write code here to spawn the bats
   if (frameCount % 120 === 0) {
     
    var bat = createSprite(600,120,40,10);
    bat.y = Math.round(random(80,120));
    bat.addImage(bat_img);
    bat.scale = 0.1;
    bat.velocityX = -3;
    
     //assign lifetime to the variable
    bat.lifetime = 200;
    
    //adjust the depth
    bat.depth = harry.depth;
    harry.depth = harry.depth + 1;
    
    //add each bat to the group
    batsGroup.add(bat);
  }
  
}

function spawnWitches(){
  //write code here to spawn the bats
  if (frameCount % 290 === 0) {
    
   var witch = createSprite(600,120,40,10);
   witch.y = Math.round(random(80,120));
   witch.addImage(witch_img);
   witch.scale = 0.25;
   witch.velocityX = -3;
   
    //assign lifetime to the variable
   witch.lifetime = 200;
   
     //add each witch to the group
   witchesGroup.add(witch);
 }
 
}








