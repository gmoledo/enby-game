class Grid {
	constructor(scene) {
		this.scene = scene;

		this.map = this.scene.make.tilemap({ key: "map" });
		this.tiles = this.map.addTilesetImage("Tiled_TestTileset", "tiles");
		this.layer = this.map.createStaticLayer(0, this.tiles, -160, 0);

		this.grid = new Array(this.map.width);

		for (let i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(this.map.height);
		}

		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				this.grid[i][j] = new Phaser.Math.Vector2(i, j);
			}
		}
	}
}