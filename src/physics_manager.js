class PhysicsManager {
	constructor(scene) {
		this.scene = scene;

		// Containers for potential dynamic or static bodies
		this.dynamicBodies = this.scene.physics.add.group();
		this.staticBodies = this.scene.physics.add.staticGroup();

		// Setup collision between dynamic and static bodies
		this.scene.physics.add.collider(this.dynamicBodies, this.staticBodies, this.onSDCollision);
	}

	addToGroup(go, group) {
		// Add game object to static or dynamic group
		this.scene.physics.add.existing(go, group == "static");
		if (group == "dynamic") {
			this.dynamicBodies.add(go);
		}
		if (group == "static") {
			this.staticBodies.add(go);
		}
	}
}