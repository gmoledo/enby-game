class Player {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.add.sprite(this.scene.grid.data[24][12].x * this.scene.grid.map.tileWidth,
										this.scene.grid.data[24][12].y * this.scene.grid.map.tileHeight,
										"player");
		this.go.setOrigin(0, 0);

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.body.width, this.go.body.height / 2, false);
		this.go.body.setOffset(0, this.go.height / 2);
	}

	update(dt) {
		let moveX = 0;
		let moveY = 0;

		if (this.scene.inputManager.goLeft) {
			moveX = -1;
//			this.go.body.setVelocity(-100, this.go.body.velocity.y);
		}
		if (this.scene.inputManager.goRight) {
			moveX = 1;
		}

		if (this.scene.inputManager.goUp) {
			moveY = -1;
		}
		if (this.scene.inputManager.goDown) {
			moveY = 1;
		}

		if (!this.moving) {
			this.move(moveX, moveY);
		}
	}

	move(dx, dy) {
		if (dx == 0 && dy == 0) {
			return;
		}

		this.moving = true;

		this.scene.tweens.add({
			targets: this.go,
			x: this.go.x + dx * this.scene.grid.map.tileWidth,
			y: this.go.y + dy * this.scene.grid.map.tileHeight,
			duration: 100,
			ease: "Linear",
			onComplete: this.onComplete,
			onCompleteScope: this
		});
	}

	onComplete() {
		this.moving = false;
	}
}