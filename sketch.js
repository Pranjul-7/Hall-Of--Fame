// Creating Variable
var bird,coin,bird1,birdImg,pipeImg;
var bg,bgImg,bg1;
var start,title,story,space,pause,pauseui;
var startIMG,titleIMG,storyIMG,spaceIMG,pauseIMG,pauseuiIMG;
var bup,bdo;
var invisibleGround;
var gamestate = "start";
var coins = 0 ;
var bgselect = 1;
var storym;
var a = 1;
var birdIMG,coinIMG;
var pipesGroup;
var count = 0; 
var coinGroup;
var b = 0;
var c = 0;
var coc;
var score=0;
var font ;
var power,powerIMG;
var restart;
var invisibleGround1;
var dead;
// Loading Image
function preload()
{
  bgImg = loadImage("maxresdefault.jpg");
  startIMG = loadImage("download (9).png");
  titleIMG = loadImage("title.png");
  birdImg = loadImage("images__9_-removebg-preview-removebg-preview.png");
  bg1 = loadImage("maxresdefault1.png");
  storym =loadSound("st.mp3");
  storyIMG=loadImage("sp1.png");
  spaceIMG = loadImage("sp.png");
  bup = loadImage("bird_up.png");
  bdo = loadImage("bird_down.png");
  birdIMG = loadImage("ep.png");
  coinIMG = loadAnimation("c1p.png","c2p.png","c3p.png","c4p.png","c5p.png","c6p.png","c7p.png","c8p.png","c9p.png","c10p.png");
  pauseIMG = loadImage("p1.png");
  coc = loadSound("coinc.mp3");
  dead = loadSound("dead.webm")
  //Loading font
  font=loadFont("mrsmonsterout.ttf");
  pipesGroup= createGroup();
  coinGroup =  createGroup();
}
function setup() 
{
  createCanvas(450, 600);
  text('Coins: '+coins, 225 , 300);
  // Creating Background
  bg = createSprite(225,300,50,50);
  bg.addImage("bg",bgImg);
  bg.visible=true;
  // Creating Start Button
  start= createSprite(225,600,50,50);
  start.addImage("start",startIMG);
  start.scale=0.1;
  start.visible=false;
  // Creating Title
  title = createSprite(225,0,50,50);
  title.addImage("title",titleIMG);
  title.scale=1.2;
  title.visible=false;
  // Creating Bird
  bird = createSprite(0,300,50,50);
  bird.addImage("bird",birdImg);
  bird.scale=0.5;
  // Creating invisible ground
  invisibleGround = createSprite(225,550,800,10);
  invisibleGround.visible=false;
  // Creating story
  story= createSprite(225,240,50,50);
  story.addImage("st",storyIMG);
  story.scale=0.8;
  story.visible=false;
  // Creating space
  space= createSprite(200,400,50,50);
  space.addImage("sp",spaceIMG);
  space.visible=false;
  // Creating Pause
  pause= createSprite(400,40,50,50);
  pause.addImage("pause",pauseIMG);
  pause.scale=0.3;
  pause.visible=false;
  // creating restart Icon
  restart= createSprite(225,300,50,50);
  restart.addImage("restart",pauseIMG);
  restart.scale=0.3;
  restart.visible=false;
  // line for logic
  invisibleGround1 = createSprite(225,0,800,10);
  invisibleGround1.visible=false;
  // Debuging Bugs
  bird.debug=false;
  bird.setCollider("circle",0,0,55);
  pause.debug=false;
  pause.setCollider("circle",0,0,95);
}
function draw()
{
  // Giving Background
  background(220);
  // drawSprites fdunction to draw sprites
  drawSprites();
  // Checking if gamestate is start 
  if(gamestate === "start")
  {
    // logic for embeed restart menu in start menu  
    pause.visible=false;
    bg.x=0
    bg.velocityX=0;
    bird.x=50;
    bird.y=300;
    bird.rotation=0;
    bird.velocityY=0;
    bird.velocityX=2;
    title.visible=true;
    start.visible=true;
    // To giving animation feel
    if(b==0)
    {
      title.velocityY=5;
      start.velocityY=-5;
    }

    if(title.y >= 220){
      title.velocityY =0;
    }
    if(start.y <= 320){
      start.velocityY = 0;
    }
    if(bird.x >= 50){
      bird.velocityX = 0;
    }
    // To move to story gamestate if start menu is there else it will go to play gamestate
    if(mousePressedOver(start) && b ==0 )
    {
      gamestate = "story";
    }
    if(mousePressedOver(start) && b ==2 )
    {
      gamestate = "play";
    }
  }
  // Checking if gamestate is story 
  if(gamestate === "story")
  {
    title.visible=false;
    start.visible=false;
    bird.visible=false;
    story.visible=true;
    space.visible=true;
    // To narrate story
    if(a==1)
    {
      storym.play();
      a = 2;
    }
    // To Move to play gamestate
    if(keyWentDown("space") && gamestate==="story"){
      gamestate="play";
    }
  }
  // checking if gamestate is play
  if(gamestate === "play")
  {
    // Giving color to text
    fill("black");
    // Giving font to text
    textFont(font);
    // Giving size to text
    textSize(30);
    //// Giving stroke weight to text
    strokeWeight(3);
    // Displaying coins
    text("Coins : "+coins,190,50);
    // Logic to display sprites
    start.visible=false;
    title.visible=false;
    pause.visible=true;
    // Checking if pause button is pressed
    if (mousePressedOver(pause)){
      start.y=320;
      title.y=220;
      score=0;
      pipesGroup.destroyEach();
      coinGroup.destroyEach();
      b = 2; 
      gamestate = "start";
      coins = 0;
    }
    // Giving falling effect to bird
    bird.rotation=45;
    if(keyDown("space"))
    {
      bird.rotation=300;
      bird.y = bird.y-7;
    }
    storym.stop();
    //scoring
    score = score + Math.round(frameCount/3000);
    // Spawning Birds
    spawnbirds();
    // Spawnning coins
    spawncoins();
    space.visible=false;
    story.visible=false;
    bird.visible=true;
    // Giving infinite game effect
    if (bg.x < 0)
    {
      if(bgselect == 1){
        bg.addImage(bg1)
        bg.x = bg.width/2;
        bgselect = 2;
      }
      if(bgselect == 2){
        bg.addImage(bgImg)
        bg.x = bg.width/2;
        bgselect = 1;
      }
    }
    // Checking if birdd is touching coins
    if (bird.isTouching(coinGroup))
    {
      coinGroup.destroyEach();
      coins = coins+1;
      coc.play();
    }
    // Checking whether game is over or not
     if (bird.isTouching(pipesGroup)||bird.collide(invisibleGround)||bird.collide(invisibleGround1))
    {
      dead.play();
      pipesGroup.destroyEach();
      coinGroup.destroyEach();
      gamestate="over";   
    }
    // Gravity effect
    bird.velocityY = 2.8;
    // Giving Background Velocity Acc. to score
    bg.velocityX = -(3 + 3 * score/100);
  }
  if(gamestate==="over"){
    fill("black");
    textFont(font);
    textSize(50);
    strokeWeight(3);
    text("Coins : "+coins,150,200);
    pause.visible=false;
    bg.x=0;
    bg.velocityX=0;
    bird.x=50;
    bird.y=300;
    bird.rotation=0;
    bird.velocityY=0;
    bird.velocityX=0;
    restart.visible=true;
    pause.visible=false;
    if (mousePressedOver(restart)){
      
      restart.visible=false;
      start.y=320;
      title.y=220;
      score=0;
      coins=0;
      pipesGroup.destroyEach();
      coinGroup.destroyEach();
      b = 2; 
      gamestate = "play";
      coins = 0;
    }
  }
  bird.collide(invisibleGround);
}
function spawnbirds() {
  //write code here to spawn the birds
  if (frameCount % 150 === 0) {
    bird1 = createSprite(450,50,40,10);
    bird1.y = Math.round(random(0,500));
    bird1.addImage(birdIMG);
    bird1.scale = 0.4;
    bird1.velocityX = -(5+5*score/2500);
    //assign lifetime to the variable
    bird1.lifetime = 150;
    
    //adjust the depth
    bird1.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //adding bird to the group
    pipesGroup.add(bird1);
    }
}
function spawncoins() {
  //write code here to spawn the coins
  if (frameCount % 125 === 0) {
    coin = createSprite(480,50,40,10);
    coin.y = Math.round(random(0,500));
    coin.addAnimation("g",coinIMG);
    coin.scale = 0.4;
    coin.velocityX = -(5+5*score/2500);
     //assign lifetime to the variable
    coin.lifetime = 150;
    
    //adjust the depth
    coin.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //adding coin to the group
    coinGroup.add(coin);
    }
}

