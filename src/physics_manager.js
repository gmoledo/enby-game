class PhysicsManager {
	constructor(scene) {
		this.scene = scene;

		this.dynamicBodies = this.scene.physics.add.group();
		this.staticBodies = this.scene.physics.add.staticGroup();

		this.scene.physics.add.collider(this.dynamicBodies, this.staticBodies, this.onSDCollision);
	}

	addToGroup(go, group) {
		this.scene.physics.add.existing(go, group == "static");
		if (group == "dynamic") {
			this.dynamicBodies.add(go);
		}
		if (group == "static") {
			this.staticBodies.add(go);
		}
	}
}