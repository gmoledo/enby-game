class Camera {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.cameras.main;
		this.go.roundPixels = true;

		this.go.startFollow(this.scene.player.go, true);

		// Clamp camera to world bounds
		this.go.setBounds(this.scene.grid.layer.x + 40, 0, this.scene.grid.layer.width - 80, this.scene.grid.layer.height);
	}

	update(dt) {
		
	}
}