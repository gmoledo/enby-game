class TestScene extends Phaser.Scene {
	constructor() {
		super({key: "TestScene", active: true});

		// States for changing game behavior
		this.states = ["play", "pause"];
		this.stateIndex = 0;
		this.state = this.states[this.stateIndex];
	}

	init() {
		// Class for handling input related logic
		this.inputManager = new InputManager(this, ["esc", "w", "a", "s", "d", "enter"]);
	}

	preload() {
		this.load.image("player", "assets/player.png");
		this.load.image("egg", "assets/egg.png");

		this.load.image("tiles", "TestTileset.png");
		this.load.tilemapTiledJSON("map", "TestMap.json");
	}

	create() {
		// Class for handling physics related logic (might not be necessary)
		this.physicsManager = new PhysicsManager(this);

		// Class for handling tilemap and grid-related structures and logic
		this.grid = new Grid(this);

		// Player Class
		this.player = new Player(this);

		// Camera Class
		this.camera = new Camera(this);

		this.eggs = [];
		this.eggs.push(new Egg(this, 2, 2));
		this.eggs.push(new Egg(this, 40, 10));
	}

	update(time, delta) {
		let dt = delta / 1000;

		if (this.state == "play") {
			this.player.update(dt);

			this.camera.update(dt);
		}
	}
}