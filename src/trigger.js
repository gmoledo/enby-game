class Trigger {
	constructor(scene, object, tileX, tileY) {
		this.scene = scene;

		this.triggerType = object;

		this.tilePos = new Phaser.Math.Vector2(tileX, tileY);
		
		// Initialize egg game object to house map
		if (this.triggerType == "egg") {
			this.go = this.scene.add.sprite(tileX * this.scene.mapManager.townMap.tileWidth + this.scene.mapManager.townLayer.x,
											tileY * this.scene.mapManager.townMap.tileHeight,
											"egg");
		}
		if (this.triggerType == "forestTrigger" || this.triggerType == "forestBound") {
			this.go = this.scene.add.sprite(tileX * this.scene.mapManager.houseMap.tileWidth + this.scene.mapManager.houseLayer.x,
											tileY * this.scene.mapManager.houseMap.tileHeight,
											"trigger");
		}
		if (this.triggerType == "mirrorTrigger") {
			this.go = this.scene.add.sprite(tileX * this.scene.mapManager.roomMap.tileWidth + this.scene.mapManager.roomLayer.x,
											tileY * this.scene.mapManager.roomMap.tileHeight + this.scene.mapManager.roomLayer.y, 
											"trigger");
			console.log("D");
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
		if (this.triggerType == "forestBound") {
			Trigger.boundMessage = ["There's creatures in there.", "I should go.", "Time to find some eggs!"];
		}
		if (this.triggerType == "mirrorTrigger") {
			Trigger.mirrorMessage = [	". . .", "Something's . . . off. Is it my hair?", ". . .",
										"No. No, it's the shirt. And the shorts. God, these clothes look . . . wrong.", "I hope no one notices. . ."]
		}
	}
}