class DialogueManager {
	constructor(scene) {
		this.scene = scene;

		this.dialogueBox = this.scene.add.sprite(	this.scene.cameras.main.width / 2, 
													60,
													"dialogue_box");
		this.dialogueBox.setVisible(false);
	}

	createDialogueBox() {
		this.dialogueBox.setVisible(true);
	}
}