class StoreScene extends Phaser.Scene {
	constructor() {
		super({key: "StoreScene", active: false});
	}

	init() {

	}

	preload() {



	}

	create() {
		this.GameScene = this.scene.get("TestScene");
		this.cameras.main.setRenderToTexture(this.GameScene.customPipeline);

		this.player = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "player");
		this.player.setScale(3);


		this.topSlots = [];
		this.topSlots.push(this.add.sprite(240, 300, "clothing", 2));
		this.topSlots.push(this.add.sprite(720, 300, "clothing", 1));
		this.topSlots[0].frameIndex = 2;
		this.topSlots[1].frameIndex = 1;
		this.topSlots.forEach(slot => slot.setScale(3));

		this.bottomSlots = [];
		this.bottomSlots.push(this.add.sprite(240, 500, "clothing", 5));
		this.bottomSlots.push(this.add.sprite(720, 500, "clothing", 4));
		this.bottomSlots[0].frameIndex = 5;
		this.bottomSlots[1].frameIndex = 4;
		this.bottomSlots.forEach(slot => slot.setScale(3));

		this.white = this.add.sprite(0, 0, "white");
		this.white.setOrigin(0, 0);
		this.white.setScale(10);
		this.children.sendToBack(this.white);

		this.cursor = this.add.sprite(0, 300, "cursor");
		this.cursor.setOrigin(0, 0.5);
		this.cursor.clothingType = "top";
		
		this.frame = 0;


		this.controls = this.input.keyboard.createCursorKeys();
		this.controls.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.controls.up) || Phaser.Input.Keyboard.JustDown(this.controls.down)) {
			this.cursor.clothingType = this.cursor.clothingType == "top" ? "bottom" : "top";
			this.cursor.y = this.cursor.clothingType == "top" ? 300 : 500;
		}

		if (Phaser.Input.Keyboard.JustDown(this.controls.left)) {
			if (this.cursor.clothingType == "top") {
				this.frame = this.frame - 3 >= 0 ? this.frame - 3 : 9 + (this.frame - 3);
				this.player.setFrame(this.frame);
				this.topSlots.forEach(slot => {
					slot.frameIndex = --slot.frameIndex < 0 ? 2 : slot.frameIndex;
					slot.setFrame(slot.frameIndex);
				});
			}

			if (this.cursor.clothingType == "bottom") {
				let cycleHit = Math.floor(this.frame / 3) * 3 - 1;
				this.frame = this.frame - 1 == cycleHit ? cycleHit + 3 : this.frame - 1;
				this.player.setFrame(this.frame);
				this.bottomSlots.forEach(slot => {
					slot.frameIndex = --slot.frameIndex < 3 ? 5 : slot.frameIndex;
					slot.setFrame(slot.frameIndex);
				});
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.controls.right)) {
			if (this.cursor.clothingType == "top") {
				this.frame = (this.frame + 3) % 9;
				this.player.setFrame(this.frame);
				this.topSlots.forEach(slot => {
					slot.frameIndex = ++slot.frameIndex > 2 ? 0 : slot.frameIndex;
					slot.setFrame(slot.frameIndex);
				});
			}
			if (this.cursor.clothingType == "bottom") {
				let cycleHit = (Math.floor(this.frame / 3) + 1) * 3;
				this.frame = this.frame + 1 == cycleHit ? cycleHit - 3 : this.frame + 1;
				this.player.setFrame(this.frame);
				this.bottomSlots.forEach(slot => {
					slot.frameIndex = ++slot.frameIndex > 5 ? 3 : slot.frameIndex;
					slot.setFrame(slot.frameIndex);
				});
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.controls.enter)) {
			if (this.frame != 0) {
				this.scene.switch("TestScene");
				this.GameScene.state = "script";
				this.GameScene.scriptManager.script = "ExitStore";
				this.GameScene.scriptManager.updateScript();
			}
		}

	}
}