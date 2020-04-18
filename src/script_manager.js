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
			let mirrorPlayer = this.scene.mirrorPlayer;

			if (this.scriptAction == 0) {
				this.scene.UIScene.black.setVisible(true);
				
				player.goto(22, 6);
				player.go.setFrame(2);
				mom.go.setVisible(false);

				//this.scene.sound.play("door_knock");
				mom.scriptMessage("Knock, knock! Time to wake up sweetie!", 1100);
			}

			if (this.scriptAction == 1) {
				this.scene.UIScene.fadeBlack().setCallback("onComplete", () => this.updateScript(), [], this);
			}
			
			if (this.scriptAction == 2) 
			{
				mom.goto(12, 17);

				mom.go.setVisible(true);
				mom.go.setFrame(2);

				//this.scene.sound.play("door_open");

				mom.scriptMove(12, 15, 4, 500, true);
			}

			if (this.scriptAction == 3) {
				mom.scriptMessage("Come on, up and at 'em.", 0);
			}

			if (this.scriptAction == 4) {
				player.go.setFrame(1);
				player.scriptMessage("*Yawns* Hmm?", 300);
			}

			if (this.scriptAction == 5) {
				mom.scriptMove(12, 10, 10, 0, true);
			}

			if (this.scriptAction == 6) {
				mom.scriptMove(15, 10, 6, 0, true);
			}

			if (this.scriptAction == 7) {
				mom.scriptMessage("C'mon honey. I need you to go into town and get some eggs for me.", 0);
			}

			if (this.scriptAction == 8) {
				player.scriptJump();
				player.scriptMessage("Uh, eggs? I thought we had plenty.", 500);
			}

			if (this.scriptAction == 9) {
				mom.scriptMessage("Not plenty enough! I'm making something special and I'll need a half-dozen more.", 0);
			}

			if (this.scriptAction == 10) {
				player.scriptMessage("But. . .why do I have to go?", 0);
			}

			if (this.scriptAction == 11) {
				mom.scriptMove(16, 10, 1, 0, false);
				mom.scriptMessage("You don't have to go. Just like I don't have to put a roof over your head and cook special meals for you!");
			}

			if (this.scriptAction == 12) {
				player.go.setFrame(1);
				player.scriptMessage(". . .");
			}

			if (this.scriptAction == 13) {
				mom.scriptMove(15, 10, 1, 0, false, true);
				mom.scriptMessage("Sweetie, is something the matter?");
			}

			if (this.scriptAction == 14) {
				player.go.setFrame(0);
				player.scriptMessage("No, mom.");
			}

			if (this.scriptAction == 15) {
				mom.scriptMessage("Okay. Then I'll see you soon honey.");
			}

			if (this.scriptAction == 16) 
			{
				mom.scriptMove(12, 10, 6, 0, true);
			}
				
			if (this.scriptAction == 17) {
				mom.scriptMove(12, 18, 16, 0, true);
			}

			if (this.scriptAction == 18) {
				//this.scene.sound.play("door_close");
				mom.go.setVisible(false);
				mom.goto(0, 0);
				player.scriptMessage("*Sigh*", 1000);
			}

			if (this.scriptAction == 19) {
				player.scriptOutOfBed();
			}

			if (this.scriptAction == 20) {
				mirrorPlayer.scriptMove(mirrorPlayer.tilePos.x - 1, mirrorPlayer.tilePos.y, 2, 500, false);
				player.scriptMove(player.tilePos.x - 1, player.tilePos.y, 2, 500, true);
			}

			if (this.scriptAction == 21) {
				player.go.setFrame(2);
				mirrorPlayer.go.setFrame(0);
				this.scene.time.addEvent({
					delay: 800,
					callback: () => {
						player.scriptShake();
						mirrorPlayer.scriptShake();
					}
				});

				this.scene.time.addEvent({
					delay: 1500,
					callback: () => {
						player.go.x = 19 * 40 + this.scene.mapManager.currentLayer.x;
						mirrorPlayer.go.x = 19 * 40 + this.scene.mapManager.currentLayer.x;
						this.scene.time.addEvent({
							delay: 400,
							callback: () => {
								player.go.setFrame(0);
								mirrorPlayer.go.setFrame(2);
								this.updateScript();
							}
						});
					}
				});
			}

			if (this.scriptAction == 22) {
				player.scriptMessage([". . ."], 500);
			}

			if (this.scriptAction == 23) {
				player.go.setFrame(2);
				mirrorPlayer.go.setFrame(0);

				player.scriptMessage(["I have to go into town? Looking like this?"], 500);
			}

			if (this.scriptAction == 24) {
				mirrorPlayer.scriptMove(19, 4, 2, 0, false);
				player.scriptMove(19, 5, 2, 0);
			}

			if (this.scriptAction == 25) {
				player.scriptMessage(["I'm gross.", "My chest is all exposed in this thin shirt. My arms too, hairy, like a dog."]);
			}

			if (this.scriptAction == 26) {
				mirrorPlayer.scriptMove(19, 3, 2, 0, false, true);
				player.scriptMove(19, 6, 2, 0, true, true);
			}

			if (this.scriptAction == 27) {
				player.scriptMessage(["And why are these shorts so short? Like I want people to notice how thick my thighs are.", "What a mess."]);
			}

			if (this.scriptAction == 28) {
				mirrorPlayer.scriptMove(19, 4, 2, 0, false);
				player.scriptMove(19, 5, 2, 0);
			}

			if (this.scriptAction == 29) {
				player.scriptMessage(["At least my hair is okay. I don't know what it is about it, but it looks. . .just right.", "If only the clothes could match."]);
			}

			if (this.scriptAction == 30) {
				mirrorPlayer.scriptMove(19, 3, 2, 0, false, true);
				player.scriptMove(19, 6, 2, 0, true, true);
			}

			if (this.scriptAction == 31) {
				player.scriptMessage(["Well, I guess I should get going. No point stalling any longer. Mom's gonna get suspicious again."]);
			}

			if (this.scriptAction == 32) {
				this.scene.time.addEvent({
					delay: 500,
					callback: () => {
						this.scene.state = "play";
						this.scriptAction = -1;
					}
				});
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

				mom.scriptMove(17, 8, 2, 500);
			}

			if (this.scriptAction == 2) {
				mom.scriptMessage("Honey, you were in there a long time.", 0);
			}
		
			if (this.scriptAction == 3) {
				player.scriptMessage(". . .Was I?", 0);
			}

			if (this.scriptAction == 4) {
				mom.scriptMessage("Sweetie, what have I told you? You're perfect the way you are! You shouldn't feel bad.");
			}

			if (this.scriptAction == 5) {
				player.scriptMessage("That's easy for you to say!")
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
				player.scriptMessage("Yeah, I know.");
			}

			if (this.scriptAction == 10) {
				mom.scriptMessage("As long as you know. Now run along, go get those eggs for me.");
			}

			if (this.scriptAction == 11) {
				mom.go.setFrame(2);
				this.scene.time.addEvent({
					delay: 750,
					callback: () => {
						mom.scriptMessage("And sweetie, let's not forget the rhyme.");
					}
				})
			}

			if (this.scriptAction == 12) {
				player.scriptMessage(["I know, mother.", "Ahem."]);
			}

			if (this.scriptAction == 13) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.dynamicText;
				player.scriptMessage(	"From the woods we stay away,\nTo keep the creatures in at bay,\n" +
						 				"They'll rip and tear and bite and slay,\nUntil they reap the light of day.", 0);
			}

			if (this.scriptAction == 14) {
				this.scene.UIScene.dialogueManager.dialogueText = this.scene.UIScene.dialogueManager.staticText;
				mom.scriptMessage("Good. I'll see you when you get back.", 0);
			}

			if (this.scriptAction == 15) {
				mom.scriptMove(17, 7, 2, 0).setCallback("onComplete", () => {
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

		if (this.script == "HitForest" && this.updateScriptAction) {

			let player = this.scene.player;

			if (this.scriptAction == 0) {
				this.scene.cameras.main.stopFollow();
				this.scene.tweens.add({
					targets: this.scene.cameras.main,
					scrollX: this.scene.cameras.main.scrollX + 40 * 7,
					ease: "Quad.easeOut",
					duration: 2700,
					onComplete: () => {
						this.updateScript();
					}
				});
			}

			if (this.scriptAction == 1) {
				player.scriptMessage(["What kind of creatures could be in there? I've never seen anything.", ". . .", "Do I hear . . . music?", "No, I must be hearing things. I should go get those eggs."]);
			}
			
			if (this.scriptAction == 2) {
				this.scene.tweens.add({
					targets: this.scene.cameras.main,
					scrollX: this.scene.cameras.main.scrollX - 40 * 6,
					ease: "Linear",
					duration: 2000,
					onComplete: () => {
						this.scene.cameras.main.startFollow(player.go, true);
						this.scene.state = "play";
						this.scriptAction = -1;
					}
				});
			}
		}

		if (this.script == "HitPassStoreTrigger" && this.updateScriptAction) {
			let player = this.scene.player;

			if (this.scriptAction == 0) {
				player.scriptMessage("Wait, what's that?");
			}

			if (this.scriptAction == 1) {
				player.scriptMove(player.tilePos.x - 2, player.tilePos.y, 2 / 1.5, 200);
			}

			if (this.scriptAction == 2) {
				player.scriptMove(player.tilePos.x, 7, (player.tilePos.y - 7) / 1.5, 0).setCallback("onComplete", () => {
					player.go.setFrame(2);
					this.updateScript();
				}, [], this);
			}

			if (this.scriptAction == 3) {
				player.scriptMessage(["Wow. That outfit looks perfect!", "I want it!"], 0);
			}

			if (this.scriptAction == 4) {
				player.scriptMove(player.tilePos.x - 3, 7, 3 / 1.5, 0);
			}
			
			if (this.scriptAction == 5) {
				player.go.setFrame(2);
				player.scriptMessage("Wait. I can't. Mom will be upset with me.", 500);
			}

			if (this.scriptAction == 6) {
				player.go.setFrame(0);
				player.scriptMessage("I should just get her those eggs.", 300);
			}

			if (this.scriptAction == 7) {
				this.scene.time.addEvent({
					delay: 200,
					callback: () => {
						this.scene.state = "play";
						this.scriptAction = -1;
					}
				});
			}
		}

		if (this.script == "HitGoInStoreTrigger" && this.updateScriptAction) {
			let player = this.scene.player;
			
			if (this.scriptAction == 0) {
				player.scriptMessage(". . .", 1000);
			}

			if (this.scriptAction == 1) {
				player.scriptMove(player.tilePos.x - 2, player.tilePos.y, 2, 0).setCallback("onComplete", () => {
					player.go.setFrame(2);
					this.updateScript();
				}, [], this);
			}

			if (this.scriptAction == 2) {
				player.scriptMove(player.tilePos.x - 3, player.tilePos.y, 3 / 1.5, 1000);
			}

			if (this.scriptAction == 3) {
				player.scriptMove(player.tilePos.x, 6, (player.tilePos.y - 6) / 1.5, 0);
			}

			if (this.scriptAction == 4) {
				this.scene.state = "play";
				this.scriptAction = -1;
				this.scene.scene.switch("StoreScene");
			}
		}

		if (this.script == "ExitStore" && this.updateScriptAction) {
			let player = this.scene.player;

			if (this.scriptAction == 0) {
				player.scriptMove(player.tilePos.x, player.tilePos.y + 1, 1, 300);
			}

			if (this.scriptAction == 1) {
				this.scene.state = "play";
				this.scriptAction = -1;
			}
		}

		if (this.script == "EnterHome" && this.updateScriptAction) {
			let player = this.scene.player;
			let mom = this.scene.mom;

			if (this.scriptAction == 0) {
				this.scene.mapManager.changeMap({Map: "House"});

				mom.goto(17, 7);
				mom.go.setVisible(true);
				mom.go.setFrame(0);

				player.goto(17, 8);
				player.go.setFrame(2);
				this.scene.children.bringToTop(player.go);

				this.scene.time.addEvent({
					delay: 200,
					callback: () => {
						player.scriptMove(player.tilePos.x, player.tilePos.y + 2, 1, 0, true, true);
						mom.scriptMove(mom.tilePos.x, mom.tilePos.y + 1, 0.75, 0, false);
					}
				});
			}

			if (this.scriptAction == 1) {
				mom.scriptMessage("What are you wearing?")
			}
		}

		this.updateScriptAction = false;
	}
}