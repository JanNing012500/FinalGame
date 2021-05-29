class room5 extends Phaser.Scene {

    constructor() {
        super('room5')
    }

    preload() {
        // Loads all our Images/tiles
        

        this.load.audio('jump', './assets/jump.wav'); 
        this.load.audio('music1','./assets/Music3.mp3');
        this.load.audio('nextlvlsfx','./assets/nextlvl.wav');
    }

    create() { 
        
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .15}); 
        this.doorsfx = this.sound.add('nextlvlsfx', {volume : .2});
        this.backgroundMusic = this.sound.add("music1", {volume: .4, loop: true}); 
        this.backgroundMusic.play(); 

        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // Create the player in the scene
        this.player = this.physics.add.sprite(baseUI*2, baseUI*15, 'p1', 0).setOrigin(0,0);

        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);

        //-----------------
        // Create the level
        //-----------------
        this.walls = this.add.group();
        this.spikes = this.add.group();
        this.jumps = this.add.group();

        this.level = [
            'axxxxxxxxxxxxxxxxxxb', // 0
            'a                  b', // 1
            'a                  b', // 2
            'a xxxx             b', // 3
            'a                x b', // 4
            'a                x b', // 5
            'a            e   xeb', // 6
            'ae               x b', // 7
            'ax   e   e!!     x b', // 8
            'a        xxx     xeb', // 9
            'a!!!!!!!!x         b', // 10
            'axxxxxxxxx         b', // 11
            'a                xeb', // 12
            'a              xxx b', // 13
            'a           e   xx b', // 14
            'a           x   xxeb', // 15
            'a        e      xx b', // 16
            'a        x         b', // 17
            'a     e  x    xxxxeb', // 18
            'axxxxxxxxxxxxxxxxxxb'  // 19
        ];

        // Create the level by going though the array
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                // Ground tile
                if (this.level[i][j] == 'x') {
                    // If there is no platform on the right or left
                    if (this.level[i][j+1] != 'x' && this.level[i][j+1] != 'b' && this.level[i][j-1] != 'x' && this.level[i][j-1] != 'a')
                        if (this.level[i+1][j] != 'x' && this.level[i-1][j] != 'x')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 8).setOrigin(0,0);
                        else if (this.level[i][j-1] == ' ' && this.level[i][j+1] != ' ')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 7).setOrigin(0,0);
                        else if (this.level[i][j+1] == ' ' && this.level[i][j-1] != ' ')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 6).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 2).setOrigin(0,0);
                    // If there is no platform on the right
                    else if (this.level[i][j+1] != 'x' && this.level[i][j+1] != 'b')
                        if (this.level[i-1][j] == 'x')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 5).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 6).setOrigin(0,0);
                    else if (this.level[i][j-1] != 'x' && this.level[i][j-1] != 'a')
                        if (this.level[i-1][j] == 'x')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 4).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 7).setOrigin(0,0);
                    else if (i < 19 && i > 1 && this.level[i-1][j] != ' ' && (this.level[i][j+1] == 'x' || this.level[i][j-1] == 'x' || this.level[i+1][j] == 'x'))
                        this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 3).setOrigin(0,0);
                    // Regular floor tile
                    else
                        if (i > 1 && this.level[i-1][j] != ' ')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 3).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles', 2).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                // Left Wall
                else if (this.level[i][j] == 'a') { 
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 9).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                // Right Wall
                else if (this.level[i][j] == 'b') {
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles', 10).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                // Spikes
                else if (this.level[i][j] == '!') {
                    this.spike = this.physics.add.sprite(32*j, 32*i, 'tiles', 1).setOrigin(0,0);
                    this.spikes.add(this.spike);
                    this.spike.body.immovable = true;
                }
                else if (this.level[i][j] == 'e') {
                    let JumpUP = this.physics.add.sprite(32*j, 32*i, 'extraJump', 0).setOrigin(0,0);
                    this.physics.add.overlap(this.player, JumpUP, function(){ 
                        JumpUP.anims.play('jumpPU', true);
                        gameOption.jumpForce = 400;
                        this.jump();
                        gameOption.jumpForce = 325;}, 
                    null, this);
                    this.jumps.add(JumpUP);
                }
            }
        }
        this.door = this.physics.add.sprite(baseUI*5, baseUI*2, 'tiles', 11).setOrigin(0,0);

        // set collision between the player and platform
        this.physics.add.collider(this.player, this.walls)

        //win door
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.door, this.ground);
    
        this.physics.add.overlap(this.player, this.door, function(){this.windoor1()},null,this);
    }

    update() {
        // Left and Right Movement
        if (keyLEFT.isDown){
            this.player.anims.play('leftWalk', true);
            dir = 1;
            this.player.setVelocityX(-140);
        }
        else if (keyRIGHT.isDown){
            this.player.anims.play('rightWalk', true);
            dir = -1;
            this.player.setVelocityX(140);
        }
        else {
            if (dir == 1)
                this.player.anims.play('leftIdle', true);
            if (dir == -1)
                this.player.anims.play('rightIdle', true);
            this.player.body.velocity.x = 0;
        }  

        this.physics.overlap(this.player, this.spikes, function(){ this.restart() }, null, this);

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
    }

    restart() {
        this.player.x = baseUI*2;
        this.player.y = baseUI*17;
        this.player.body.velocity.y = 0;
    }

    windoor1()
    {      
        this.game.sound.stopAll(); 
        this.doorsfx.play();
        this.scene.stop();
        this.scene.start('room2');
    }   
} 