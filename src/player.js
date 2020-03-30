class Player {
	constructor(scene) {
		this.scene = scene;

		this.go;

		this.scene.physicsManager.addToGroup(this.go, "dynamic");
	}

	update(dt) {

	}
}