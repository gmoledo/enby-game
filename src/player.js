class Player {
	constructor(scene) {
		this.scene = scene;
		this.UIScene = this.scene.scene.get("UIScene");
		// Grid position of player
		this.tilePos = new Phaser.Math.Vector2(15, 5);

		// Instantiate Phaser game object representing player
		this.go = this.scene.add.sprite(this.tilePos.x * this.scene.grid.currentMap.tileWidth + this.scene.grid.layer.x,
										this.tilePos.y * this.scene.grid.currentMap.tileHeight,
										"player");
		this.go.setOrigin(0, 0.5);

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.width * 2/3, this.go.height / 2 * 2/3, false);
		this.go.body.setOffset(this.go.width * 1/6, this.go.height / 2 + this.go.height / 2 * 1/6);

		// Tween for moving player
		this.moveTween = this.scene.tweens.create({targets: this.go});
		this.startPos = new Phaser.Math.Vector2(0, 0);
		this.targetPos = new Phaser.Math.Vector2(0, 0);
		
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


		if (this.tweening) {
			if (this.go.x == this.targetPos.x && this.go.y == this.targetPos.y) {
				this.tweening = false;

		 		let eggGOs = this.scene.eggs.map((egg) => egg.go);
		 		if (this.scene.physics.world.overlap(this.go, eggGOs, this.getEgg, () => true, this)) {
		 			return;
		 		}

		 		let tile = this.scene.grid.currentMap.getTileAt(this.tilePos.x, this.tilePos.y);
				if (tile.properties.Map) {
					this.scene.grid.changeMap(tile.properties);
					if (tile.properties.Direction == "Left") {
						moveX = -1;
						moveY = 0;
					}
					if (tile.properties.Direction == "Right") {
						moveX = 1;
						moveY = 0;
					}
					if (tile.properties.Direction == "Up") {
						moveX = 0;
						moveY = -1;
					}
					if (tile.properties.Direction == "Down") {
						moveX = 0;
						moveY = 1;
					}
				}
			}
		}

		// If you're not in between tiles...
		if (!this.tweening) {
			// ...check the destination tile for collision. If not...
			let nextTile = this.scene.grid.currentMap.getTileAt(this.tilePos.x + moveX, this.tilePos.y + moveY);
			if (nextTile && !nextTile.properties.Collision) {
				// ...move.
				this.move(moveX, moveY);
			} 
			// If there is a collision...
			else {
				// ...check if you can move vertically or horizontally alone.
				// If you can, move.
				nextTile = this.scene.grid.currentMap.getTileAt(this.tilePos.x, this.tilePos.y + moveY);
				if (nextTile && !nextTile.properties.Collision) {
					this.move(0, moveY);
				}

				nextTile = this.scene.grid.currentMap.getTileAt(this.tilePos.x + moveX, this.tilePos.y);
				if (nextTile && !nextTile.properties.Collision) {
					this.move(moveX, 0);
				}
			}

			if (!nextTile) {
				this.move(moveX, moveY);
			}
		}
		else {
			this.tweenMovement();
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
		this.startPos = new Phaser.Math.Vector2(this.go.x, this.go.y);
		this.targetPos = new Phaser.Math.Vector2(	this.go.x + dx * this.scene.grid.currentMap.tileWidth,
													this.go.y + dy * this.scene.grid.currentMap.tileHeight);
		this.tweening = true;
		this.tweenMovement();
	}

	tweenMovement() {
		let difference = new Phaser.Math.Vector2(this.targetPos.x - this.startPos.x, this.targetPos.y - this.startPos.y);
		
		let stepX = this.go.x + difference.x * 10 * this.scene.game.loop.delta / 1000;
		if (this.targetPos.x > this.startPos.x) {
			this.go.x = Math.min(stepX, this.targetPos.x);
		}
		else {
			this.go.x = Math.max(stepX, this.targetPos.x);
		}

		let stepY = this.go.y + difference.y * 10 * this.scene.game.loop.delta / 1000;
		if (this.targetPos.y > this.startPos.y) {
			this.go.y = Math.min(stepY, this.targetPos.y);
		}
		else {
			this.go.y = Math.max(stepY, this.targetPos.y);
		}
	}

	getEgg(player, egg) {
		egg.destroy();
		this.UIScene.dialogueManager.queueMessages(Egg.messages[Egg.messageIndex++]);
		this.scene.state = "pause";
	}

	playScript(script) {
		if (script == "intro") {
			let tweens = [
				{
					x: 15 * this.scene.grid.currentMap.tileWidth,
					y: 10 * this.scene.grid.currentMap.tileHeight,
					duration: 1000,
				},
				{
					x: 11 * this.scene.grid.currentMap.tileWidth,
					y: 10 * this.scene.grid.currentMap.tileHeight,
					duration: 800
				},
				{
					x: 19 * this.scene.grid.currentMap.tileWidth,
					y: 10 * this.scene.grid.currentMap.tileHeight,
					duration: 1600
				}
			];
			this.scene.tweens.timeline({
				tweens: tweens,
				targets: this.go,
				ease: "Linear",
				onComplete: () => {
					this.tilePos.x = 19;
					this.tilePos.y = 10;
					this.scene.state = "play";
				}
			});
		}
	}
}