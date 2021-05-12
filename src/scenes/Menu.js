var flip;
var dir;

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('ground', './assets/Ground.png');
        this.load.spritesheet('p1', './assets/Player01.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19 });
        this.load.audio('jump', './assets/jump.wav'); 
    }

    create() {
        
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .5}); 
        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Animation config
        // Left Idle
        this.anims.create({
            key: 'leftIdle',
            frames: this.anims.generateFrameNumbers('p1', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightIdle',
            frames: this.anims.generateFrameNumbers('p1', {
                start: 4,
                end: 7,
                first: 4
            }),
            frameRate: 10
        })
        // Left Walk
        this.anims.create({
            key: 'leftWalk',
            frames: this.anims.generateFrameNumbers('p1', {
                start: 8,
                end: 11,
                first: 8
            }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightWalk',
            frames: this.anims.generateFrameNumbers('p1', {
                start: 12,
                end: 15,
                first: 12
            }),
            frameRate: 10
        })

        // Number of consecutive jumps made
        this.playerJumps = 0;

        // Create the player in the middle of the Menu Screen.
        this.player = this.physics.add.sprite(baseUI*3, baseUI*18, 'p1', 0).setOrigin(0,0);

        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);

        //-----------------
        // Create the level
        //-----------------
        this.walls = this.add.group();

        this.level = [
            'xxxxxxxxxxxxxxxxxxxx', // 0
            'x                  x', // 1
            'x                  x', // 2
            'x                  x', // 3
            'x               xxxx', // 4
            'x           xx     x', // 5
            'x       x          x', // 6
            'xx                 x', // 7
            'x                  x', // 8
            'x   xxxx    xx     x', // 9
            'x                  x', // 10
            'x                xxx', // 11
            'x                  x', // 12
            'x   xx   xxxx      x', // 13
            'x                  x', // 14
            'xxxxxxxxxxxxx      x', // 15
            'x                  x', // 16
            'x               xxxx', // 17
            'x                  x', // 18
            'xxxxxxxxxxxxxxxxxxxx'  // 19
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