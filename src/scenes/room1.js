class room1 extends Phaser.Scene {

    constructor() {
        super('room1')
    }

    preload() {
        // Loads all our Images/tiles
        this.load.spritesheet('tiles', './assets/Ground-Sheet.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6 });
        this.load.spritesheet('p1', './assets/Player01.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19 });
        this.load.audio('jump', './assets/jump.wav'); 
        this.load.audio('music1','./assets/Music3.mp3');
    }

    create() { 
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .5}); 
        this.backgroundMusic = this.sound.add("music1", {volume: .5, loop: true}); 
        this.backgroundMusic.play(); 

        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Number of consecutive jumps made
        this.playerJumps = 0;

        // Create the player in the scene
        this.player = this.physics.add.sprite(baseUI*3, baseUI*18, 'p1', 0).setOrigin(0,0);

        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);

        //-----------------
        // Create the level
        //-----------------
        this.walls = this.add.group();

        this.level = [
            'xxxxxxxxxxxxxxxxxxxx', // 0
            'a                  b', // 1
            'a                  b', // 2
            'a                  b', // 3
            'a               xxxb', // 4
            'a           xx     b', // 5
            'a       x          b', // 6
            'ax                 b', // 7
            'a                  b', // 8
            'a   xxxx    xx     b', // 9
            'a                  b', // 10
            'a                xxb', // 11
            'a                  b', // 12
            'a   xx   xxxx      b', // 13
            'a                  b', // 14
            'axxxxxxxxxxxx      b', // 15
            'a                  b', // 16
            'a               xxxb', // 17
            'a                  b', // 18
            'xxxxxxxxxxxxxxxxxxxx'  // 19
        ];

        // Create the level by going though the array
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 'x') {
                    if(this.level[i][j+1] != 'x' && this.level[i][j+1] != 'b')
                        this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 3).setOrigin(0,0);
                    else if (this.level[i][j-1] != 'x' && this.level[i][j-1] != 'a') 
                        this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 4).setOrigin(0,0);
                    else 
                        this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 2).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                if (this.level[i][j] == 'a') {
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 5).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                if (this.level[i][j] == 'b') {
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 6).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
            }
        }

        // set collision between the player and platform
        this.physics.add.collider(this.player, this.walls)

         //test
                
         this.p1Score = 0;
         let scoreConfig = {
             fontFamily: 'Courier',
             fontSize: '28px',
             backgroundColor: '#F3B141',
             color: '#843605',
             align: 'right',
             padding: {
             top: 5,
             bottom: 5,
             },
             fixedWidth: 100
         }
         this.scoreLeft = this.add.text(game.config.width-10, game.config.height -25, this.p1Score, scoreConfig).setOrigin(1,0.5);
  
 
         
         this.timer = this.time.addEvent({
             delay: 75,
             callback: this.addScore,
             callbackScope: this,
             loop: true
         })

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
        this.p1Score += 10;
        this.scoreLeft.text = this.p1Score;
    }


    
} 