/*
  initializing the player canvas 
  and 2d context of the canvas
*/
const player = document.getElementById("player");
const ctx = player.getContext('2d');
/*
  setting the width and height of the
  player on screen
*/
const CANVAS_WIDTH = player.width = 600 ;
const CANVAS_HEIGHT = player.height = 600 ;

const playerSprite = new Image();
playerSprite.src = "res/shadow_dog.png";
const spriteWidth = 575;// width/columns
const spriteHeight = 523;// height/rows
let FrameX = 0;
let Action = 0;
let gameFrame = 0;
let staggerFrame = 5;

function animate()
{
    ctx.clearRect(0 , 0 , CANVAS_WIDTH, CANVAS_HEIGHT);
    let postion = Math.floor(gameFrame/staggerFrame) % 6;
    FrameX = postion * spriteWidth
    ctx.drawImage(playerSprite, FrameX , Action * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame ++;
    requestAnimationFrame(animate);
}
animate();