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
		this.queued = false;
	}

	showDialogueBox() {
		this.dialogueBox.setVisible(true);
		if (this.messageQueue[0]) {
			this.dialogueText.setText(this.messageQueue[0]);
			this.scene.time.addEvent({delay: 300, callback: () => {this.queued = true;}});
		}
		else {
			this.queued = false;
			this.scene.scene.resume("TestScene");
		}
	}

	queueMessages(messages) {
		if (typeof messages === "string") {
			messages = [messages];
		}

		messages.forEach((message) => {
			this.messageQueue.push(message);
		});
	}

	dequeueMessage() {
		this.queued = false;
		this.messageQueue.shift();
		if (this.messageQueue.length === 0) {
			this.dialogueBox.setVisible(false);
			this.dialogueText.text = "";
			this.scene.TestScene.state = "play";
		}
		else {
			this.showDialogueBox();
		}
	}

	update(dt) {
		if (this.queued) {
			for (let control in this.scene.inputManager.controls) {
				if (this.scene.inputManager.controls[control].isDown) {
					this.dequeueMessage();
					break;
				}
			}
		}
	}
}