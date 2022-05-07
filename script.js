window.addEventListener('load', function() 
{
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    perfectFrameTime = 1000/60 ;
    //handle key events
    class InputHandler
    {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e => 
            {
                console.log(e.key);
                if((e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === " ") 
                    && this.keys.indexOf(e.key) === -1)
                {
                    this.keys.push(e.key);
                }
            });
            window.addEventListener('keyup', e =>
            {
                if( e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === " ") 
                {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    //handle Player
    class Player
    {
        constructor(gameWidth, gameHeight)
        {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 75 ;
            this.height = 75;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById("playerImage1");
            this.FrameX = 8 ;
            this.FrameY = 0 ;
            this.maxFrame = 0;
            this.minFrame = 0;
            this.startFrame = 0;
            this.fps = 5;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 0;
            this.vy = 0;
            this.gravity = 1;
            this.direction = 1;
        }
        draw(context)
        {
            context.drawImage(this.image,this.FrameX * this.width, this.FrameY * this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        }
        //Player Movement
        update(input, deltaTime)
        {
            //handle input
            if(input.keys.indexOf("ArrowRight") > -1)
            {
                this.speed = 5;
                this.direction = 1;

            }             
            else if(input.keys.indexOf("ArrowLeft") > -1)
            {
                this.speed = -5;
                this.direction = -1;


            }
            else if(( input.keys.indexOf(' ') > -1 || 
                      input.keys.indexOf("ArrowUp") > -1)  
                      && this.isGrounded())
            {
                this.vy -= 30;
                this.gameFrame = 6;

            }
            else {
                this.speed = 0;

            }
            //handle animation
            if (this.frameTimer > this.frameInterval )
            {
                if(this.direction == 1){
                    this.startFrame = 8;
                    if(this.FrameX >= this.maxFrame) this.FrameX = 8;    
                    else
                    {
                        if(this.FrameX < this.startFrame) this.FrameX = 8;
                        this.FrameX  += this.direction 
                    }
                } else {
                    this.startFrame = 7;
                    if(this.FrameX <= this.minFrame) this.FrameX = 7;
                    else
                    {
                        if(this.FrameX > this.startFrame) this.FrameX = 7
                        this.FrameX  += this.direction 
                    }
                }


                this.frameTimer = 0;
            } else this.frameTimer += deltaTime;
            
            //Horizontal Movement
            this.x += this.speed;
            if(this.x < 0) this.x = 0;
            else if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            //Vertical Movement
            this.y += this.vy;
            if(!this.isGrounded())
            {
                this.vy += this.gravity;
                this.FrameY = 0;
                this.maxFrame = 13;
                this.minFrame = 2;
            } 
            else
            {
                this.vy = 0;
                this.FrameY = 1;
                this.maxFrame = 15;
                this.minFrame = 0;
            }
            if(this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        isGrounded()
        {
            return this.y >= this.gameHeight - this.height;
        }
    }
    //Handles Background
    class Background
    {}
    class Enemy
    {}
    function handleEnemies()
    {}
    function displayStatusText()
    {}

    const input = new InputHandler();
    const player = new Player(canvas.width,canvas.height);

    let lastTime = 0

    function animate(timeStamp)
    {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        player.draw(ctx);
        player.update(input, deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);

}); 




