var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 360,
	scene: TestScene,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		} 
	}
};

var game = new Phaser.Game(config);