///board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;


//player
let playerWidth = 80;
let playerHeight =10;
let playerVelocity =10;
let player={
    x : boardWidth/2 -playerWidth/2,
    y : boardHeight-playerHeight-5,
    width : playerWidth ,
    height: playerHeight ,
    velocityX : playerVelocity

}

//ball
let ballWidth = 10;
let ballHeight =10;
let ballVelocityX = 3;
let ballVlocityY =2;

let ball = {
  x:ballWidth/2,
  y : ballHeight/2,
  width : ballWidth,
  height : ballHeight,
  velocityX : ballVelocityX,
  velocityY : ballVlocityY

}

window.onload=function(){
    board =document.getElementById("board");
    board.height=boardHeight;
    board.width = boardWidth;
    context =board.getContext("2d"); //used for drawing on the board

    //draw initial player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x , player.y , player.width,player.height);

    requestAnimationFrame(update); //gameloop
    document.addEventListener("keydown",movePlayer);

}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0 , 0, board.width , board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x , player.y , player.width,player.height);

    context.fillStyle = "white";
    ball.x +=ball.velocityX;
    ball.y +=ball.velocityY;
    context.fillRect(ball.x,ball.y,ball.width,ball.height);

    //bounce ball offf walls
    if(ball.y <=0){
        // if ball touches top of canvas
        ball.velocityY *= -1;
    }
    else if(ball.x <=0 || (ball.x+ball.width)>=boardWidth){
        //if ball touces left r right of canvas
        ball.velocityX *=-1;
    }
    else if(ball.y + ball.height>=boardHeight){
        //if ball touches bottom of canvas
        //game over
    }

}

function outOfBound(xPosition){
    return(xPosition < 0 || xPosition + playerWidth > boardWidth);
}
function movePlayer(e){
    if (e.code=="ArrowLeft"){
        // player.x -=player.velocityX;
        let nextPlayerX= player.x - player.velocityX;
        if (!outOfBound(nextPlayerX)){
            player.x =nextPlayerX;
        }
    }
    else if(e.code == "ArrowRight"){
        // player.x +=player.velocityX;
        let nextPlayerX = player.x + player.velocityX;
        if(!outOfBound(nextPlayerX)){
            player.x = nextPlayerX;
        }
    }

    
}         

function  detectCollision(a,b){
    return a.x < b.x +b.width && //a's top left corner doesnt reach b's top right corner
    a.x + a.width >b.x && //a's top rigth corner passes b's top left corner
    a.y < b.y +b.height && //a's top left corner doesn't reach b's bottom left corner
    a.y +a.height >b.y ; //a's bottom left corner passes b's top left corner
}

function topCollision(ball,block){
    return detectCollision(ball,block)&&(ball.y + ball.height) >= block.y;
}