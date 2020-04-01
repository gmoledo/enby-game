class UIScene extends Phaser.Scene {
	constructor () {
		super({key: "UIScene", active: true});
	}

	preload() {
		this.load.image("dialogue_box", "assets/dialogue_box.png");
	}

	create() {
		this.dialogueManager = new DialogueManager(this);
	}
}