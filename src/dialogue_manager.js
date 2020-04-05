class DialogueManager {
	constructor(scene) {
		this.scene = scene;


		// Initialize Dialogue Box game object
		this.dialogueBox = this.scene.add.sprite(	this.scene.cameras.main.width / 2, 
													80,
													"dialogue_box");
		this.dialogueBox.setVisible(false);


		// Initialize Dialogue Box Text game object
		this.dynamicText = this.scene.add.dynamicBitmapText(this.scene.cameras.main.width / 2 - this.dialogueBox.width / 2 + 180, 
															22, "font", "", 32);
		this.dynamicText.setDisplayCallback((display) => {
			display.y += Math.sin(this.rhymeWave + display.index) * 5;
			return display;
		});

		this.staticText = this.scene.add.dynamicBitmapText(	this.scene.cameras.main.width / 2 - this.dialogueBox.width / 2 + 180, 
															22, "font", "", 32);
		this.staticText.setMaxWidth(this.dialogueBox.width - 210, 32);

		this.dialogueText = this.staticText;


		this.playerPortrait = this.scene.add.sprite(this.dialogueBox.x - this.dialogueBox.width / 2 + 95, this.dialogueBox.y, "playerPortrait");
		this.playerPortrait.setVisible(false);
		this.playerPortrait.setPipeline("BlackAndWhite");

		this.activePortrait = null;

		// Member variables
		this.messageQueue = [];
		this.messageCompleted = false;
		this.letterRevealEvent = null;

		this.rhymeWave = 0;
	}

	// Pushes the given message or messages into the message queue,
	// then shows the next message
	queueMessages(character, messages) {
		if (typeof messages === "string") {
			messages = [messages];
		}

		messages.forEach((message) => {
			this.messageQueue.push(message);
		});

		if (this.messageQueue.length > 0) {
			this.showMessage(character);
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
	showMessage(character) {
		if (!this.dialogueBox.visible) {
			this.dialogueBox.setVisible(true);
			if (character == "Player") {
				this.playerPortrait.setVisible(true);
				this.activePortrait = this.playerPortrait;
			}
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
		if (this.activePortrait) this.activePortrait.setVisible(false);

		this.scene.time.addEvent({
			delay: 100,
			callback: () => {
				if (this.scene.TestScene.state == "pause") {
					this.scene.TestScene.state = "play";
				}

				// If the dialogue box is closed as part of the script, figure out who was
				// speaking and update their script
				if (this.scene.TestScene.state == "script") {
					this.scene.TestScene.scriptManager.updateScript();
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

		this.rhymeWave = (this.rhymeWave + Math.PI / 30) % (Math.PI * 2);
	}
}