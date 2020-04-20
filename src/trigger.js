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
				["That outfit looked really nice, though. I wish I could take it.", "But Mom would get mad."],
				["She always makes me wear what she wants. Never gives me the choice. As if I don't have a mind of my own."],
				["I think she's afraid. I dunno what of. But she doesn't want me making decisions, that's for sure."],
				["Well, what if I made my own decision for once?", "Want that outfit? Yeah, I'll get it. Who cares what she thinks?"],
				["But I don't want her to be upset.", "She's still my mom, afterall."],
				["I guess I'll just bring back these eggs. Maybe get her an extra one, too."],
				["Hope this makes her happy."]
			];
			Trigger.eggMessageIndex = 0;
		}
		if (this.triggerType == "door") {
			Trigger.doorMessage = ["You'd better be getting those eggs!"]
		}
		if (this.triggerType == "forestBound") {
			Trigger.boundMessage = ["I shouldn't go in there."];
		}
	}
}