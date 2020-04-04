class Egg {
	constructor(scene, tileX, tileY) {
		this.scene = scene;

		this.go = this.scene.add.sprite(tileX * this.scene.mapManager.map.tileWidth + this.scene.mapManager.layer.x,
										tileY * this.scene.mapManager.map.tileHeight,
										"egg");
		this.go.setOrigin(0, 0);
		this.scene.physicsManager.addToGroup(this.go, "static");

		if (!Egg.messages) {
			Egg.messages = [
				["This is the first message of the first egg.", "Message 2 of Egg 1", "Message 3 of Egg 1"],
				["This is the first message of the second egg.", "Message 2 of Egg 2", "Message 3 of Egg 2"],
				["This is the first message of the third egg.", "Message 2 of Egg 3", "Message 3 of Egg 3"]
			];
			Egg.messageIndex = 0;
		}
	}

	static getMessage() {
		Egg.messageIndex++;
		return Egg.messages;
	}
}