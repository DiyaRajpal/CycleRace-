var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var cycleBell,cycleSound;
var yellowCG,redCG,pinkCG;
var yellowCycle,redCycle,pinkCycle;
var player1,player2,player3;
var gameOver,gameOverImg;
var pinkCycleGroup,redCycleGroup,yellowCycleGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  cycleSound=loadSound("bell.mp3");
  pinkCycle=loadImage("pink cycle.jpg");
  redCycle=loadImage("red cycle.jpg");
  yellowCycle=loadImage("yellow cycle.jpg");
  gameOverImg=loadImage("gameOver.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(6+2*distance%150);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  gameOver=createSprite(250,150,10,10)
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.05;
  gameOver.visible=false;
  
  pinkCycleGroup=new Group();
  redCycleGroup=new Group();
  yellowCycleGroup=new Group();

}

function draw() {
  background(0);
  

  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  distance=distance=Math.round(getFrameRate()/50);

  createEdgeSprites();
  
  pinkCyclists();
  redCyclists();
  yellowCyclists();
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
  if(mainCyclist.isTouching(pinkCycleGroup)){
    gameOver.visible=true;
    gameState=END;
    path.velocityX=0
    pinkCycleGroup.velocityX=0;
    pinkCycleGroup.setLifetime=-1;
    text("Press Up Arrow To restart the game",250,150);
  } 
    if(mainCyclist.isTouching(redCycleGroup)){
    gameOver.visible=true;
    gameState=END;
    path.velocityX=0
    player1.velocityX=0;
    player1.setLifetime=-1;
    text("Press Up Arrow To restart the game",250,150);  
  } 
    if(mainCyclist.isTouching(yellowCycleGroup)){
    gameOver.visible=true;
    gameState=END;
    path.velocityX=0
    player1.velocityX=0;
    player1.setLifetime=-1;
    
  } 
    
  if(keyDown("space")){
    cycleSound.play();
  }   
 
  
  
 }
  
  
  if(gameState===END){
    yellowCycleGroup.destroyEach();
    redCycleGroup.destroyEach();  
    pinkCycleGroup.destroyEach();  
    text("Press Up Arrow To restart the game",250,250); 
  }
  if(keyDown("up_arrow")){
    reset();
  }
  drawSprites()
}

function pinkCyclists(){
if(frameCount%70===0){  
  player1=createSprite(450,Math.round(random(50,250)));
  player1.addImage(pinkCycle);
  player1.scale=0.5;
  player1.lifetime=180;
  player1.velocityX=-(6+2*distance%150);
  
  pinkCycleGroup.add(player1);
}
}
function redCyclists(){
if(frameCount%100===0){  
  player2=createSprite(450,Math.round(random(50,250)));
  player2.addImage(redCycle);
  player2.scale=0.5;
  player2.lifetime=180;
  player2.velocityX=-(6+2*distance%150);
  
  redCycleGroup.add(player2);
}
}
function yellowCyclists(){
if(frameCount%130===0){  
  player3=createSprite(450,Math.round(random(50,250)),10,10);
  player3.addImage(yellowCycle);
  player3.scale=0.5;
  player3.lifetime=180;
  player3.velocityX=-(6+2*distance%150);
  
  yellowCycleGroup.add(player3);
}
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  
  
  distance=0;
}