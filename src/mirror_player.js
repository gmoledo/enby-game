class MirrorPlayer extends Player {
	constructor(scene) {
		super(scene);
	}

	update(dt, playerUpdated) {
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
			moveY = 1;
		}
		if (this.scene.inputManager.input == "down") {
			moveY = -1;
		}

		// If moving player reaches destination...
		if (this.tweening && (this.go.x == this.targetPos.x && this.go.y == this.targetPos.y)) {
			this.tweening = false;
		}

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

			if (!playerUpdated) {
				moveX = 0;
				moveY = 0;
			}

			if (moveX == 0 && moveY == 0) {
				if (this.go.anims.isPlaying) {
					this.pauseAnimation();
				}
			}

			this.move(moveX, moveY);
		}
		else {
			this.tweenMovement();
		}
	}

}