class InputManager {
	constructor(scene, defaultControls) {
		this.scene = scene;

		// Initializes controls with cursor keys
		this.controls = this.scene.input.keyboard.createCursorKeys();
		this.pointer = this.scene.input.activePointer;

		// Add each default control to inputManager
		// See addInput() for more details
		defaultControls.forEach((control) => {
			this.addInput(control);
		});

		// When f key is released, toggle fullscreen
		this.controls.f.on("up", (key) => {
			if (this.scene.scale.isFullscreen) {
				this.scene.scale.stopFullscreen();
			}
			else {
				this.scene.scale.startFullscreen();
				this.scene.game.canvas.parentElement.style.backgroundColor = "#aaaaaa";
			}
		});

		// When enter key is pressed, toggle player textures
		this.controls.enter.on("down", (key) => {
			if (this.scene.player.go.texture.key == "playerJacket") {
				this.scene.player.go.setTexture("playerBase", this.scene.player.go.frame.name);
			}
			else {
				this.scene.player.go.setTexture("playerJacket", this.scene.player.go.frame.name);
			}
		});

		this.controls.shift.on("down", (key) => {
			this.scene.player.walkMultiplier = this.scene.player.walkMultiplier == 1 ? 2 : 1;
		});

		// When q key is pressed, toggle shader
		this.controls.q.on("down", (key) => {
			this.scene.camera.go.renderToTexture = !this.scene.camera.go.renderToTexture;
		});

		// Member variables
		this.inputQueue = []; // Note: Not actually a queue data structure
		this.input = "none";

		this.setupInputMap();
	}

	addInput(strInput) {
		this.controls[strInput] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[strInput.toUpperCase()]);
	}

	setupInputMap() {
		// Event handlers for when movement input keys are in the down state
		// Configured for arrow and WASD keys
		this.controls.left.on("down", (key) => {
			this.setInput("down", "left");
		});
		this.controls.right.on("down", (key) => {
			this.setInput("down", "right");
		});
		this.controls.up.on("down", (key) => {
			this.setInput("down", "up");
		});
		this.controls.down.on("down", (key) => {
			this.setInput("down", "down");
		});
		
		this.controls.a.on("down", (key) => {
			this.setInput("down", "left");
		});
		this.controls.d.on("down", (key) => {
			this.setInput("down", "right");
		});
		this.controls.w.on("down", (key) => {
			this.setInput("down", "up");
		});
		this.controls.s.on("down", (key) => {
			this.setInput("down", "down");
		});
		
		// Event handlers for when movement input keys are released
		// Configured for arrow and WASD keys
		this.controls.left.on("up", (key) => {
			this.setInput("up", "left");
		});
		this.controls.right.on("up", (key) => {
			this.setInput("up", "right");
		});
		this.controls.up.on("up", (key) => {
			this.setInput("up", "up");
		});
		this.controls.down.on("up", (key) => {
			this.setInput("up", "down");
		});
		
		this.controls.a.on("up", (key) => {
			this.setInput("up", "left");
		});
		this.controls.d.on("up", (key) => {
			this.setInput("up", "right");
		});
		this.controls.w.on("up", (key) => {
			this.setInput("up", "up");
		});
		this.controls.s.on("up", (key) => {
			this.setInput("up", "down");
		});
	}

	setInput(event, direction) {
		// TODO: Fix bug when a button is held and two buttons are pressed at same time
		
		// Adds input to queue
		if (event == "down") {
			this.inputQueue.push(direction);
		}
		
		// Removes input from queue
		if (event == "up") {
			this.inputQueue.splice(this.inputQueue.indexOf(direction), 1);
		}

		// Sets input to the last input in queue
		this.input = this.inputQueue[this.inputQueue.length - 1];
	}

	// Returns true if any keys used for controls are down, false if none
	anyKeyDown() {
		for (let control in this.controls) {
			if (this.controls[control].isDown) {
				return true;
			}
		}
		return false;
	}

	update(dt) {
		// Debug feature to identify tiles 
		if (this.pointer.isDown) {
			let tileClicked = this.scene.mapManager.currentMap.getTileAtWorldXY(this.pointer.worldX, this.pointer.worldY);
			if (tileClicked) {
				console.log(tileClicked.x, tileClicked.y);
			}
		}
	}
}