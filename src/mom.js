class Mom extends Player {
	constructor(scene) {
		super(scene);
	}

	playScript(script) {
		if (script == "intro") {
			this.go.x = this.tileToWorldPos(15, 17).x;
			this.go.y = this.tileToWorldPos(15, 17).y;

			this.scene.time.addEvent({
				delay: 500,
				callback: () => {

					let tweens = [
						{
							x: this.tileToWorldPos(15, 14).x,
							y: this.tileToWorldPos(15, 14).y,
							duration: 1000
						},
					];
					this.scene.tweens.timeline({
						tweens: tweens,
						targets: this.go,
						ease: "Linear",
						onComplete: () => {

							this.pauseScript = true;
							this.UIScene.dialogueManager.queueMessages("Alex, it's time to wake up!");

							this.scene.time.addEvent({
								delay: 2000,
								callback: () => {
									
									this.UIScene.dialogueManager.dequeueMessage();
									tweens = [
										{
											x: this.tileToWorldPos(15, 11).x,
											y: this.tileToWorldPos(15, 11).y,
											duration: 1500
										}
									];
									this.scene.tweens.timeline({
										delay: 500,
										tweens: tweens,
										targets: this.go,
										ease: "Linear",
										onComplete: () => {
											this.UIScene.dialogueManager.queueMessages("Come on, wake up!");

											this.scene.time.addEvent({
												delay: 2000,
												callback: () => {
													this.UIScene.dialogueManager.dequeueMessage();
												}
											})
										}
									})
								}
							})
						}
					});
				}
			})
		}
	}
}