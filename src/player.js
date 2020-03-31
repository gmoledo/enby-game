class Player {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.add.sprite(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, "player");

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.body.width, this.go.body.height / 2, false);
		this.go.body.setOffset(0, this.go.height / 2);
	}

	update(dt) {
		
	}
}