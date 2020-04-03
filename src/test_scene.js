class TestScene extends Phaser.Scene {
	constructor() {
		super({key: "TestScene", active: true});

		// States for changing game behavior
		this.states = ["play", "pause", "script"];
		this.stateIndex = 0;
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
						    
						    vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
						    vec4 black = vec4(0.0, 0.0, 0, 1.0);
						    
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
		this.inputManager = new InputManager(this, ["esc", "w", "a", "s", "d", "enter"]);
	}

	preload() {
		this.load.image("player", "assets/player.png");
		this.load.image("egg", "assets/egg.png");

		this.load.image("tiles", "Tileset.png");
		this.load.tilemapTiledJSON("map", "Map.json");
		this.load.tilemapTiledJSON("townMap", "TownMap.json");
		this.load.tilemapTiledJSON("forestMap", "forestMap.json");

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

		this.customPipeline = game.renderer.addPipeline("BlackAndWhite", new this.BlackWhitePipeline(game));
		this.cameras.main.setRenderToTexture(this.customPipeline);

		this.eggs = [];
		this.eggs.push(new Egg(this, 4, 4));
		this.eggs.push(new Egg(this, 20, 10));
	}

	update(time, delta) {
		let dt = delta / 1000;

		if (this.state == "play") {
			this.player.update(dt);

			this.camera.update(dt);
		}
	}
}