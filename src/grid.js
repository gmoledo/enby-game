class Grid {
	constructor(scene) {
		this.scene = scene;

		// Tilemap setup
		this.map = this.scene.make.tilemap({ key: "map" });
		this.tiles = this.map.addTilesetImage("Tiled_TestTileset", "tiles", 20, 20, 1, 2);
		this.layer = this.map.createStaticLayer(0, this.tiles, -160, 0);

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
}