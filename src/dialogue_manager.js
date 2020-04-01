class DialogueManager {
	constructor(scene) {
		this.scene = scene;

		this.dialogueBox = this.scene.add.sprite(	this.scene.cameras.main.width / 2, 
													60,
													"dialogue_box");
		this.dialogueBox.setVisible(false);

		let dialogueTextConfig = {
			color: "#ffffff",
			wordWrap: {
				width: this.dialogueBox.width - 40
			},
			fixedHeight: this.dialogueBox.height - 30
		};
		this.dialogueText = this.scene.add.text(this.scene.cameras.main.width / 2 - this.dialogueBox.width / 2 + 30, 
												22,
												"",
												dialogueTextConfig);
		this.dialogueText.setLineSpacing(4);
		this.messageQueue = [];

	}

	showDialogueBox() {
		this.dialogueBox.setVisible(true);
		console.log(this.messageQueue);
		if (this.messageQueue[0]) {
			this.dialogueText.setText(this.messageQueue[0]);
		}
	}

	queueMessage(message) {
		this.messageQueue.push(message);
	}
}