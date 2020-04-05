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
			this.updateScriptAction = false;

			let mom = this.scene.mom;
			let player = this.scene.player;

			console.log(this.scriptAction);
			mom.scriptMessage(0, "Knock, knock! Time to wake up sweetie!");
			if (this.scriptAction == 1) mom.UIScene.fadeBlack().setCallback("onComplete", () => this.updateScript(), [], this);
			if (this.scriptAction == 2) 
			{
				mom.tilePos.x = 15;
				mom.tilePos.y = 17;
				mom.go.x = mom.tileToWorldPos(mom.tilePos.x, mom.tilePos.y).x;
				mom.go.y = mom.tileToWorldPos(mom.tilePos.x, mom.tilePos.y).y;
				mom.go.setFrame(2);

				mom.scriptMessage(2, "Come on, up and at 'em.", 1000)
			}
			player.scriptMessage(3, "*Yawns* Hmm?", 100);
			if (this.scriptAction == 4) mom.scriptMove(4, 15, 11, 1000, 0).setCallback("onComplete", () => mom.scriptMove(4, 18, 11, 500, 0), [], this);
			mom.scriptMessage(5, "C'mon babe. I need you to go into town and get some eggs for me.");
			if (this.scriptAction == 6) {
				player.go.setFrame(1);

				player.scriptMessage(6, "Eggs? I thought we had plenty.", 500);
			}
			mom.scriptMessage(7, "Not plenty enough. Now go on! And hurry back. I'll have something special for you when you get home.");
			player.scriptMessage(8, "Okay, mother.");
			if (this.scriptAction == 9) mom.scriptMove(9, 15, 11, 500, 0).setCallback("onComplete", () => mom.scriptMove(9, 15, 17, 1000, 0), [], this);
			if (this.scriptAction == 10) {
				mom.go.setVisible(false);
			}
			player.scriptMove(10, 23, 6, 1000, 500);

			if (this.scriptAction == 11) this.scene.state = "play";
		}	
	}
}