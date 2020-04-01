class Camera {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.cameras.main;

		this.go.startFollow(this.scene.player.go);

		this.go.setBounds(this.scene.grid.layer.x, 0, this.scene.grid.layer.width, this.scene.grid.layer.height);
	}

	update(dt) {
		
	}
}