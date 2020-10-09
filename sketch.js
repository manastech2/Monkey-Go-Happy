var PLAY, END, gameState;
var monkey, monkeyImg, backgrond_1;
var bananaImg, obstacleImg
var bananaGroup, obstaclesGroup
var count, score
var invisibleGround
var ground
var backgroundImg
var trial

function preload() {
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  background_1 = loadImage("jungle.jpg")
  bananaImg = loadImage("banana.png")
  obstacleImg = loadImage("stone.png")
}





function setup() {
  createCanvas(400, 400);
  PLAY = 1;
  END = 0;
  gameState = PLAY;




  textSize(20);
  textFont("Georgia");
  textStyle(BOLD);
  stroke("black")
  fill("black")


  count = 0;
  score = 0
  trial=0



  backgroundImg = createSprite(200, 200, 400, 400)
  backgroundImg.addImage(background_1)
  backgroundImg.velocityX = -6

  monkey = createSprite(78, 336, 50, 40)
  monkey.addAnimation("monkey_1", monkeyImg)
  monkey.scale = 0.16
  monkey.setCollider('circle',-10,20,200)

  invisibleGround = createSprite(100, 380, 800, 20)
  invisibleGround.visible = false;


  bananaGroup = createGroup();
  obstaclesGroup = createGroup();


  ground = createSprite(100, 380, 400, 20)
  ground.x = ground.width / 2;
  ground.visible = false

}

function draw() {


  if (gameState === PLAY) {


    if (ground.x < 0) {
      ground.x = ground.width / 2;

    }
    if (backgroundImg.x < 0) {
      backgroundImg.x = backgroundImg.width / 2;

    }


    if (keyDown("space") && monkey.y >= 309) {
      monkey.velocityY = -17;
    }
    monkey.velocityY = monkey.velocityY + 0.8;


    count = count + Math.round(World.frameRate / 60);

    spawnObstacles();
    spawnBanana();
    
    


    if (obstaclesGroup.isTouching(monkey)&& trial>=0) {
      monkey.scale=0.16
      obstaclesGroup.destroyEach();
      trial--
    }
    else if(obstaclesGroup.isTouching(monkey)){
      gameState=END
    }
    
  
    for (var i = 0; i < bananaGroup.maxDepth(); i++) {
      var temp = bananaGroup.get(i);
      if (temp !== undefined && monkey.isTouching(temp)) {
        temp.destroy()
        score = score + 2


      }
    }
    switch(score){
      case 10:
        monkey.scale=0.18
        break;
      case 20:
        monkey.scale=0.20
        break;
      case 30:
        monkey.scale=0.22
        break;
      case 40:
        monkey.scale=0.24
        break;
      default:
        break;
    }

  } 
  else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    backgroundImg.velocityX = 0
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.pause();

  }





  monkey.collide(invisibleGround)


   
  drawSprites()
  text("Survival Time: " + count, 200, 30);
  text("Score: " + score, 40, 30);

}

function GroundReset() {
  var ground = createSprite(100, 380, 400, 20)
  ground.velocityX = -6
}


function spawnObstacles() {
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(400, 350, 10, 40);
    obstacle.addImage(obstacleImg)
    obstacle.velocityX = -6;


    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400, 320, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 134;

    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1


    //add each cloud to the group
    bananaGroup.add(banana);
  }
}