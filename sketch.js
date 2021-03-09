var dog,happyDog,database,foodS,foodStock
//variable for dog and happy images
var dog_img,happyDog_img;
//variable for two buttons
var feed,addfood;
//variable to store last feeding time
var fedTime,lastFed;
//variable for food class
var foodObj;

var input,button,greeting,Name;

var nameref;

//database variable
var database;

function preload()
{
  //to load images
  dog_img=loadImage("Images/Dog.png");
  happyDog_img=loadImage("Images/happy dog.png");
}

function setup()
{
  //connecting database to firebase
  database=firebase.database();
  //fetching stock from DB
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  //console.log(foodStock)

  //reading name from database
  nameref=database.ref("name");
  nameref.on("value",function(data)
  {
    name=data.val();
  })

  //To create Canvas
  createCanvas(1000,400);

  //to create dog sprite
  dog=createSprite(800,200);
  dog.addImage(dog_img);
  //scaling dog
  dog.scale=0.2;

  //Creating foodObj using food class
  foodObj= new food(world.body);

  //feed the dog button
  feed=createButton("Feed the Dog");
  feed.position(740,67);
  feed.mousePressed(feedDog);

  //add food button
  addFood=createButton("Add Food")
  addFood.position(840,67);
  addFood.mousePressed(addFoods);


  input=createInput("Change Pet Name");
  input.position(940,67);
  
  
  button=createButton("SUBMIT");
  button.position(1038,90);
  button.mousePressed(renamingDog)
  
}
 
function draw()
{
  //assigning RGB colour to background
  background(46, 139, 87);

  //displaying foodObj of food class
  foodObj.display();  

  //fetching fedtime from database
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })
 
  

  fill("white");
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  }
  else if(lastFed===0)
  {
    text("Last Feed : 12 AM",350,30)
  }
  else
  {
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  if(Name!==undefined)
  {
  text("Your Pet Name: "+ Name,685,32);
  }

  //To draw the sprites on canvas
  drawSprites();

  push();
  stroke("black");
  strokeWeight(1.5);
  textSize(24);
  text("You love your pet "+name,660,320);
  pop();
 
  
}

//function to read value from database
function readStock(data)
{ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to feed the dog
function feedDog()
{
  dog.addImage(happyDog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
  
}

//function to add the dog
function addFoods()
{
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function renamingDog()
{
  Name=input.value();
  button.hide();
  input.hide();
  database.ref("/").update({
    name:Name
  })

}
