class Grid {
	constructor(scene) {
		this.scene = scene;

		// Tilemap setup
		this.map = this.scene.make.tilemap({ key: "map" });
		this.tiles = this.map.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);

		this.townMap = this.scene.make.tilemap({ key: "townMap" });
		this.townTiles = this.townMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.townLayer = this.townMap.createStaticLayer(0, this.tiles, -2000, 0);

		this.forestMap = this.scene.make.tilemap({ key: "forestMap" });
		this.forestTiles = this.forestMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.forestLayer = this.forestMap.createStaticLayer(0, this.tiles, 2000, 0);

		this.roomMap = this.scene.make.tilemap({ key: "roomMap" });
		this.roomTiles = this.roomMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.roomLayer = this.roomMap.createStaticLayer(0, this.tiles, 0, -1000);

		this.maps = [this.map, this.townMap];
		this.currentMap = this.map;



		// Array of arrays representing grid
		this.data = new Array(this.map.width);
		for (let i = 0; i < this.data.length; i++) {
			this.data[i] = new Array(this.map.height);
		}

		// Populate grid with placeholder values
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				this.data[i][j] = new Phaser.Math.Vector2(i, j);
			}
		}
	}

	setCurrentMap(currentMap) {
		this.currentMap = currentMap;

		if (this.currentMap == this.map) {
			this.currentLayer = this.layer;
		}
		if (this.currentMap == this.townMap) {
			this.currentLayer = this.townLayer;
		}
		if (this.currentMap == this.forestMap) {
			this.currentLayer = this.forestLayer;
		}
		if (this.currentMap == this.roomMap) {
			this.currentLayer = this.roomLayer;
		}

	}

	changeMap(tileProperties) {
		if (tileProperties.Map == "Town") {
			this.setCurrentMap(this.townMap);
		}
		if (tileProperties.Map == "House") {
			this.setCurrentMap(this.map);
		}
		if (tileProperties.Map == "Forest") {
			this.setCurrentMap(this.forestMap);
		}
		if (tileProperties.Map == "Room") {
			this.setCurrentMap(this.roomMap);
		}

		if (tileProperties.Direction == "Left") {
			this.scene.player.tilePos.x = this.currentMap.width - 1;
		}
		if (tileProperties.Direction == "Right") {
			this.scene.player.tilePos.x = 0;
		}

		if (tileProperties.Direction == "Up") {
			this.scene.player.tilePos.y = this.currentMap.height - 1;
		}

		if (tileProperties.TeleportY) {
			this.scene.player.tilePos.y = tileProperties.TeleportY;
		}

		this.scene.player.go.x = this.scene.player.tilePos.x * this.currentMap.tileWidth + this.currentLayer.x;
		this.scene.player.go.y = this.scene.player.tilePos.y * this.currentMap.tileHeight + this.currentLayer.y;

		this.scene.camera.go.setBounds(this.currentLayer.x + 40, this.currentLayer.y, this.currentLayer.width - 80, this.currentLayer.height);
	}
}