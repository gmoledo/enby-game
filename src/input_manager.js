class InputManager {
	constructor(scene, defaultControls) {
		this.scene = scene;
		this.controls = this.scene.input.keyboard.createCursorKeys();
		this.pointer = this.scene.input.activePointer;

		defaultControls.forEach((control) => {
			this.addInput(control);
		});

		this.controls.esc.on("down", (key) => {
			this.scene.stateIndex = (this.scene.stateIndex + 1) % this.scene.states.length;
		});

		this.setupInputMap();
	}

	addInput(strInput) {
		this.controls[strInput] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[strInput.toUpperCase()]);
	}

	setupInputMap() {
		this.goLeft = false;
		this.controls.left.on("down", (key) => {
			this.setLeftRightInput("down", "left");
		});
		this.controls.a.on("down", (key) => {
			this.setLeftRightInput("down", "left");
		});
		this.controls.left.on("up", (key) => {
			this.setLeftRightInput("up", "left");
		});
		this.controls.a.on("up", (key) => {
			this.setLeftRightInput("up", "left");
		});

		this.goRight = false;
		this.controls.right.on("down", (key) => {
			this.setLeftRightInput("down", "right");
		});
		this.controls.d.on("down", (key) => {
			this.setLeftRightInput("down", "right");
		});
		this.controls.right.on("up", (key) => {
			this.setLeftRightInput("up", "right");
		});
		this.controls.d.on("up", (key) => {
			this.setLeftRightInput("up", "right");
		});

		this.goUp = false;
		this.controls.up.on("down", (key) => {
			this.setUpDownInput("down", "up");
		});
		this.controls.w.on("down", (key) => {
			this.setUpDownInput("down", "up");
		});
		this.controls.up.on("up", (key) => {
			this.setUpDownInput("up", "up");
		});
		this.controls.w.on("up", (key) => {
			this.setUpDownInput("up", "up");
		});

		this.goDown = false;
		this.controls.down.on("down", (key) => {
			this.setUpDownInput("down", "down");
		});
		this.controls.s.on("down", (key) => {
			this.setUpDownInput("down", "down");
		});
		this.controls.down.on("up", (key) => {
			this.setUpDownInput("up", "down");
		});
		this.controls.s.on("up", (key) => {
			this.setUpDownInput("up", "down");
		});
	}

	setLeftRightInput(event, direction) {
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