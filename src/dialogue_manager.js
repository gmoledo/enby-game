class DialogueManager {
	constructor(scene) {
		this.scene = scene;


		// Initialize Dialogue Box game object
		this.dialogueBox = this.scene.add.sprite(	this.scene.cameras.main.width / 2, 
													80,
													"dialogue_box");
		this.dialogueBox.setVisible(false);


		// Initialize Dialogue Box Text game object
		let dialogueTextConfig = {
			color: "#ffffff",
			wordWrap: {
				width: this.dialogueBox.width - 40
			},
			fixedHeight: this.dialogueBox.height - 30,
			fontSize: "20px"
		};
		this.dialogueText = this.scene.add.text(this.scene.cameras.main.width / 2 - this.dialogueBox.width / 2 + 30, 
												22,
												"",
												dialogueTextConfig);
		this.dialogueText.setLineSpacing(4);


		// Member variables
		this.messageQueue = [];
		this.messageCompleted = false;
		this.letterRevealEvent = null;
	}

	// Pushes the given message or messages into the message queue,
	// then shows the next message
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

	// Completes the message immediately.
	// Waits 0.3 seconds to broadcast that message is completed
	skipMessage() {
		this.letterRevealEvent.remove();
		this.dialogueText.setText(this.messageQueue[0]);
		this.scene.time.addEvent({
			delay: 300,
			callback: () => {
				this.messageCompleted = true;
			}
		})
	}

	// Removes message from queue, and if queue is empty, closes dialogue box.
	// Otherwise, it shows the next message
	dequeueMessage() {
		this.messageCompleted = false;
		this.messageQueue.shift();
		this.dialogueText.text = "";

		if (this.messageQueue.length === 0) {
			this.closeDialogueBox();
		}
		else {
			this.showMessage();
		}
	}

	// Makes dialogue box visible and starts letter reveal event
	showMessage() {
		if (!this.dialogueBox.visible) {
			this.dialogueBox.setVisible(true);
		}

		this.letterRevealEvent = this.scene.time.addEvent({
			repeat: this.messageQueue[0].length - 1,
			callback: this.addLetter,
			callbackScope: this,
			delay: 40
		});
	}

	// Displays message leter by letter
	addLetter() {
		if (this.messageQueue[0]) {
			let displayText = this.messageQueue[0].substring(0, this.dialogueText.text.length+1);

			if (displayText == this.messageQueue[0]) {
				this.messageCompleted = true;
			}

			this.dialogueText.setText(displayText);
		}
	}

	// Closes dialogue box and if the state of the scene was in play, resume playing
	closeDialogueBox() {
		this.dialogueBox.setVisible(false);
		this.dialogueText.text = "";

		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				if (this.scene.TestScene.state == "pause") {
					this.scene.TestScene.state = "play";
				}
			}
		});
	}

	update(dt) {
		// If a control key is down while displaying message, skip to the end
		if (this.letterRevealEvent && this.letterRevealEvent.getOverallProgress() < 1 && this.letterRevealEvent.getOverallProgress() > 0.2) {
			if (this.scene.inputManager.anyKeyDown()) {
				this.skipMessage();
			}
		}

		// If a control key is down after message is completed, dequeue the message
		if (this.messageCompleted) {
			if (this.scene.inputManager.anyKeyDown()) {
				this.dequeueMessage();
			}
		}
	}
}