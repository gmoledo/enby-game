class TestScene extends Phaser.Scene {
	constructor() {
		super("TestScene");
		this.states = ["gameplay", "edit"];
		this.stateIndex = 0;
		this.state = this.states[this.stateIndex];
	}

	preload() {
		this.load.image("player", "assets/player.png");
	}

	create() {
		this.inputManager = new InputManager(this, ["esc"]);

		this.physicsManager = new PhysicsManager(this);

		this.player = new Player(this);

		this.camera = new Camera(this);
	}

	update(time, delta) {
		var dt = delta / 1000;

		this.state = this.states[this.stateIndex];

		this.player.update(dt);

		this.camera.update(dt);
	}
}