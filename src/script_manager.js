class ScriptManager {
	constructor(scene) {
		this.scene = scene;

		this.updateScriptAction = false;
		this.scriptAction = -1;
		this.script = "None";
	}
	// Go to the next scripted behavior
	updateScript() {
		this.scriptAction++;
		this.updateScriptAction = true;
	}	

	update() {
		if (this.script == "Intro" && this.updateScriptAction) {

			let mom = this.scene.mom;
			let player = this.scene.player;


			if (this.scriptAction == 0) {
				this.scene.UIScene.black.setVisible(true);
				
				player.goto(22, 5);
				mom.go.setVisible(false);

				mom.scriptMessage(0, "Knock, knock! Time to wake up sweetie!");
			}
			if (this.scriptAction == 1) this.scene.UIScene.fadeBlack().setCallback("onComplete", () => this.updateScript(), [], this);
			if (this.scriptAction == 2) 
			{
				mom.goto(12, 17);
				mom.go.setVisible(true);
				mom.go.setFrame(2);

				mom.scriptMove(2, 12, 15, 350, 500).setCallback("onComplete", () => mom.scriptMessage(2, "Come on, up and at 'em.", 100), [], this);
			}
			player.scriptMessage(3, "*Yawns* Hmm?", 100);
			if (this.scriptAction == 4) mom.scriptMove(4, 12, 11, 1000, 0).setCallback("onComplete", () => mom.scriptMove(4, 15, 11, 500, 0), [], this);
			mom.scriptMessage(5, "C'mon honey. I need you to go into town and get some eggs for me.");
			if (this.scriptAction == 6) {
				player.go.setFrame(1);

				player.scriptMessage(6, "Eggs? I thought we had plenty.", 500);
			}
			mom.scriptMessage(7, "Not plenty enough. Now go on! And hurry back. I'll have something special for you when you get home.");
			player.scriptMessage(8, "Okay, mother.");
			if (this.scriptAction == 9) mom.scriptMove(9, 12, 11, 500, 0).setCallback("onComplete", () => mom.scriptMove(9, 12, 18, 1100, 0), [], this);
			if (this.scriptAction == 10) {
				mom.go.setVisible(false);
			}
			player.scriptMove(10, 20, 5, 1000, 500);

			if (this.scriptAction == 11) {
				this.scene.state = "play";
				this.scriptAction = -1;
			}
		}

		if (this.script == "Rhyme" && this.updateScriptAction) {

			let mom = this.scene.mom;
			let player = this.scene.player;

			if (this.scriptAction == 0) {
				this.scene.mapManager.changeMap({Map: "House"});

				player.exitHouseFlag = true;
				player.goto(17, 7);

				player.scriptMove(0, 17, 10, 500, 0);
			}

			if (this.scriptAction == 1) {
				player.go.setFrame(2);
				
				mom.goto(17, 7);
				mom.go.setVisible(true);

				mom.scriptMove(1, 17, 8, 150, 0);
			}
			mom.scriptMessage(2, ["Oh, and the rhyme, sweetie! Don't forget the rhyme!"]);

			if (this.scriptAction == 3) {
				player.scriptMessage(3, "Ugh...");
			}

			if (this.scriptAction == 4) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.dynamicText;
				player.scriptMessage(4, "From the woods we stay away,\nTo keep the creatures in at bay,\n" +
						 				"They rip and tear and bite and slay,\nUntil they reap the light of day.");
			}

			if (this.scriptAction == 5) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.staticText;
				mom.scriptMessage(5, "That's right, honey. See you soon!");
			}
			if (this.scriptAction == 6) {
				mom.scriptMove(6, 17, 7, 150, 0).setCallback("onComplete", () => {
					mom.go.setVisible(false);
					this.updateScript();
				}, [], this);
			}
			if (this.scriptAction == 7) {
				player.go.setFrame(0);
				this.scene.state = "play";
				this.scriptAction = -1;
			}
		}
		console.log(this.scriptAction, this.script, this.updateScriptAction);
		if (this.script == "ForestBound" && this.updateScriptAction) {
			let player = this.scene.player;

			if (this.scriptAction == 0) player.scriptMessage(0, Trigger.boundMessage);
			if (this.scriptAction == 1) {
				player.scriptMove(1, player.tilePos.x - 1, player.tilePos.y, 250, 0);
			}
			if (this.scriptAction == 2) {
				this.scene.state = "play";
				this.scriptAction = -1;
			}
		}
		this.updateScriptAction = false;
	}
}