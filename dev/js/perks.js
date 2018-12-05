let oscillate = 0;

const regulatePerks = () => {
    let perk_geo = new THREE.SphereGeometry(.1, 6, 6),
        perkMesh;
    if (healthPerks.length < 3) {
        let health_mat = new THREE.MeshBasicMaterial({
            color: 0xe04a4a
        });
        perkMesh = new THREE.Mesh(perk_geo, health_mat);
        perkMesh.position.set((Math.random() * arenaSize) - (arenaSize / 2), .05, (Math.random() * arenaSize) - (arenaSize / 2));
        scene.add(perkMesh);
        healthPerks.push(perkMesh);
    }
    if (staminaPerks.length < 3) {
        let stamina_mat = new THREE.MeshBasicMaterial({
            color: 0x4e7fdd
        });
        perkMesh = new THREE.Mesh(perk_geo, stamina_mat);
        perkMesh.position.set((Math.random() * arenaSize) - (arenaSize / 2), .05, (Math.random() * arenaSize) - (arenaSize / 2));
        scene.add(perkMesh);
        healthPerks.push(perkMesh);
    }
    if (ammoPerks.length < 3) {
        let ammo_mat = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        perkMesh = new THREE.Mesh(perk_geo, ammo_mat);
        perkMesh.position.set((Math.random() * arenaSize) - (arenaSize / 2), .05, (Math.random() * arenaSize) - (arenaSize / 2));
        scene.add(perkMesh);
        healthPerks.push(perkMesh);
    }
}

const oscillatePerks = () => {
    for (let i in healthPerks) {
        healthPerks[i].position.y = Math.sin(oscillate) + .05;
    }
    oscillate += .1;
    if (oscillate >= 10) {
        oscillate = 0;
    }
}
