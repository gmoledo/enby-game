class TestScene extends Phaser.Scene {
	constructor() {
		super("TestScene");

		// States for changing game behavior
		this.states = ["gameplay", "edit"];
		this.stateIndex = 0;
		this.state = this.states[this.stateIndex];
	}

	preload() {
		this.load.image("player", "assets/player.png");
		this.load.image("tiles", "TestTileset.png");
		this.load.tilemapTiledJSON("map", "TestMap.json");
	}

	create() {
		// Class for handling input related logic
		this.inputManager = new InputManager(this, ["esc", "w", "a", "s", "d"]);

		// Class for handling physics related logic (might not be necessary)
		this.physicsManager = new PhysicsManager(this);

		// Class for handling tilemap and grid-related structures and logic
		this.grid = new Grid(this);

		// Player Class
		this.player = new Player(this);

		// Camera Class
		this.camera = new Camera(this);
	}

	update(time, delta) {
		var dt = delta / 1000;

		this.state = this.states[this.stateIndex];

		this.player.update(dt);

		this.camera.update(dt);
	}
}