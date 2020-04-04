class TestScene extends Phaser.Scene {
	constructor() {
		super({key: "TestScene", active: true});

		// States for changing game behavior
		this.states = ["play", "pause", "script"];
		this.stateIndex = 2;
		this.state = this.states[this.stateIndex];
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
						    
						    vec4 white = vec4(0.8, 0.8, 0.8, 1.0);
						    vec4 black = vec4(0.05, 0.05, 0.05, 1.0);
						    
							float average = (pixel.r + pixel.g + pixel.b) / 3.0;
						    
						    if (average >= 0.1)
						    {
						        pixel = black;
						    }
						    else {
						        pixel = white;
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

		this.load.image("tiles", "Tileset.png");
		this.load.tilemapTiledJSON("houseMap", "HouseMap.json");
		this.load.tilemapTiledJSON("townMap", "TownMap.json");
		this.load.tilemapTiledJSON("forestMap", "ForestMap.json");
		this.load.tilemapTiledJSON("roomMap", "RoomMap.json")

	}

	create() {
		// Class for handling physics related logic (might not be necessary)
		this.physicsManager = new PhysicsManager(this);

		// Class for handling tilemap and grid-related structures and logic
		this.mapManager = new MapManager(this);

		this.eggs = [];
		this.eggs.push(new Egg(this, 4, 4));
		this.eggs.push(new Egg(this, 20, 10));
		
		// Player Class
		this.player = new Player(this);

		this.mom = new Mom(this);

		// Camera Class
		this.camera = new Camera(this);

		this.customPipeline = game.renderer.addPipeline("BlackAndWhite", new this.BlackWhitePipeline(game));
		this.cameras.main.setRenderToTexture(this.customPipeline);


		// Optional intro sequence for demonstration purposes
		this.state = "script";
		this.mom.scriptAction = 0;
		this.mom.updateScriptAction = true;
	}

	update(time, delta) {
		let dt = delta / 1000;

		this.inputManager.update(dt);

		if (this.state == "play") {
			this.player.update(dt);

			this.camera.update(dt);
		}

		if (this.state == "script") {
			this.player.playScript("Intro");
			this.mom.playScript("Intro");
		}
	}
}