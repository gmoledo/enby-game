class InputManager {
	constructor(scene, defaultControls) {
		this.scene = scene;
		this.controls = {};
		this.pointer = this.scene.input.activePointer;

		defaultControls.forEach((control) => {
			this.addInput(control);
		});

		this.controls.esc.on("down", (key) => {
			this.scene.stateIndex = (this.scene.stateIndex + 1) % this.scene.states.length;
		})
	}

	addInput(strInput) {
		this.controls[strInput] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[strInput.toUpperCase()]);
	}
}