var balloon;
var db, height;
function preload(){
    bg =loadImage("Images/01.png"); 
    balloonImage1=loadAnimation("Images/02.png"); 
    balloonImage2=loadAnimation("Images/03.png","Images/03.png","Images/03.png","Images/04.png","Images/04.png","Images/03.png");
    
    
}

function setup(){
    db=firebase.database();
    createCanvas(500,500);
    
    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("Hab",balloonImage1);
    balloon.scale=0.5;
    //balloon.shapeColor = "red";
    var balloonpos=db.ref("balloon/height");
    balloonpos.on("value",Readfun,showError);

    //balloon.addImage=(balloonImage1);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
        balloon.addAnimation("Hab1",balloonImage2);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
        balloon.addAnimation("Hab1",balloonImage2);
        

    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
        
        balloon.addAnimation("Hab1",balloonImage2);
        balloon.scale=balloon.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
        balloon.addAnimation("Hab1",balloonImage2);
        balloon.scale=balloon.scale+0.01;
    }
    drawSprites();
    stroke("White");
    textSize(25);
    text("USE ARROW KEYS TO MOVE HOT AIR BALOON",40,40);
}

function changePosition(x,y){
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    db.ref("balloon/height").set({
        'x': height.x + x ,
        'y': height.y + y
        
    })

}

function Readfun(data){
    height = data.val();
    console.log("hi");
  //console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
    console.log("Error in writing to the database");
  }

