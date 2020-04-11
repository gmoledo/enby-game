class Trigger {
	constructor(scene, object, tileX, tileY) {
		this.scene = scene;

		this.triggerType = object;

		this.tilePos = new Phaser.Math.Vector2(tileX, tileY);
		
		let layer = null;
		if (this.triggerType == "egg" || this.triggerType == "storeTrigger") layer = this.scene.mapManager.townLayer;
		if (this.triggerType == "mirrorTrigger") layer = this.scene.mapManager.roomLayer;
		if (this.triggerType == "door" || this.triggerType == "forestTrigger" || this.triggerType == "forestBound") layer = this.scene.mapManager.houseLayer;

		if (this.triggerType == "egg") {
			this.go = this.scene.add.sprite(tileX * 40 + layer.x,
											tileY * 40 + layer.y,
											"egg");
		}
		else {
			this.go = this.scene.add.sprite(tileX * 40 + layer.x,
											tileY * 40 + layer.y,
											"trigger");
		}
		this.go.setOrigin(0, 0);
		this.scene.physicsManager.addToGroup(this.go, "static");

		// Static members so that no matter what egg you get first, it'll give you the same message
		if (this.triggerType == "egg") {
			Trigger.eggMessages = [
				["Egg 1"],
				["Egg 2"],
				["Egg 3"],
				["Egg 4"],
				["Egg 5"],
				["Egg 6"],
				["Egg 7"]
			];
			Trigger.eggMessageIndex = 0;
		}
		if (this.triggerType == "mirrorTrigger") {
			Trigger.mirrorMessage = [	". . .", "Something's . . . off. Is it my hair?", ". . .",
										"No. No, it's the shirt. And the shorts. God, these clothes look . . . wrong.", "I hope no one notices. . ."]
		}
		if (this.triggerType == "door") {
			Trigger.doorMessage = ["You'd better be getting those eggs!"]
		}
		if (this.triggerType == "forestBound") {
			Trigger.boundMessage = ["I should go get those eggs."];
		}
	}
}