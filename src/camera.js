class Camera {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.cameras.main;
		this.go.roundPixels = true; // Eliminate sub-pixel rendering

		// Start camera follow on player
		this.go.startFollow(this.scene.player.go, true);

		// Clamp camera to the current map's bounds
		this.resetBounds();
	}

	resetBounds() {
		this.go.setBounds(	this.scene.mapManager.currentLayer.x + 40, this.scene.mapManager.currentLayer.y,
							this.scene.mapManager.currentLayer.width - 80, 18 * 40);
	}
}