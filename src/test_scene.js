class TestScene extends Phaser.Scene {
	constructor() {
		super({key: "TestScene", active: false});

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
		this.customPipeline = this.game.renderer.addPipeline("BlackAndWhite", new this.BlackWhitePipeline(this.game));
		

		// Class for handling input related logic
		this.inputManager = new InputManager(this, ["esc", "w", "a", "s", "d", "enter", "f", "q"]);
	}

	preload() {
		this.load.spritesheet("playerBase", "assets/player_base.png", { frameWidth: 40, frameHeight: 80 });
		this.load.spritesheet("playerJacket", "assets/player_jacket.png", { frameWidth: 40, frameHeight: 80 });
		this.load.spritesheet("momBase", "assets/mom_base.png", { frameWidth: 40, frameHeight: 80} );
		this.load.image("egg", "assets/egg.png");

		this.load.image("trigger", "assets/trigger.png");
		this.load.image("white", "assets/white.png");
		this.load.image("mirror", "assets/mirror.png");
		this.load.image("bed", "assets/bed.png");
		this.load.image("blanket", "assets/blanket.png");

		this.load.image("jacket", "assets/jacket.png");
		this.load.image("pants", "assets/pants.png");
		this.load.image("skirt", "assets/skirt.png");
		this.load.image("cardigan", "assets/cardigan.png");

		this.load.image("tiles", "Tiled_data/Tileset.png");
		this.load.tilemapTiledJSON("houseMap", "Tiled_data/HouseMap.json");
		this.load.tilemapTiledJSON("townMap", "Tiled_data/TownMap.json");
		this.load.tilemapTiledJSON("forestMap", "Tiled_data/ForestMap.json");
		this.load.tilemapTiledJSON("roomMap", "Tiled_data/RoomMap.json")
		this.load.tilemapTiledJSON("havenMap", "Tiled_data/HavenMap.json");

		this.load.spritesheet("player", "assets/player_options.png", {frameWidth: 40, frameHeight: 80});
		this.load.spritesheet("clothing", "assets/clothing_options.png", {frameWidth: 40, frameHeight: 40});
		this.load.image("cursor", "assets/cursor.png");

		this.load.audio("door_knock", "assets/audio/Door_Knock.ogg");
		this.load.audio("door_open", "assets/audio/Door_Open.ogg");
		this.load.audio("door_close", "assets/audio/Door_Close.ogg");
		this.load.audio("music_box_intro", "assets/audio/Music Box.mp3");
		this.load.audio("music_box_main", "assets/audio/Music_Box.mp3");
	}

	create() {
		// UI Scene
		this.UIScene = this.scene.get("UIScene");
		
		// Class for handling physics related logic (might not be necessary)
		this.physicsManager = new PhysicsManager(this);

		this.scriptManager = new ScriptManager(this);

		this.mapManager = new MapManager(this);




		this.mirrorTrigger = new Trigger(this, "mirrorTrigger", 12, 15);
		
		this.eggs = [];
		this.eggs.push(new Trigger(this, "egg", 23, 11));
		this.eggs.push(new Trigger(this, "egg", 17, 14));
		this.eggs.push(new Trigger(this, "egg", 11, 10));
		this.eggs.push(new Trigger(this, "egg", 3, 14));
		this.eggs.push(new Trigger(this, "egg", 3, 6));
		this.eggs.push(new Trigger(this, "egg", 13, 4));
		this.eggs.push(new Trigger(this, "egg", 3, 2));

		this.forestBounds = [];
		for (let i = 0; i < this.mapManager.houseMap.height; i++) {
			this.forestBounds.push(new Trigger(this, "forestBound", 32, i));
		}

		this.door = new Trigger(this, "door", 17, 7);

		this.storeTriggers = [];
		for (let i = 0; i < this.mapManager.houseMap.height - 7; i++) {
			this.storeTriggers.push(new Trigger(this, "storeTrigger", 49, i + 7));
		}





		this.jacket = this.add.sprite(	46.5 * 40 + this.mapManager.townLayer.x,
										4.72 * 40 + this.mapManager.townLayer.y,
										"jacket");
		this.pants = this.add.sprite(	46.5 * 40 + this.mapManager.townLayer.x,
										5.4 * 40 + this.mapManager.townLayer.y,
										"pants");

		this.cardigan = this.add.sprite(48.5 * 40 + this.mapManager.townLayer.x,
										4.9 * 40 + this.mapManager.townLayer.y,
										"cardigan");		
		this.skirt = this.add.sprite( 	48.5 * 40 + this.mapManager.townLayer.x,
										5.4 * 40 + this.mapManager.townLayer.y,
										"skirt");


		this.mirror = this.add.sprite(	19 * this.mapManager.roomMap.tileWidth + this.mapManager.roomLayer.x,
										5 * this.mapManager.roomMap.tileHeight + this.mapManager.roomLayer.y,
										"mirror");
		this.mirror.setOrigin(0, 1);

		this.bed = this.add.sprite( 21 * 40 + this.mapManager.roomLayer.x,
									4 * 40 + this.mapManager.roomLayer.y,
									"bed");
		this.bed.setOrigin(0, 0);


		// Player Class
		this.player = new Player(this);

		this.mom = new Mom(this);


		this.blanket = this.add.sprite( 21 * 40 + this.mapManager.roomLayer.x,
										4 * 40 + this.mapManager.roomLayer.y,
										"blanket");
		this.blanket.setOrigin(0, 0);


		// Camera Class
		this.camera = new Camera(this);

		this.cameras.main.setRenderToTexture(this.customPipeline);



		this.mirrorPlayer = new MirrorPlayer(this);
		this.mirrorPlayer.goto(20, 2);
		this.children.sendToBack(this.mirrorPlayer.go);

		this.white = this.add.sprite(0, 0, "white");
		this.white.setVisible(true);
		this.white.setOrigin(0.5, 0.5);
		this.white.setScale(200);
		this.children.sendToBack(this.white);

		// Optional intro sequence for demonstration purposes
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
			let playerUpdated = this.player.update(dt)
			if (this.mapManager.currentMap == this.mapManager.roomMap && this.state == "play") {
				this.mirrorPlayer.update(dt, playerUpdated);
			}
		}

		if (this.state == "script") {
			this.scriptManager.update();
		}
	}

	startGame() {
		// this.state = "play";
		// this.mapManager.changeMap({Map: "Town"});
		// this.player.goto(45, 11);
		// this.player.passStoreFlag = true;

		this.state = "script";
		this.scriptManager.script = "Intro";
		this.scriptManager.updateScript();
	}
}