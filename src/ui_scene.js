class UIScene extends Phaser.Scene {
	constructor () {
		super({key: "UIScene", active: true});
	}

	preload() {
		this.load.image("dialogue_box", "assets/dialogue_box.png");
	}

	create() {
		// Reference to main scene
		this.TestScene = this.scene.get("TestScene");

		// Reference to input manager
		this.inputManager = this.TestScene.inputManager;

		// Dialogue Manager class
		this.dialogueManager = new DialogueManager(this);
	}

	update(time, delta) {
		let dt = delta / 1000;

		this.dialogueManager.update(dt);
	}
}