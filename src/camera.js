class Camera {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.cameras.main;
		this.go.roundPixels = true;

		this.go.startFollow(this.scene.player.go, true);

		// Clamp camera to world bounds
		this.go.setBounds(	this.scene.mapManager.currentLayer.x + 40, this.scene.mapManager.currentLayer.y,
							this.scene.mapManager.currentLayer.width - 80, this.scene.mapManager.currentLayer.height);
	}

	update(dt) {
		
	}
}