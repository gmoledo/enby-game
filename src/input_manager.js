class InputManager {
	constructor(scene, defaultControls) {
		this.scene = scene;
		this.controls = this.scene.input.keyboard.createCursorKeys();
		this.pointer = this.scene.input.activePointer;

		defaultControls.forEach((control) => {
			this.addInput(control);
		});

		this.controls.enter.on("up", (key) => {
			if (this.scene.scale.isFullscreen) {
				this.scene.scale.stopFullscreen();
			}
			else {
				this.scene.scale.startFullscreen();
				this.scene.game.canvas.parentElement.style.backgroundColor = "#aaaaaa";
			}
		});

		this.setupInputMap();
	}

	addInput(strInput) {
		this.controls[strInput] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[strInput.toUpperCase()]);
	}

	setupInputMap() {
		// Movement directions for player class to reference
		this.goLeft = false;
		this.goRight = false;
		this.goUp = false;
		this.goDown = false;

		// Event handlers for when movement input keys are in the down state
		// Configured for arrow and WASD keys
		this.controls.left.on("down", (key) => {
			this.setLeftRightInput("down", "left");
		});
		this.controls.right.on("down", (key) => {
			this.setLeftRightInput("down", "right");
		});
		this.controls.up.on("down", (key) => {
			this.setUpDownInput("down", "up");
		});
		this.controls.down.on("down", (key) => {
			this.setUpDownInput("down", "down");
		});
		
		this.controls.a.on("down", (key) => {
			this.setLeftRightInput("down", "left");
		});
		this.controls.d.on("down", (key) => {
			this.setLeftRightInput("down", "right");
		});
		this.controls.w.on("down", (key) => {
			this.setUpDownInput("down", "up");
		});
		this.controls.s.on("down", (key) => {
			this.setUpDownInput("down", "down");
		});
		
		// Event handlers for when movement input keys are released
		// Configured for arrow and WASD keys
		this.controls.left.on("up", (key) => {
			this.setLeftRightInput("up", "left");
		});
		this.controls.right.on("up", (key) => {
			this.setLeftRightInput("up", "right");
		});
		this.controls.up.on("up", (key) => {
			this.setUpDownInput("up", "up");
		});
		this.controls.down.on("up", (key) => {
			this.setUpDownInput("up", "down");
		});
		
		this.controls.a.on("up", (key) => {
			this.setLeftRightInput("up", "left");
		});
		this.controls.d.on("up", (key) => {
			this.setLeftRightInput("up", "right");
		});
		this.controls.w.on("up", (key) => {
			this.setUpDownInput("up", "up");
		});
		this.controls.s.on("up", (key) => {
			this.setUpDownInput("up", "down");
		});
	}

	setLeftRightInput(event, direction) {
		// If the key is being pressed, set the left or right direction
		if (event == "down") {
			if (direction == "left") {
				this.goLeft = true;
				this.goRight = false;
			}
			if (direction == "right") {
				this.goRight = true;
				this.goLeft = false;
			}
		}

		// If the key is being released, unset the direction
		// Then, if the other key is down, change to that direction
		if (event == "up") {
			if (direction == "left") {
				this.goLeft = false;

				if (this.controls.right.isDown || this.controls.d.isDown) {
					this.goRight = true;
				}
			}
			if (direction == "right") {
				this.goRight = false;

				if (this.controls.left.isDown || this.controls.a.isDown) {
					this.goLeft = true;
				}
			}
		}
	}

	setUpDownInput(event, direction) {
		// If the key is being pressed, set the up or down direction
		if (event == "down") {
			if (direction == "up") {
				this.goUp= true;
				this.goDown = false;
			}
			if (direction == "down") {
				this.goDown = true;
				this.goUp = false;
			}
		}

		// If the key is being released, unset the direction
		// Then, if the other key is down, change to that direction
		if (event == "up") {
			if (direction == "up") {
				this.goUp = false;

				if (this.controls.down.isDown || this.controls.s.isDown) {
					this.goDown = true;
				}
			}
			if (direction == "down") {
				this.goDown = false;

				if (this.controls.up.isDown || this.controls.w.isDown) {
					this.goUp = true;
				}
			}
		}
	}
}