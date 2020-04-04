class Mom extends Player {
	constructor(scene) {
		super(scene);
	}

	// Handles scripting of the character's behavior
	// Overrides Player Class
	playScript(script) {
		if (script == "Intro" && this.updateScriptAction) {
			this.updateScriptAction = false;

			if (this.scriptAction == 0)
			{
				this.tilePos.x = 15;
				this.tilePos.y = 17;
				this.go.x = this.tileToWorldPos(this.tilePos.x, this.tilePos.y).x;
				this.go.y = this.tileToWorldPos(this.tilePos.x, this.tilePos.y).y;

				this.scriptMove(15, 14, 500, 0);
			}
			if (this.scriptAction == 1) this.scriptMessage("Alex, it's time to wake up!", 0);
			if (this.scriptAction == 2) this.scriptMove(15, 11, 500, 0);
			if (this.scriptAction == 3) this.scriptMove(18, 11, 500, 0);
			if (this.scriptAction == 4) this.scriptMessage("Come on, wake up!", 0); 
			if (this.scriptAction == 5) this.scene.player.updateScript();
		}
	}
}