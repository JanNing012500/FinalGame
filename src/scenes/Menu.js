class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('player', './assets/Player01.png');
        this.load.image('ground', './assets/Ground.png');
    }

    create() {
        
        // Variable to store the arrow key pressed
        this.cursor = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create the player in the middle of the Menu Screen.
        this.player = this.physics.add.sprite(baseUI*3, baseUI*18, 'player').setOrigin(0,0);

        // Add gravity to make it fall
        this.player.body.gravity.y = 600;

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
            'x                  x', // 7
            'x                  x', // 8
            'x                  x', // 9
            'x                  x', // 10
            'x                  x', // 11
            'x                  x', // 12
            'x                  x', // 13
            'x                  x', // 14
            'x                  x', // 15
            'x                  x', // 16
            'x                  x', // 17
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
    }

    update() {

        if (this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
        }
        else   
            this.player.body.velocity.x = 0;

        // Make the player jump if only they are touching the ground
        if (keySPACE.isDown && this.player.body.touching.isDown){
            console.log("Jump Key detected");
            this.player.body.velocity.y = -250;
        } else {
            this.player.body.velocity.y = 0;
        }

        // Make the player and the walls collide
        this.physics.collide(this.player, this.walls);
    }
}