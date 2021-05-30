

var PLAY = 1;
var END = 0;

var gameState = 1;
var monkey, monkey_running;

var monkey_collideImage;
var banana, bananaImage, obstacle, obstacleImage;

var FoodGroup, obstacleGroup;
var ground;

var score;
var survivalTime;

function preload() {


  monkey_running = loadAnimation("sprite_0.png",
                                 "sprite_1.png", 
                                 "sprite_2.png", 
                                 "sprite_3.png",
                                 "sprite_4.png",
                                 "sprite_5.png",
                                 "sprite_6.png",
                                 "sprite_7.png",
                                 "sprite_8.png")
 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
monkey_collideImage = loadImage("sprite_8.png")
}



function setup() {
  createCanvas(600, 600);
 
  ground = createSprite(90, 325, 1800, 10);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
  
  score = 0;
  survivalTime = 0

  monkey = createSprite(80, 315, 40, 40);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  console.log(monkey.y);
  
}


function draw() {
  background(400);

  if (gameState === PLAY) {
    
   
    monkey.velocityY = monkey.velocityY + 0.5;
    
   
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
   
    if (monkey.isTouching(FoodGroup)) {

      FoodGroup.destroyEach();
      score = score + 1;
    }

    monkey.collide(ground);

  
    if (keyDown("space") && monkey.y >= 289) {
      monkey.velocityY = -12;
    }




    Banana();
    Obstacles();

    if (monkey.isTouching(obstacleGroup)) {

      gameState = END;

    }
  } else if (gameState === END) {
    
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.addImage("collide", monkey_collideImage);

   
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    
    ground.velocityX = 0;

    monkey.collide(ground);
  
    fill(rgb(124, 0, 0));
    textSize(30);
    text("PRESS R TO SERVE", 300, 100);

    if (keyDown("r")) {
      reset();
    }
  }
  drawSprites();
  
 
  fill(rgb(235, 124, 25));
  textSize(20);
  text("score: " + score, 50, 400);

 
  survivalTime = survivalTime + Math.round(getFrameRate()/62.5);
  stroke("white");
  fill("red");
  textSize(30);
  text("Survival Time: " + survivalTime, 100, 30);

}

function reset() {

  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  sarvivalTime = 0;
  score = 0;

}


function Obstacles() {

  if (frameCount % 160 === 0) {
 
    var obstacle = createSprite(600, 290, 20, 25);
    obstacle.velocityX = -5
    obstacle.scale = 0.2;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, 310, 410);
    
  }
}

function Banana() {
  
  if (frameCount % 140 === 0) {
    var banana = createSprite(600, 320, 20, 20);
    banana.y = Math.round(random(40, 200));
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    banana.lifetime = 120;
    FoodGroup.add(banana);
  }
}





