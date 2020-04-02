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

	showMessage() {
		if (!this.dialogueBox.visible) {
			this.dialogueBox.setVisible(true);
		}


		this.scene.time.addEvent({
			repeat: this.messageQueue[0].length - 1,
			callback: this.addLetter,
			callbackScope: this,
			delay: 50
		});
	}

	addLetter() {
		let displayText = this.messageQueue[0].substring(0, this.dialogueText.text.length+1);
		if (displayText == this.messageQueue[0]) {
			this.queued = true;
		}
		this.dialogueText.setText(displayText);
	}

	queueMessages(messages) {
		if (typeof messages === "string") {
			messages = [messages];
		}

		messages.forEach((message) => {
			this.messageQueue.push(message);
		});

		if (this.messageQueue.length > 0) {
			this.showMessage();
		}
	}

	dequeueMessage() {
		this.queued = false;
		this.messageQueue.shift();
		this.dialogueText.text = "";

		if (this.messageQueue.length === 0) {
			this.closeDialogueBox();
		}
		else {
			this.showMessage();
		}
	}

	closeDialogueBox() {
		this.dialogueBox.setVisible(false);
		this.dialogueText.text = "";
		this.scene.TestScene.state = "play";
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