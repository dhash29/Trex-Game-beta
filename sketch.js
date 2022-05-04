var trex, trex_running, edges;
var ground
var groundImage;
var obstaclegroup;
var cloudGroup
var invisibleGround
var cloud
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score = 0
var PLAY = 1;
var END = 0;
var gamestate = PLAY
var trex_collided
var gameover
var restart
var gameover_image
var restart_image
var checkpoint_sound
var die_sound
var jump_sound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameover_image = loadImage("gameOver.png")
  trex_collided = loadAnimation("trex_collided.png")
  restart_image = loadImage("restart.png")
  checkpoint_sound = loadSound("checkpoint.mp3")
  jump_sound = loadSound("jump.mp3")
  die_sound = loadSound("die.mp3")
}


function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("TrexC", trex_collided)
  trex.scale = 0.5;
  //trex.debug = true
  //trex.setCollider("circle", 20,0,60)


  //edges = createEdgeSprites();
  ground = createSprite(250, 190, 600, 20)
  ground.addImage(groundImage)
  ground.x = ground.width /2
  invisibleGround = createSprite(250, 205, 600, 20)
  invisibleGround.visible = false

  //creating EndSprites

  gameover = createSprite(300, 100)
  gameover.addImage(gameover_image)
  gameover.scale = 0.7

  restart = createSprite(300, 150)
  restart.addImage(restart_image)
  restart.scale = 0.5
  cloudGroup = createGroup()
  obstaclegroup = createGroup()
}


  

function draw(){
  //set background color 
  background("grey");

  //checking if gamestate is equal to play
  if(gamestate == PLAY){

  //logging the y position of the trex
  //console.log(trex.y)

    ground.velocityX = -2

  //jump when space key is pressed
    if((keyDown("space") || keyDown("UP_ARROW")) && trex.y >= 100){
      trex.velocityY = -7;
      jump_sound.play()
  }


  gameover.visible = false
  restart.visible = false


  trex.velocityY = trex.velocityY +0.5


  score = score + Math.round(frameCount/60)

  cactus()

  clouds()

  if(ground.x <0){
    ground.x = ground.width /2
  }

  if(obstaclegroup.isTouching(trex)){
    gamestate = END
    die_sound.play()
  }

  if(score>0 && score%1000 == 0){
  }

  }
  
  else if(gamestate == END){
    gameover.visible = true
    restart.visible = true
    trex.velocityY = 0
    trex.changeAnimation("TrexC", trex_collided)
    ground.velocityX = 0
    obstaclegroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
  }


  fill("black")
  text("Score: "+score, 500,30)
   //stop trex from falling down
   trex.collide(invisibleGround)
   drawSprites();
  
}



function cactus(){
  if(frameCount%70 == 0){
    allobstacles = createSprite(600, 170)
    allobstacles.velocityX = -(6+score/100)
    allobstacles.scale = 0.6
    


    var pic = Math.round(random(1,6))
    
    switch(pic){

      case 1: allobstacles.addImage(obstacle1)
      break;

      case 2: allobstacles.addImage(obstacle2)
      break;

      case 3: allobstacles.addImage(obstacle3)
      break;

      case 4: allobstacles.addImage(obstacle4)
      break;

      case 5: allobstacles.addImage(obstacle5)
      break;

      case 6: allobstacles.addImage(obstacle6)
      break;

      default:break;

    }
    allobstacles.lifetime = 100
    obstaclegroup.add(allobstacles)
  }

}


function clouds(){
  if(frameCount%60 == 0){
    cloud = createSprite(595, 50)
    cloud.addImage(cloud_image)
    cloud.y = Math.round(random(20,80))
    cloud.scale = 0.5
    cloud.velocityX = -5
    //console.log(trex.depth)
    //console.log(cloud.depth)
    cloud.depth = trex.depth
    trex.depth = trex.depth +1
    cloud.lifetime = 150
    cloudGroup.add(cloud)
  }
}
