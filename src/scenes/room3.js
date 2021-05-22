class room3 extends Phaser.Scene {

    constructor() {
        super('room3')
    }

    preload() {
        // Loads all our Images/tiles

        this.load.image('win', './assets/Door.png');

        this.load.image('ground', './assets/Ground.png');
        this.load.spritesheet('p1', './assets/Player01.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19 });
        this.load.audio('jump', './assets/jump.wav'); 
        this.load.audio('music123','./assets/Music4.mp3');

        
        this.load.audio('nextlvlsfx','./assets/nextlvl.wav');
    }

    create() { 
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .15}); 
        this.backgroundMusic = this.sound.add("music123", {volume: .4, loop: true}); 
        this.backgroundMusic.play(); 

        this.doorsfx = this.sound.add('nextlvlsfx', {volume : .2});
        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // Number of consecutive jumps made
        this.playerJumps = 0;

        // Create the player in the scene
        this.player = this.physics.add.sprite(baseUI*3, baseUI*18, 'p1', 0).setOrigin(0,0);

        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);

        //door
        this.door = this.physics.add.sprite(baseUI*18, baseUI*18.5, 'win');

        //-----------------
        // Create the level
        //-----------------
        this.walls = this.add.group();

        this.level = [
            'xxxxxxxxxxxxxxxxxxxx',
            'x        x        xx',
            'x  xxxx  x  xxxxx xx',
            'x     x     x  xx xx',
            'x xx  x  xxxx  xx xx',
            'x     x xx        xx',
            'xxxx  x  x  x  xx xx',
            'x     x     x  xx xx',
            'x   xxxxx  xxxxx  xx',
            'x       x   x     xx',
            'x   xxx x   x  xxxxx',
            'x  xxx  x  xx      x',
            'x  xxxxxx   xxxxx  x',
            'xx  x           x xx',
            'x   x    xxxxxxxx xx',
            'x  xx     xxx     xx',
            'x   xxx   sxx  xxxxx',
            'xx  xxx    xx  xxxxx',
            'x          xx       ',  //remove the middle x from this row to cheat
            'xxxxxxxxxxxxxxxxxxxx',


            
            
        ];

        // Create the level by going though the array
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 'x') {
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'ground').setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
            }
        }

        // set collision between the player and platform
        this.physics.add.collider(this.player, this.walls)

         //test
                
         this.p3Score = 0;
         let scoreConfig = {
             fontFamily: 'Courier',
             fontSize: '28px',
             backgroundColor: '#ed4c4c',
             color: '#660404',
             align: 'right',
             padding: {
             top: 5,
             bottom: 5,
             },
             fixedWidth: 100
         }
         this.scoreLeft = this.add.text(game.config.width-10, game.config.height -25, this.p3Score, scoreConfig).setOrigin(1,0.5);
  
 
         
         this.timer = this.time.addEvent({
             delay: 75,
             callback: this.addScore,
             callbackScope: this,
             loop: true
         })



         //win door
         this.cursors = this.input.keyboard.createCursorKeys();
         this.physics.add.collider(this.door, this.ground);
       
         this.physics.add.overlap(this.player, this.door, windoor3,null,this);
 
         function windoor3()
         {
             
            this.game.sound.stopAll(); 
            this.scene.stop();
            this.doorsfx.play();
            this.scene.start('room4'); //Change to room 4 once level is made
             
                  
         }

    }

    update() {
        // Left and Right Movement
        if (keyLEFT.isDown){
            this.player.anims.play('leftWalk', true);
            dir = 1;
            this.player.setVelocityX(-200);
        }
        else if (keyRIGHT.isDown){
            this.player.anims.play('rightWalk', true);
            dir = -1;
            this.player.setVelocityX(200);
        }
        else {
            if (dir == 1)
                this.player.anims.play('leftIdle', true);
            if (dir == -1)
                this.player.anims.play('rightIdle', true);
            this.player.body.velocity.x = 0;
        }  


        if (keySPACE.isDown) {
            if (!flip) {
                this.jump();
                flip = true;
            }
        }
        if (keySPACE.isUp)
            flip = false;
    }

    jump() {
        // Make the player jump if only they are touching the ground
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOption.jumps)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOption.jumpForce * -1);
            this.jumpsfx.play(); 
            this.playerJumps += 1;
        }
        console.log(gameOption.jumps + " : " + this.playerJumps);
    }



    addScore() {
        this.p3Score += 10;
        this.scoreLeft.text = this.p3Score;
    }


    
} 