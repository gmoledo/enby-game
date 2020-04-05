class TestScene extends Phaser.Scene {
	constructor() {
		super({key: "TestScene", active: true});

		// States for changing game behavior
		this.states = ["play", "pause", "script"];
		this.stateIndex = 2;
		this.state = this.states[this.stateIndex];

		this.sceneLoaded = false;
		this.gameStarted = false;
	}

	init() {
		this.BlackWhitePipeline = new Phaser.Class({
			Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

			initialize:

			function BlackWhitePipeline(game) {
				Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
					game: game,
					renderer: game.renderer,
					fragShader: `
						precision mediump float;

						uniform vec2 resolution;
						uniform sampler2D uMainSampler;

						varying vec2 outTexCoord;

						void main()
						{
							vec4 pixel = texture2D(uMainSampler, outTexCoord);
						    
						    vec3 white = vec3(0.9, 0.9, 0.9);
						    vec3 black = vec3(0.05, 0.05, 0.05);
						    
							float average = (pixel.r + pixel.g + pixel.b) / 3.0;
						    
						    if (average >= 0.1)
						    {
						        pixel = vec4(black, pixel.a);
						    }
						    else {
						        pixel = vec4(white, pixel.a);
						    }


						    gl_FragColor = pixel;
						}
					`
				});
			}
		});

		// Class for handling input related logic
		this.inputManager = new InputManager(this, ["esc", "w", "a", "s", "d", "enter", "f", "q"]);
	}

	preload() {
		this.load.spritesheet("playerBase", "assets/player_base.png", { frameWidth: 40, frameHeight: 80 });
		this.load.spritesheet("playerJacket", "assets/player_jacket.png", { frameWidth: 40, frameHeight: 80 });
		this.load.image("egg", "assets/egg.png");

		this.load.image("tiles", "Tiled_data/Tileset.png");
		this.load.tilemapTiledJSON("houseMap", "Tiled_data/HouseMap.json");
		this.load.tilemapTiledJSON("townMap", "Tiled_data/TownMap.json");
		this.load.tilemapTiledJSON("forestMap", "Tiled_data/ForestMap.json");
		this.load.tilemapTiledJSON("roomMap", "Tiled_data/RoomMap.json")

	}

	create() {
		// UI Scene
		this.UIScene = this.scene.get("UIScene");
		
		// Class for handling physics related logic (might not be necessary)
		this.physicsManager = new PhysicsManager(this);

		// Class for handling tilemap and grid-related structures and logic
		this.mapManager = new MapManager(this);

		this.scriptManager = new ScriptManager(this);

		this.eggs = [];
		this.eggs.push(new Egg(this, 4, 4));
		this.eggs.push(new Egg(this, 20, 10));
		
		// Player Class
		this.player = new Player(this);

		this.mom = new Mom(this);

		// Camera Class
		this.camera = new Camera(this);

		this.customPipeline = this.game.renderer.addPipeline("BlackAndWhite", new this.BlackWhitePipeline(this.game));
		this.cameras.main.setRenderToTexture(this.customPipeline);


		// Optional intro sequence for demonstration purposes
		this.state = "script";
		this.sceneLoaded = true;
	}

	update(time, delta) {
		if (!this.gameStarted && this.sceneLoaded && this.UIScene.sceneLoaded) {
			this.startGame();
			this.gameStarted = true;
		}

		let dt = delta / 1000;

		this.inputManager.update(dt);

		if (this.state == "play") {
			this.player.update(dt);
		}

		if (this.state == "script") {
			this.scriptManager.update();
		}

		this.camera.update(dt);
	}

	startGame() {
		this.scriptManager.script = "Intro";
		this.scriptManager.updateScript();
	}
}