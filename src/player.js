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
		this.walkSpeed = 250;
		this.walkMultiplier = 1;

		this.frameRate = 4;
		var walkDownConfig = {
			key: "walkDown",
			frames: this.scene.anims.generateFrameNumbers("playerBase", {frames: [4, 8, 12, 0]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		var walkUpConfig = {
			key: "walkUp",
			frames: this.scene.anims.generateFrameNumbers("playerBase", {frames: [6, 10, 14, 2]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		var walkLeftConfig = {
			key: "walkLeft",
			frames: this.scene.anims.generateFrameNumbers("playerBase", {frames: [5, 9, 13, 1]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		var walkRightConfig = {
			key: "walkRight",
			frames: this.scene.anims.generateFrameNumbers("playerBase", {frames: [7, 11, 15, 3]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		this.walkDownAnim = this.scene.anims.create(walkDownConfig);
		this.walkUpAnim = this.scene.anims.create(walkUpConfig);
		this.walkLeftAnim = this.scene.anims.create(walkLeftConfig);
		this.walkRightAnim = this.scene.anims.create(walkRightConfig);

		this.go.anims.load("walkDown");
		this.go.anims.load("walkLeft");
		this.go.anims.load("walkRight");
		this.go.anims.load("walkUp");

		var outOfBedConfig = {
			key: "outOfBed",
			frames: this.scene.anims.generateFrameNumbers("playerBase", {frames: [1, 2, 3, 0]}),
			frameRate: 4,
			repeat: 1,
			onComplete: () => {this.go.anims.currentAnim = this.walkLeftAnim;},
			onCompleteScope: this
		}
		this.outOfBedAnim = this.scene.anims.create(outOfBedConfig);
		this.go.anims.load("outOfBed");

		this.go.anims.currentAnim = null;


		this.name = "Player";

		this.exitHouseFlag = false;
		this.forestBoundFlag = false;
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
		if (this.tweening && (this.go.x == this.targetPos.x && this.go.y == this.targetPos.y)) {
			this.tweening = false;


			if (this.scene.eggs) {
		 		let eggGOs = this.scene.eggs.map((egg) => egg.go);
		 		if (this.scene.physics.world.overlap(this.go, eggGOs, this.hitEggTrigger, () => true, this)) {
		 			moveX = 0;
		 			moveY = 0;
		 		}
			}

			if (this.scene.mirrorTrigger) {
				if (this.scene.physics.world.overlap(this.go, this.scene.mirrorTrigger.go, this.hitMirrorTrigger, () => true, this)) {
					moveX = 0;
					moveY = 0;
				}
			}

	 		// ...or handle if player is touching a tile with the Map property, which means...
	 		let tile = this.scene.mapManager.currentMap.getTileAt(this.tilePos.x, this.tilePos.y);
			if (tile.properties.Map) {
				// ...that tile teleports player to a different map, so change map
				this.scene.mapManager.changeMap(tile.properties);

				if (this.scene.mapManager.currentMap == this.scene.mapManager.houseMap && !this.exitHouseFlag) {
					this.scene.state = "script";
					this.scene.scriptManager.script = "Rhyme";
					this.scene.scriptManager.updateScript();
					return;
				}

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

				if (this.scene.mapManager.currentMap == this.scene.mapManager.roomMap) {
					this.scene.mirrorPlayer.goto(11, 18);
					this.scene.mirrorPlayer.go.anims.play("walkUp", true);
					this.scene.mirrorPlayer.go.currentAnim = this.walkUpAnim;
					this.scene.mirrorPlayer.move(moveX, moveY);
				}
			}
		}

		let updatePlayer = false;

		// If you're not in between tiles...
		if (!this.tweening) {

			// Set sprite frame depending on direction moving
			if (moveX == 1) {
				this.go.anims.play("walkRight", true);
				this.go.currentAnim = this.walkRightAnim;
			}
			if (moveX == -1) {
				this.go.anims.play("walkLeft", true);
				this.go.currentAnim = this.walkLeftAnim;
			}
			if (moveY == 1) {
				this.go.anims.play("walkDown", true);
				this.go.currentAnim = this.walkDownAnim;
			}
			if (moveY == -1) {
				this.go.anims.play("walkUp", true);
				this.go.currentAnim = this.walkUpAnim;
			}

			let nextTile = this.scene.mapManager.currentMap.getTileAt(this.tilePos.x + moveX, this.tilePos.y + moveY);
			if (!nextTile || nextTile.properties.Collision) {
				moveX = 0;
				moveY = 0;
			}

			if (this.scene.forestBounds && this.scene.mapManager.currentMap == this.scene.mapManager.houseMap) {
				if (!this.forestBoundFlag) {
					for (let i = 0; i < this.scene.forestBounds.length; i++) {
						let bound = this.scene.forestBounds[i];

						if (this.tilePos.x + moveX == bound.tilePos.x && this.tilePos.y + moveY == bound.tilePos.y) {
							this.hitForestTrigger();
							moveX = 0;
							moveY = 0;
						}
					}
				}
			}

			if (moveX == 0 && moveY == 0) {
				if (this.go.anims.isPlaying) {
					this.pauseAnimation();
				}
			}

			this.move(moveX, moveY);
			if (moveX == 0 && moveY == 0) {
				updatePlayer = false;
			}
			else {
				updatePlayer = true;
			}
		}
		else {
			this.tweenMovement();
		}
		return updatePlayer;
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
		
		let stepX = this.go.x + difference.x / this.walkSpeed * this.walkMultiplier * this.scene.game.loop.delta;
		if (this.targetPos.x > this.startPos.x) {
			this.go.x = Math.min(stepX, this.targetPos.x);
		}
		else {
			this.go.x = Math.max(stepX, this.targetPos.x);
		}

		let stepY = this.go.y + difference.y / this.walkSpeed * this.walkMultiplier * this.scene.game.loop.delta;
		if (this.targetPos.y > this.startPos.y) {
			this.go.y = Math.min(stepY, this.targetPos.y);
		}
		else {
			this.go.y = Math.max(stepY, this.targetPos.y);
		}
	}

	pauseAnimation() {
		let frame = -1;
		if (this.go.currentAnim.key == "walkUp") frame = 2;
		if (this.go.currentAnim.key == "walkDown") frame = 0;
		if (this.go.currentAnim.key == "walkLeft") frame = 1;
		if (this.go.currentAnim.key == "walkRight") frame = 3;

		this.go.setFrame(frame);
		this.go.anims.stop();
	}

	// When landing on egg, destroy egg and queue next egg message, pausing scene
	hitMirrorTrigger(player, mirror) {
		this.scene.mirrorTrigger.go.destroy();
		this.pauseAnimation();
		this.scene.mirrorPlayer.pauseAnimation();

		this.scene.state = "pause";

		this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				this.scene.player.go.setFrame(1);
				this.scene.mirrorPlayer.go.setFrame(3);
				this.scene.time.addEvent({
					delay: 500,
					callback: () => {
						this.UIScene.dialogueManager.queueMessages(this.name, Trigger.mirrorMessage);
					}
				});
			}
		});
	}

	hitEggTrigger (player, egg) {
		egg.destroy();
		this.UIScene.dialogueManager.queueMessages(this.name, Trigger.eggMessages[Trigger.eggMessageIndex++]);
		this.scene.state = "pause";
		if (Trigger.eggMessageIndex == Trigger.eggMessages.length) {
			this.forestBoundFlag = true;
		}
	}

	hitForestTrigger(player, bound) {
		this.UIScene.dialogueManager.queueMessages(this.name, Trigger.boundMessage);
		this.scene.state = "pause";
	}



	// Handles how the character moves during scripted motion
	scriptMove(tileX, tileY, duration, delay, update) {
		if (update === undefined) {
			update = true;
		}

		// Change character's sprite depending on direction of movement
		if (tileX - this.tilePos.x < 0) {
			this.go.currentAnim = this.walkLeftAnim;
		}
		if (tileX - this.tilePos.x > 0) {
			this.go.currentAnim = this.walkRightAnim;
		}
		if (tileY - this.tilePos.y < 0) {
			this.go.currentAnim = this.walkUpAnim;
		}
		if (tileY - this.tilePos.y > 0) {
			this.go.currentAnim = this.walkDownAnim;
		}

		this.tilePos.x = tileX;
		this.tilePos.y = tileY;


		let actualDuration = duration * this.walkSpeed;

		this.scene.time.addEvent({
			delay: delay,
			callback: () => {
				this.go.anims.play(this.go.currentAnim);
			}
		});

		this.scene.time.addEvent({
			delay: actualDuration + delay,
			callback: () => {
				this.pauseAnimation();
			}
		});

		return this.scene.tweens.add({
			targets: this.go,
			x: this.tileToWorldPos(tileX, tileY).x,
			y: this.tileToWorldPos(tileX, tileY).y,
			duration: actualDuration,
			delay: delay,
			onComplete: () => {
				if (update) {
					this.scene.scriptManager.updateScript();
				}
			}
		});
	}

	scriptOutOfBed() {
		this.tilePos.x = this.tilePos.x - 2;

		let up = {
			targets: this.go,
			y: this.go.y - 20,
			x: this.go.x - 40,
			duration: 200,
			delay: 200,
			ease: "Linear",
			onComplete: () => {
				this.go.setFrame(1);
			}
		};
		let down = {
			targets: this.go, 
			y: this.go.y,
			x: this.go.x - 80,
			duration: 200,
			ease: "Linear",
			onComplete: () => {
				this.scene.scriptManager.updateScript();
			}
		}
		this.scene.tweens.timeline({
			tweens: [up, down]
		});
	}

	scriptJump() {
		let up = {
			targets: this.go,
			y: this.go.y - 20,
			duration: 150,
			ease: "QuadIn",
			onComplete: () => {
				this.go.setFrame(0);
			}
		};
		let down = {
			targets: this.go,
			y: this.go.y,
			duration: 150,
			ease: "QuadOut"
		};

		this.scene.tweens.timeline({
			tweens: [up, down]
		});
	}

	// Handles how the characters speak during scripted dialogue
	scriptMessage(message, delay) {
		if (delay == 0 || delay === undefined) {
			delay = 150;
		}

		this.scene.time.addEvent({ delay: delay, callback: () => {
			this.speaking = true;
			this.UIScene.dialogueManager.queueMessages(this.name, message);
		}});
	}

	onDialogueClose() {
		if (this.scene.state == "pause") {
			this.scene.state = "play";
		}

		// If the dialogue box is closed as part of the script, figure out who was
		// speaking and update their script
		if (this.scene.state == "script") {
			this.scene.scriptManager.updateScript();
		}
	}

	goto(tileX, tileY) {
		this.tilePos.x = tileX;
		this.tilePos.y = tileY;
		this.go.x = this.tileToWorldPos(this.tilePos.x, this.tilePos.y).x;
		this.go.y = this.tileToWorldPos(this.tilePos.x, this.tilePos.y).y;
	}

	// Converts tile position to world position
	tileToWorldPos(tileX, tileY) {
		return {x: tileX * this.scene.mapManager.currentMap.tileWidth + this.scene.mapManager.currentLayer.x, 
				y: tileY * this.scene.mapManager.currentMap.tileHeight + this.scene.mapManager.currentLayer.y}
	}
}