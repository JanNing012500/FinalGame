class room6 extends Phaser.Scene {
 
    constructor() {
        super('room6') 
    }
 
    preload() {
        // Loads all our Images/tiles6
        this.load.spritesheet('tiles6', './assets/GrassGround-Sheet.png',      //change to tiles[level] for each lvl
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 11});
        this.load.spritesheet('towerwall6', './assets/InsideWall.png',         //change to towerwall[level] for each lvl
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 17});
        this.load.spritesheet('p1', './assets/Player01.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19 });
        this.load.audio('jump', './assets/jump.wav'); 
        this.load.audio('music5','./assets/Music3.mp3');                       //change to  music[level] for each lvl
        this.load.audio('nextlvlsfx','./assets/nextlvl.wav');
        this.load.audio('Lose','./assets/LoseSfx1.wav');
    }
 
    create() { 
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                this.add.sprite(baseUI*j, baseUI*i, 'towerwall6', 0)
            }
        }
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .15}); 
        this.doorsfx = this.sound.add('nextlvlsfx', {volume : .2});
        this.LoseFx = this.sound.add('Lose', {volume : .3});
        this.backgroundMusic = this.sound.add("music5", {volume: .4, loop: true}); 
        this.backgroundMusic.play(); 
 
        // Variable to store the arrow key pressed
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
 
        // Number of consecutive jumps made
        this.playerJumps = 0;
 
        // Create the player in the scene
        this.player = this.physics.add.sprite(baseUI*2, baseUI*18, 'p1', 0).setOrigin(0,0);
 
        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);
 
        //-----------------
        // Create the level
        //-----------------
        this.walls = this.add.group();  //x for walls
        this.spikes = this.add.group();  // s for spikes
        
        this.doors = this.add.group();  // d for doors
 
        this.level = [
            'axxxxxxxxxxxxxxxxxxb', // 0
            'a                  b', // 1
            'a                  b', // 2
            'a                  b', // 3
            'a                  b', // 4
            'a                  b', // 5
            'a                  b', // 6
            'a                  b', // 7
            'a                  b', // 8
            'a                  b', // 9
            'a                  b', // 10
            'a                  b', // 11
            'a                  b', // 12
            'a                  b', // 13
            'a                  b', // 14
            'a                  b', // 15
            'a                  b', // 16
            'a                  b', // 17
            'a       !!d        b', // 18
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
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 8).setOrigin(0,0);
                        else if (this.level[i][j-1] == ' ' && this.level[i][j+1] != ' ')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 7).setOrigin(0,0);
                        else if (this.level[i][j+1] == ' ' && this.level[i][j-1] != ' ')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 6).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 2).setOrigin(0,0);
                    // If there is no platform on the right
                    else if (this.level[i][j+1] != 'x' && this.level[i][j+1] != 'b')
                        if (this.level[i-1][j] == 'x')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 5).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 6).setOrigin(0,0);
                    else if (this.level[i][j-1] != 'x' && this.level[i][j-1] != 'a')
                        if (this.level[i-1][j] == 'x')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 4).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 7).setOrigin(0,0);
                    else if (i < 19 && i > 1 && this.level[i-1][j] != ' ' && (this.level[i][j+1] == 'x' || this.level[i][j-1] == 'x' || this.level[i+1][j] == 'x'))
                        this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 3).setOrigin(0,0);
                    // Regular floor tile
                    else
                        if (i > 1 && this.level[i-1][j] != ' ')
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 3).setOrigin(0,0);
                        else
                            this.wall = this.physics.add.sprite(baseUI*j, baseUI*i, 'tiles6', 2).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                // Left Wall
                else if (this.level[i][j] == 'a') { 
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles6', 9).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                // Right Wall
                else if (this.level[i][j] == 'b') {
                    this.wall = this.physics.add.sprite(32*j, 32*i, 'tiles6', 10).setOrigin(0,0);
                    this.walls.add(this.wall);
                    this.wall.body.immovable = true;
                }
                // Spikes
                else if (this.level[i][j] == '!') {
                    this.spike = this.physics.add.sprite(32*j, 32*i, 'tiles6', 1).setOrigin(0,0);
                    this.spikes.add(this.spike);
                    this.spike.body.immovable = true;
                }
                 // door
                 else if (this.level[i][j] == 'd') {
                    this.door = this.physics.add.sprite(32*j, 32*i, 'tiles6', 11).setOrigin(0,0);
                    this.doors.add(this.door); //change to door
                    this.door.body.immovable = true;
                }
            }
        }
        
        // set collision between the player and platform
        this.physics.add.collider(this.player, this.walls)
 
        //win door
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.door, this.ground);
    
        this.physics.add.overlap(this.player, this.door, function(){this.windoor5()},null,this);
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
        this.LoseFx.play(); 
        this.player.x = baseUI*2;
        this.player.y = baseUI*17;
        this.player.body.velocity.y = 0;
    }
 
    windoor5()
    {      
        this.game.sound.stopAll(); 
        this.doorsfx.play();
        this.scene.stop();
        this.scene.start('Menu');
    }   
} 
 
 
 
 
 
 
