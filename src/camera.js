class Camera {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.cameras.main;
		this.go.roundPixels = true;

		this.go.startFollow(this.scene.player.go, true);

		// Clamp camera to world bounds
		this.go.setBounds(this.scene.grid.currentLayer.x + 40, this.scene.grid.currentLayer.y, this.scene.grid.currentLayer.width - 80, this.scene.grid.currentLayer.height);
	}

	update(dt) {
		
	}
}