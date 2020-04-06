class Egg {
	constructor(scene, tileX, tileY) {
		this.scene = scene;

		// Initialize egg game object to house map
		this.go = this.scene.add.sprite(tileX * this.scene.mapManager.townMap.tileWidth + this.scene.mapManager.townLayer.x,
										tileY * this.scene.mapManager.townMap.tileHeight,
										"egg");
		this.go.setOrigin(0, 0);
		this.scene.physicsManager.addToGroup(this.go, "static");

		// Static members so that no matter what egg you get first, it'll give you the same message
		if (!Egg.messages) {
			Egg.messages = [
				["Egg 1"],
				["Egg 2"],
				["Egg 3"],
				["Egg 4"],
				["Egg 5"],
				["Egg 6"],
				["Egg 7"]
			];
			Egg.messageIndex = 0;
		}
	}

	// Gets next message and increases index
	static getMessage() {
		Egg.messageIndex++;
		return Egg.messages;
	}
}