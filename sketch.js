const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var stones = [];
var base1;
var jointPoint;
var bridge;
var stone;
var zombie, zombie1, zombie2, zombie3, zombie4;
var ground;
var backgroundImg;
var breakButton;

var jointLink, jointPoint;


function preload()
{
  zombie1 = loadImage("assets/zombie1.png");
  zombie2 = loadImage("assets/zombie2.png");
  zombie3 = loadImage("assets/zombie3.png");
  zombie4 = loadImage("assets/zombie4.png");

  backgroundImg = loadImage("assets/background.png");
}

function setup() 
{
  createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  createEdgeSprites();

  base1 = new Base(100, 250, 200, 100);
  bridge = new Bridge(18,{x: 0, y:215});

  ground = new Base(600,590, 1200,20);

  jointPoint = new Base(960,220,200,100)
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  zombie = createSprite(width/2, 480);
  zombie.addAnimation("lettoright", zombie1, zombie2);
  zombie.addAnimation("righttoleft", zombie3, zombie4);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createImg("assets/axe.png");
  breakButton.position(width - 200+50, 200);
  //breakButton.class("breakbutton");
  breakButton.size(60,60);
  breakButton.mouseClicked(handleButtonPress);

  for(var i=0; i<9; i++)
  {
    var x = random(width/2 - 200, width/2 + 300);
    var y = random(-10, 100);
    stone = new Stone(x,y,60,60);
    stones.push(stone);
  }
}

function draw() 
{
  background(51);
  Engine.update(engine);

  base1.show();
  jointPoint.show();

  image(backgroundImg,0,0,1200,600);

  bridge.show();
  ground.show();

  for(var i=0; i<9; i++)
  {
    stones[i].show();
  }

  drawSprites();

}

function handleButtonPress()
{
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  },3000);
}
