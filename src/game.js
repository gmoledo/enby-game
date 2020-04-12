// Makes rendering crisp and removes subpixel rendering
var renderConfig = {
	antialias: false,
	roundPixels: true
}

var config = {
	type: Phaser.AUTO,
	scale: {
		width: 960,
		height: 720,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH
	},
	scene: [TestScene, UIScene, StoreScene],
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		} 
	},
	render: renderConfig
};

window.onload = () => {
	var game = new Phaser.Game(config);
}