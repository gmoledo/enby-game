var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 360,
	scene: [TestScene, UIScene],
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		} 
	}
};

var game = new Phaser.Game(config);