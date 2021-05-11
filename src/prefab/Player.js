class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isJumping = false;
        this.isGrounded = true;
        this.moveSpeed = 3;
    }

    update() {
        //left/right movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } 
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        

    }

}