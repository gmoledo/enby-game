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

		this.staticText = this.scene.add.bitmapText(this.scene.cameras.main.width / 2 - this.dialogueBox.width / 2 + 180, 
													22, "font", "", 32);
		this.staticText.setMaxWidth(this.dialogueBox.width - 210, 32);

		this.dialogueText = this.staticText;


		this.playerPortrait = this.scene.add.sprite(this.dialogueBox.x - this.dialogueBox.width / 2 + 95, this.dialogueBox.y, "playerPortrait");
		this.playerPortrait.setVisible(false);
		this.playerPortrait.setPipeline("BlackAndWhite");

		this.momPortrait = this.scene.add.sprite(this.dialogueBox.x - this.dialogueBox.width / 2 + 95, this.dialogueBox.y, "momPortrait");
		this.momPortrait.setVisible(false);
		this.momPortrait.setPipeline("BlackAndWhite");

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
		this.letterRevealEvent = null;

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
			if (character == "Mom") {
				this.momPortrait.setVisible(true);
				this.activePortrait = this.momPortrait;
			}
		}

		if (this.scene.TestScene.mapManager.currentLayer.y + this.scene.cameras.main.height - 200 < this.scene.TestScene.player.go.y ||
			this.scene.TestScene.mapManager.currentLayer.y + this.scene.cameras.main.height - 200 < this.scene.TestScene.mom.go.y) {
			this.dialogueBox.y = 80;
			this.staticText.y = 22;
			this.dynamicText.y = 22;
			if (this.activePortrait) this.activePortrait.y = this.dialogueBox.y;
		}
		else {
			this.dialogueBox.y = this.scene.cameras.main.height - this.dialogueBox.height + 40;
			this.staticText.y = this.dialogueBox.y - 58;
			this.dynamicText.y = this.dialogueBox.y - 58;
			if (this.activePortrait) this.activePortrait.y = this.dialogueBox.y;
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
				this.scene.time.addEvent({
					delay: 300,
					callback: () => {
						this.messageCompleted = true;
						this.letterRevealEvent = null;
					}
				});
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
			delay: this.scene.TestScene.state == "pause" ? 300 : 0,
			callback: () => {
				if (this.activePortrait == this.playerPortrait) {
					this.scene.TestScene.player.onDialogueClose();
				}
				if (this.activePortrait != this.playerPortrait) {
					this.scene.TestScene.mom.onDialogueClose();
				}
			}
		});
	}

	update(dt) {
		// If a control key is down while displaying message, skip to the end
		if (this.letterRevealEvent && (this.letterRevealEvent.repeat - this.letterRevealEvent.repeatCount) > 5) {
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

		this.rhymeWave = (this.rhymeWave + Math.PI * 2.5 * dt) % (Math.PI * 2);
	}
}