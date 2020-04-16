class Mom extends Player {
	constructor(scene) {
		super(scene);

		this.name = "Mom";

		this.go.setTexture("momBase");

		this.frameRate = 6;
		var walkDownConfig = {
			key: "walkDownMom",
			frames: this.scene.anims.generateFrameNumbers("momBase", {frames: [4, 8, 12, 0]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		var walkUpConfig = {
			key: "walkUpMom",
			frames: this.scene.anims.generateFrameNumbers("momBase", {frames: [6, 10, 14, 2]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		var walkLeftConfig = {
			key: "walkLeftMom",
			frames: this.scene.anims.generateFrameNumbers("momBase", {frames: [5, 9, 13, 1]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		var walkRightConfig = {
			key: "walkRightMom",
			frames: this.scene.anims.generateFrameNumbers("momBase", {frames: [7, 11, 15, 3]}),
			frameRate: this.frameRate,
			repeat: -1
		}
		this.walkDownAnim = this.scene.anims.create(walkDownConfig);
		this.walkUpAnim = this.scene.anims.create(walkUpConfig);
		this.walkLeftAnim = this.scene.anims.create(walkLeftConfig);
		this.walkRightAnim = this.scene.anims.create(walkRightConfig);

		this.go.anims.load("walkDownMom");
		this.go.anims.load("walkLeftMom");
		this.go.anims.load("walkRightMom");
		this.go.anims.load("walkUpMom");
	}
}