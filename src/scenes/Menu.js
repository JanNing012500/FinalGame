var flip;
var dir;

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('ground', './assets/Ground.png');
        this.load.image('grass', './assets/GrassGround.png');
        this.load.image('sign', './assets/WoodenSign.png');
        this.load.spritesheet('p1', './assets/Player01.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19 });
        this.load.spritesheet('pressF', './assets/PressF.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1 });
        this.load.audio('jump', './assets/jump.wav'); 
        this.load.audio('music','./assets/Music3.mp3');
        this.load.image('door', './assets/Door.png');
    }

    create() {
  
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .5}); 
        this.backgroundMusic = this.sound.add("music", {volume: .5, loop: true}); 
        this.backgroundMusic.play(); 
        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //-----------------
        // Create the level
        //-----------------
        this.ground = this.add.group();

        this.level = [
            '                    ', // 0
            '                    ', // 1
            '                    ', // 2
            '                    ', // 3
            '                    ', // 4
            '                    ', // 5
            '                    ', // 6
            '                    ', // 7
            '                    ', // 8
            '                    ', // 9
            '                    ', // 10
            '                    ', // 11
            '                    ', // 12
            '                    ', // 13
            '                    ', // 14
            '                    ', // 15
            '                    ', // 16
            '                    ', // 17
            '                    ', // 18
            'gggggggggggggggggggg'  // 19
        ];

        // Create the level by going though the array
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 'g') {
                    this.floor = this.physics.add.sprite(32*j, 32*i, 'grass').setOrigin(0,0);
                    this.ground.add(this.floor);
                    this.floor.body.immovable = true;
                }
            }
        }
        this.sign = this.physics.add.sprite(baseUI*6, baseUI*18, 'sign');
        
        // //door1
        // this.door = this.physics.add.sprite(baseUI*18, baseUI*18, 'door');
        
        // //door2
        // this.door2 = this.physics.add.sprite(baseUI*14, baseUI*18, 'door');

        // //door3
        // this.door3 = this.physics.add.sprite(baseUI*10, baseUI*18, 'door');

        // Animation config
        // Left Idle
        this.anims.create({
            key: 'leftIdle',
            frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 3, first: 0 }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightIdle',
            frames: this.anims.generateFrameNumbers('p1', { start: 4, end: 7, first: 4 }),
            frameRate: 10
        })
        // Left Walk
        this.anims.create({
            key: 'leftWalk',
            frames: this.anims.generateFrameNumbers('p1', { start: 8, end: 11, first: 8 }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightWalk',
            frames: this.anims.generateFrameNumbers('p1', { start: 12, end: 15, first: 12 }),
            frameRate: 10
        })

        // Number of consecutive jumps made
        this.playerJumps = 0;

        // Create the player in the middle of the Menu Screen.
        this.player = this.physics.add.sprite(baseUI*2, baseUI*18, 'p1', 0).setOrigin(0,0);

        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);

        // set collision between the player and platform
        this.physics.add.collider(this.player, this.ground)

        this.press1 = this.add.sprite(baseUI*2, baseUI)
    }
        
    update() {
        
        // Left and Right Movement
        if (keyLEFT.isDown && this.player.x > 0){
            this.player.anims.play('leftWalk', true);
            dir = 1;
            this.player.setVelocityX(-200);
        }
        else if (keyRIGHT.isDown && this.player.x < game.config.width - this.player.width){
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

        this.physics.overlap(this.player, this.sign, function() {this.trigger(this.sign)}, null, this);

    }



    trigger() {
        console.log("OverSign");
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
    }



}