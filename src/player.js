class Player {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.add.sprite(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, "player");

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.body.width, this.go.body.height / 2, false);
		this.go.body.setOffset(0, this.go.height / 2);
	}

	update(dt) {
		this.go.body.setVelocity(0, 0);

		if (this.scene.inputManager.goLeft) {
			this.go.body.setVelocity(-100, this.go.body.velocity.y);
		}
		if (this.scene.inputManager.goRight) {
			this.go.body.setVelocity(100, this.go.body.velocity.y);
		}

		if (this.scene.inputManager.goUp) {
			this.go.body.setVelocity(this.go.body.velocity.x, -100);
		}
		if (this.scene.inputManager.goDown) {
			this.go.body.setVelocity(this.go.body.velocity.x, 100);
		}
	}
}