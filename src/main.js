/*
Team Member: Neo Zhang, Sam Luyen, Jan Ning
Title: 
Completion Data: 
Creative Tilt:

*/
let gameOption = {
    playerGravity: 900,
    jumpForce: 325,
    jumps: 2,
    speed: 140

}

var config = {
    type: Phaser.AUTO, 
    width: 640,
    height: 640,
    parent: 'phaser-game',
    scene: [ Menu, room5, room1, room2, room3, room4],
    physics: {
        default: 'arcade',
        arcade: {debug:1} // change false to make the pink lines go away
    }
};
let game = new Phaser.Game(config);

// set UI size
let baseUI = 32;


// Keybindings
let keySPACE, keyLEFT, keyRIGHT, keyF, keyUP; 
