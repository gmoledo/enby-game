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
				player.go.setFrame(2);
				mom.go.setVisible(false);

				mom.scriptMessage(0, "Knock, knock! Time to wake up sweetie!", 0);
			}
			if (this.scriptAction == 1) this.scene.UIScene.fadeBlack().setCallback("onComplete", () => this.updateScript(), [], this);
			if (this.scriptAction == 2) 
			{
				mom.goto(12, 17);
				mom.go.setVisible(true);
				mom.go.setFrame(2);

				mom.scriptMove(2, 12, 15, 2, 500);
			}
			if (this.scriptAction == 3) {
				mom.scriptMessage(3, "Come on, up and at 'em.", 0);
			}

			player.scriptMessage(4, "*Yawns* Hmm?", 0);
			if (this.scriptAction == 5) mom.scriptMove(5, 12, 11, 4, 0);
			if (this.scriptAction == 6) mom.scriptMove(6, 15, 11, 3, 0);
			mom.scriptMessage(7, "C'mon honey. I need you to go into town and get some eggs for me.", 0);
			if (this.scriptAction == 8) {
				player.go.setFrame(1);

				player.scriptMessage(8, "Eggs? I thought we had plenty.", 300);
			}
			mom.scriptMessage(9, "Not plenty enough. Now go on! And hurry back. I'll have something special for you when you get home.", 0);
			player.scriptMessage(10, "Okay, mother.", 0);
			if (this.scriptAction == 11) mom.scriptMove(11, 12, 11, 3, 0).setCallback("onComplete", () => mom.scriptMove(11, 12, 18, 7, 0), [], this);
			if (this.scriptAction == 12) {
				mom.go.setVisible(false);
			}
			if (this.scriptAction == 12) {
				player.scriptOutOfBed();
			}

			if (this.scriptAction == 13) {
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

				player.scriptMove(0, 17, 10, 3, 0);
			}

			if (this.scriptAction == 1) {
				player.go.setFrame(2);
				
				mom.goto(17, 7);
				mom.go.setVisible(true);

				mom.scriptMove(1, 17, 8, 1, 0);
			}
			mom.scriptMessage(2, "Oh, and the rhyme, sweetie! Don't forget the rhyme!", 0);

			if (this.scriptAction == 3) {
				player.scriptMessage(3, "Ugh...", 0);
			}

			if (this.scriptAction == 4) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.dynamicText;
				player.scriptMessage(4, "From the woods we stay away,\nTo keep the creatures in at bay,\n" +
						 				"They rip and tear and bite and slay,\nUntil they reap the light of day.", 0);
			}

			if (this.scriptAction == 5) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.staticText;
				mom.scriptMessage(5, "That's right, honey. See you soon!", 0);
			}
			if (this.scriptAction == 6) {
				mom.scriptMove(6, 17, 7, 1, 0).setCallback("onComplete", () => {
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

		this.updateScriptAction = false;
	}
}