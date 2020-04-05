class MapManager {
	constructor(scene) {
		this.scene = scene;

		// Tilemaps
		this.houseMap = this.scene.make.tilemap({ key: "houseMap" });
		this.houseTiles = this.houseMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.houseLayer = this.houseMap.createStaticLayer(0, this.houseTiles, 0, 0);

		this.townMap = this.scene.make.tilemap({ key: "townMap" });
		this.townTiles = this.townMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.townLayer = this.townMap.createStaticLayer(0, this.townTiles, -5000, 0);

		this.forestMap = this.scene.make.tilemap({ key: "forestMap" });
		this.forestTiles = this.forestMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.forestLayer = this.forestMap.createStaticLayer(0, this.forestTiles, 5000, 0);

		this.roomMap = this.scene.make.tilemap({ key: "roomMap" });
		this.roomTiles = this.roomMap.addTilesetImage("Tiled_Tileset", "tiles", 40, 40, 1, 2);
		this.roomLayer = this.roomMap.createStaticLayer(0, this.roomTiles, 0, -5000);


		// Member Variables
		this.currentMap;
		this.currentLayer;
		this.setCurrentMap(this.roomMap);

		// Array of arrays representing collision grid
		this.grid = new Array(this.currentMap.width);
		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(this.currentMap.height);
		}

		// Populate grid with collision property of tiles
		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				this.grid[j][i] = this.currentMap.getTileAt(i, j).properties.Collision ? 1 : 0;
			}
		}
	}

	// Sets both current map and the current layer based on that map
	setCurrentMap(currentMap) {
		this.currentMap = currentMap;

		if (this.currentMap == this.houseMap) {
			this.currentLayer = this.houseLayer;
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
		// Sets map depending on tile map property
		if (tileProperties.Map == "Town") {
			this.setCurrentMap(this.townMap);
		}
		if (tileProperties.Map == "House") {
			this.setCurrentMap(this.houseMap);
		}
		if (tileProperties.Map == "Forest") {
			this.setCurrentMap(this.forestMap);
		}
		if (tileProperties.Map == "Room") {
			this.setCurrentMap(this.roomMap);
		}

		// Sets players tile position based on the direction they left the map
		if (tileProperties.Direction == "Left") {
			this.scene.player.tilePos.x = this.currentMap.width - 1;
		}
		if (tileProperties.Direction == "Right") {
			this.scene.player.tilePos.x = 0;
		}
		if (tileProperties.Direction == "Up") {
			this.scene.player.tilePos.y = this.currentMap.height - 1;
		}
		if (tileProperties.Direction == "Down") {
			this.scene.player.tilePos.y = 0;
		}

		// If tile has a teleport property, set player tile position based on it
		// May override default direction-based tile position
		if(tileProperties.TeleportX) {
			this.scene.player.tilePos.x = tileProperties.TeleportX;
		}
		if (tileProperties.TeleportY) {
			this.scene.player.tilePos.y = tileProperties.TeleportY;
		}

		// Set player's world position
		this.scene.player.go.x = this.scene.player.tileToWorldPos(this.scene.player.tilePos.x, this.scene.player.tilePos.y).x;
		this.scene.player.go.y = this.scene.player.tileToWorldPos(this.scene.player.tilePos.x, this.scene.player.tilePos.y).y;

		// Set camera bounds based on new map
		this.scene.camera.resetBounds();
	}
}