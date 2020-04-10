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
			let mirrorMom = this.scene.mirrorMom;
			let player = this.scene.player;


			if (this.scriptAction == 0) {
				this.scene.UIScene.black.setVisible(true);
				
				player.goto(22, 5);
				player.go.setFrame(2);
				mom.go.setVisible(false);

				mom.scriptMessage("Knock, knock! Time to wake up sweetie!", 0);
			}

			if (this.scriptAction == 1) {
				this.scene.UIScene.fadeBlack().setCallback("onComplete", () => this.updateScript(), [], this);
			}
			
			if (this.scriptAction == 2) 
			{
				mom.goto(12, 17);
				mirrorMom.goto(11, 17);

				mom.go.setVisible(true);
				mom.go.setFrame(2);

				mom.scriptMove(12, 15, 2, 500, true);
				mirrorMom.scriptMove(11, 15, 2, 500, false);
			}

			if (this.scriptAction == 3) {
				mom.scriptMessage("Come on, up and at 'em.", 0);
			}

			if (this.scriptAction == 4) {
				player.go.setFrame(1);
				player.scriptMessage("*Yawns* Hmm?", 300);			}

			if (this.scriptAction == 5) {
				mom.scriptMove(12, 11, 4, 0, true);
				mirrorMom.scriptMove(11, 11, 4, 0, false);
			}

			if (this.scriptAction == 6) {
				mom.scriptMove(15, 11, 3, 0, true);
			}

			if (this.scriptAction == 7) {
				mom.scriptMessage("C'mon honey. I need you to go into town and get some eggs for me.", 0);
			}

			if (this.scriptAction == 8) {
				player.scriptJump();
				player.scriptMessage("Uh, eggs? I thought we had plenty.", 300);
			}

			if (this.scriptAction == 9) {
				mom.scriptMessage("Not plenty enough! I'm making something special and I'm gonna need about a half-dozen more.", 0);
			}

			if (this.scriptAction == 10) {
				player.scriptMessage("But. . .why do I have to go?", 0);
			}

			if (this.scriptAction == 11) {
				mom.scriptMessage("You don't have to go. Just like I don't have to put a roof over your head and cook special meals for you!");
			}

			if (this.scriptAction == 12) {
				player.scriptMessage(". . .");
			}

			if (this.scriptAction == 13) {
				mom.scriptMessage("Is something the matter, sweetie?");
			}

			if (this.scriptAction == 14) {
				player.scriptMessage("No. Nothing.");
			}

			if (this.scriptAction == 15) {
				mom.scriptMessage("Good. Then I'll see you soon!");
			}

			if (this.scriptAction == 16) 
			{
				mom.scriptMove(12, 11, 3, 0, true);
			}
				
			if (this.scriptAction == 17) {
				mom.scriptMove(12, 18, 7, 0, true);
				mirrorMom.goto(11, 11);
				mirrorMom.scriptMove(11, 18, 7, 0, false);
			}

			if (this.scriptAction == 18) {
				mom.go.setVisible(false);
				player.scriptMessage("*Sigh*", 0);
			}

			if (this.scriptAction == 19) {
				player.scriptOutOfBed();
			}

			if (this.scriptAction == 20) {
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

				player.scriptMove(17, 10, 3, 0);
			}

			if (this.scriptAction == 1) {
				player.go.setFrame(2);
				
				mom.goto(17, 7);
				mom.go.setFrame(0);
				mom.go.setVisible(true);

				mom.scriptMove(17, 8, 1, 500);
			}

			if (this.scriptAction == 2) {
				mom.scriptMessage("You were staring at the mirror again, weren't you?", 0);
			}
		
			if (this.scriptAction == 3) {
				player.scriptMessage("No. . .", 0);
			}

			if (this.scriptAction == 4) {
				mom.scriptMessage("Honey, what have I told you? You're perfect the way you are! You shouldn't feel bad.");
			}

			if (this.scriptAction == 5) {
				player.scriptMessage("Yeah, that's easy for you to say.")
			}

			if (this.scriptAction == 6) {
				mom.scriptMessage("Excuse me?");
			}

			if (this.scriptAction == 7) {
				player.scriptMessage(". . .");
			}

			if (this.scriptAction == 8) {
				mom.scriptMessage("I'm just trying to help you, sweetie.")
			}

			if (this.scriptAction == 9) {
				player.scriptMessage("I know.");
			}

			if (this.scriptAction == 10) {
				mom.scriptMessage("As long as you know. Now run along, go get those eggs for me.");
			}

			if (this.scriptAction == 11) {
				mom.go.setFrame(2);
				this.scene.time.addEvent({
					delay: 750,
					callback: () => {
						mom.go.setFrame(0);
						mom.scriptMessage("Oh, and the rhyme, sweetie! Don't forget the rhyme.");
					}
				})
			}

			if (this.scriptAction == 12) {
				player.scriptMessage("I know, mother.");
			}

			if (this.scriptAction == 13) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.dynamicText;
				player.scriptMessage(	"From the woods we stay away,\nTo keep the creatures in at bay,\n" +
						 				"They'll rip and tear and bite and slay,\nUntil they reap the light of day.", 0);
			}

			if (this.scriptAction == 14) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.staticText;
				mom.scriptMessage("That's right, sweetie. I'll see you when you get back!", 0);
			}

			if (this.scriptAction == 15) {
				mom.scriptMove(17, 7, 1, 0).setCallback("onComplete", () => {
					mom.go.setVisible(false);
					this.updateScript();
				}, [], this);
			}

			if (this.scriptAction == 16) {
				this.scene.time.addEvent({
					delay: 500,
					callback: () => {
						player.go.setFrame(0);
						this.scene.state = "play";
						this.scriptAction = -1;
					}
				});
			}
		}

		this.updateScriptAction = false;
	}
}