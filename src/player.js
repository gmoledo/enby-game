class Player {
	constructor(scene) {
		this.scene = scene;

		this.go = this.scene.add.sprite(this.scene.cameras.main.width / 2, this.scene.cameras.main.height / 2, "player");

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.body.width, this.go.body.height / 2, false);
		this.go.body.setOffset(0, this.go.height / 2);

		this.tilePosition = new Phaser.Math.Vector2(this.scene.grid.grid[24][12].x, this.scene.grid.grid[24][12].y);
	}

	update(dt) {
		this.go.body.position = new Phaser.Math.Vector2(this.tilePosition.x * this.scene.grid.map.tileWidth + this.scene.grid.layer.x,
														this.tilePosition.y * this.scene.grid.map.tileHeight + this.scene.grid.layer.y);
		

		if (this.scene.inputManager.goLeft) {
			this.move(-1, 0);
//			this.go.body.setVelocity(-100, this.go.body.velocity.y);
		}
		if (this.scene.inputManager.goRight) {
			this.move(1, 0);
		}

		if (this.scene.inputManager.goUp) {
			this.move(0, -1);
		}
		if (this.scene.inputManager.goDown) {
			this.move(0, 1);
		}
	}

	move(dx, dy) {
		this.tilePosition.x += dx;
		this.tilePosition.y += dy;
	}
}