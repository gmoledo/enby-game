class Player {
	constructor(scene) {
		this.scene = scene;
		this.UIScene = this.scene.scene.get("UIScene");
		// Grid position of player
		this.tilePos = new Phaser.Math.Vector2(23, 15);

		// Instantiate Phaser game object representing player
		this.go = this.scene.add.sprite(this.tilePos.x * this.scene.grid.map.tileWidth + this.scene.grid.layer.x,
										this.tilePos.y * this.scene.grid.map.tileHeight,
										"player");
		this.go.setOrigin(0, 0.5);

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.body.width, this.go.body.height / 2, false);
		this.go.body.setOffset(0, this.go.height / 2);

		// Tween for moving player
		this.moveTween = this.scene.tweens.create({targets: this.go});

		
	}

	update(dt) {
		let moveX = 0;
		let moveY = 0;

		// Move left or right depending on input
		if (this.scene.inputManager.goLeft) {
			moveX = -1;
		}
		if (this.scene.inputManager.goRight) {
			moveX = 1;
		}

		// Move up or down depending on input
		if (this.scene.inputManager.goUp) {
			moveY = -1;
		}
		if (this.scene.inputManager.goDown) {
			moveY = 1;
		}

		// If you're not in between tiles...
		if (!this.moveTween.isPlaying()) {
			// ...check the destination tile for collision. If not...
			let nextTile = this.scene.grid.map.getTileAt(this.tilePos.x + moveX, this.tilePos.y + moveY);
			if (!nextTile.properties.Collision) {
				// ...move.
				this.move(moveX, moveY);
			} 
			// If there is a collision...
			else {
				// ...check if you can move vertically or horizontally alone.
				// If you can, move.
				nextTile = this.scene.grid.map.getTileAt(this.tilePos.x, this.tilePos.y + moveY);
				if (!nextTile.properties.Collision) {
					this.move(0, moveY);
				}

				nextTile = this.scene.grid.map.getTileAt(this.tilePos.x + moveX, this.tilePos.y);
				if (!nextTile.properties.Collision) {
					this.move(moveX, 0);
				}
			}
		}
	}

	move(dx, dy) {
		// If there is no motion, just return.
		if (dx == 0 && dy == 0) {
			return;
		}

		// Update tile coordinates
		this.tilePos.x += dx;
		this.tilePos.y += dy;

		// Set tween to move between tile coordinates
		this.moveTween = this.scene.tweens.add({
			targets: this.go,
			x: this.go.x + dx * this.scene.grid.map.tileWidth,
			y: this.go.y + dy * this.scene.grid.map.tileHeight,
			duration: 100,
			ease: "Linear",
			onComplete: () => {
				let eggGOs = this.scene.eggs.map((egg) => egg.go);
				this.scene.physics.world.overlap(this.go, eggGOs, this.getEgg, () => true, this);
			}
		});
	}

	getEgg(player, egg) {
		egg.destroy();
		this.UIScene.dialogueManager.queueMessages(Egg.messages[Egg.messageIndex++]);
		this.scene.state = "pause";
	}
}