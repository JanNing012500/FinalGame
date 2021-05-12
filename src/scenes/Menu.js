var flip;
var dir;

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('ground', './assets/Ground.png');
        this.load.spritesheet('idle', './assets/Player_Idle.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 7 });
    }

    create() {
        
        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Animation config
        // Left Idle
        this.anims.create({
            key: 'leftIdle',
            frames: this.anims.generateFrameNumbers('idle', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightIdle',
            frames: this.anims.generateFrameNumbers('idle', {
                start: 4,
                end: 7,
                first: 4
            }),
            frameRate: 10
        })

        // Number of consecutive jumps made
        this.playerJumps = 0;

        // Create the player in the middle of the Menu Screen.
        this.player = this.physics.add.sprite(baseUI*3, baseUI*18, 'idle', 0).setOrigin(0,0);

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
            'x        xxxx      x', // 13
            'x                  x', // 14
            'xxxxx              x', // 15
            'x           x      x', // 16
            'x                  x', // 17
            'x     xx           x', // 18
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
    }

    update() {
        // Left and Right Movement
        if (keyLEFT.isDown){
            dir = 1;
            this.player.setVelocityX(-200);
        }
        else if (keyRIGHT.isDown){
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
            this.playerJumps += 1;
        }
        console.log(gameOption.jumps + " : " + this.playerJumps);
    }
}