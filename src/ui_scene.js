class UIScene extends Phaser.Scene {
	constructor () {
		super({key: "UIScene", active: true});

		this.sceneLoaded = false;
	}

	init() {

	}

	preload() {
		this.load.image("dialogue_box", "assets/dialogue_box.png");
		this.load.bitmapFont("font", "assets/font.png", "assets/font.fnt");
		
		this.load.image("playerPortrait", "assets/player_portrait.png");

		this.load.image("black", "assets/black.png");
	}

	create() {
		// Reference to main scene
		this.TestScene = this.scene.get("TestScene");

		// Reference to input manager
		this.inputManager = this.TestScene.inputManager;

		this.black = this.add.sprite(0, 0, "black");
		this.black.setOrigin(0, 0);
		this.black.setScale(10);

		// Dialogue Manager class
		this.dialogueManager = new DialogueManager(this);

		this.sceneLoaded = true;
	}

	update(time, delta) {
		let dt = delta / 1000;

		this.dialogueManager.update(dt);
	}

	fadeBlack() {
		return this.tweens.add({
			targets: this.black,
			alpha: 0,
			duration: 2000,
			ease: "Linear"
		});
	}
}