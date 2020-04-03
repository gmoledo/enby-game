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
		this.letterRevealEvent = null;
	}

	showMessage() {
		if (!this.dialogueBox.visible) {
			this.dialogueBox.setVisible(true);
		}
		this.revealingLetters = true;

		this.letterRevealEvent = this.scene.time.addEvent({
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

	skipMessage() {
		this.letterRevealEvent.remove();
		this.dialogueText.setText(this.messageQueue[0]);
		this.scene.time.addEvent({
			delay: 500,
			callback: () => {
				this.queued = true;
			}
		})
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
		if (this.letterRevealEvent && this.letterRevealEvent.getOverallProgress() < 1 && this.letterRevealEvent.getOverallProgress() > 0.2) {
			if (this.scene.inputManager.anyKeyDown()) {
				this.skipMessage();
			}
		}
		if (this.queued) {
			if (this.scene.inputManager.anyKeyDown()) {
				this.dequeueMessage();
			}
		}
	}
}