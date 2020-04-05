class Player {
	constructor(scene) {
		this.scene = scene;
		this.UIScene = this.scene.scene.get("UIScene");

		// Grid position of player
		this.tilePos = new Phaser.Math.Vector2(25, 5);

		// Instantiate Phaser game object representing player
		this.go = this.scene.add.sprite(this.tileToWorldPos(this.tilePos.x, this.tilePos.y).x,
										this.tileToWorldPos(this.tilePos.x, this.tilePos.y).y,
										"playerBase");
		this.go.setOrigin(0, 0.5);

		this.scene.physicsManager.addToGroup(this.go, "dynamic");

		this.go.body.setSize(this.go.width * 2/3, this.go.height / 2 * 2/3, false);
		this.go.body.setOffset(this.go.width * 1/6, this.go.height / 2 + this.go.height / 2 * 1/6);

		// Tween for moving player
		this.startPos = new Phaser.Math.Vector2(0, 0);
		this.targetPos = new Phaser.Math.Vector2(0, 0);
		this.walkSpeed = 10;

		this.name = "Player";
	}

	update(dt) {
		let moveX = 0;
		let moveY = 0;

		// Set movement depending on input
		if (this.scene.inputManager.input == "left") {
			moveX = -1;
		}
		if (this.scene.inputManager.input == "right") {
			moveX = 1;
		}
		if (this.scene.inputManager.input == "up") {
			moveY = -1;
		}
		if (this.scene.inputManager.input == "down") {
			moveY = 1;
		}

		// If moving player reaches destination...
		if (this.tweening) {
			if (this.go.x == this.targetPos.x && this.go.y == this.targetPos.y) {
				this.tweening = false;

				// ...handle if player is touching an egg.
		 		let eggGOs = this.scene.eggs.map((egg) => egg.go);
		 		if (this.scene.physics.world.overlap(this.go, eggGOs, this.getEgg, () => true, this)) {
		 			return; // Return if found so that player doesn't continue moving
		 		}

		 		// ...or handle if player is touching a tile with the Map property, which means...
		 		let tile = this.scene.mapManager.currentMap.getTileAt(this.tilePos.x, this.tilePos.y);
				if (tile.properties.Map) {
					// ...that tile teleports player to a different map, so change map
					this.scene.mapManager.changeMap(tile.properties);

					// Set move variables depending on direction
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
			
			// Set sprite frame depending on direction moving
			if (moveX == 1) {
				this.go.setFrame(3);
			}
			if (moveX == -1) {
				this.go.setFrame(1);
			}
			if (moveY == 1) {
				this.go.setFrame(0);
			}
			if (moveY == -1) {
				this.go.setFrame(2);
			}
			
			// ...check the destination tile for collision. If not...
			let nextTile = this.scene.mapManager.currentMap.getTileAt(this.tilePos.x + moveX, this.tilePos.y + moveY);
			if (nextTile && !nextTile.properties.Collision) {
				// ...move.
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
		this.targetPos = new Phaser.Math.Vector2(	this.go.x + dx * this.scene.mapManager.currentMap.tileWidth,
													this.go.y + dy * this.scene.mapManager.currentMap.tileHeight);
		this.tweening = true;
		this.tweenMovement();
	}

	// Move player from one tile to the next
	tweenMovement() {
		let difference = new Phaser.Math.Vector2(this.targetPos.x - this.startPos.x, this.targetPos.y - this.startPos.y);
		
		let stepX = this.go.x + difference.x * this.walkSpeed * this.scene.game.loop.delta / 1000;
		if (this.targetPos.x > this.startPos.x) {
			this.go.x = Math.min(stepX, this.targetPos.x);
		}
		else {
			this.go.x = Math.max(stepX, this.targetPos.x);
		}

		let stepY = this.go.y + difference.y * this.walkSpeed * this.scene.game.loop.delta / 1000;
		if (this.targetPos.y > this.startPos.y) {
			this.go.y = Math.min(stepY, this.targetPos.y);
		}
		else {
			this.go.y = Math.max(stepY, this.targetPos.y);
		}
	}

	// When landing on egg, destroy egg and queue next egg message, pausing scene
	getEgg(player, egg) {
		egg.destroy();
		this.UIScene.dialogueManager.queueMessages(this.name, Egg.messages[Egg.messageIndex++]);
		this.scene.state = "pause";
	}

	// Handles how the character moves during scripted motion
	scriptMove(scriptAction, tileX, tileY, duration, delay) {
		if (scriptAction != this.scene.scriptManager.scriptAction) {
			return;
		}

		// Change character's sprite depending on direction of movement
		if (tileX - this.tilePos.x < 0) {
			this.go.setFrame(1);
		}
		if (tileX - this.tilePos.x > 0) {
			this.go.setFrame(3);
		}
		if (tileY - this.tilePos.y < 0) {
			this.go.setFrame(2);
		}
		if (tileY - this.tilePos.y > 0) {
			this.go.setFrame(0);
		}

		this.tilePos.x = tileX;
		this.tilePos.y = tileY;

		return this.scene.tweens.add({
			targets: this.go,
			x: this.tileToWorldPos(tileX, tileY).x,
			y: this.tileToWorldPos(tileX, tileY).y,
			duration: duration,
			delay: delay,
			onComplete: () => {
				this.scene.scriptManager.updateScript();
			}
		});
	}

	// Handles how the characters speak during scripted dialogue
	scriptMessage(scriptAction, message, delay) {
		if (scriptAction != this.scene.scriptManager.scriptAction) {
			return;
		}

		this.scene.time.addEvent({ delay: delay, callback: () => {
			this.speaking = true;
			this.UIScene.dialogueManager.queueMessages(this.name, message);
		}});
	}

	// Converts tile position to world position
	tileToWorldPos(tileX, tileY) {
		return {x: tileX * this.scene.mapManager.currentMap.tileWidth + this.scene.mapManager.currentLayer.x, 
				y: tileY * this.scene.mapManager.currentMap.tileHeight + this.scene.mapManager.currentLayer.y}
	}
}