let oscillate = 0;

const regulatePerks = () => {
    let perk_geo = new THREE.SphereGeometry(.1, 6, 6);
    if (healthPerks.length < 7) {
        let health_mat = new THREE.MeshBasicMaterial({
                color: 0xe04a4a
            }),
            healthMesh = new THREE.Mesh(perk_geo, health_mat);
        healthMesh.position.set((Math.random() * arenaSize) - (arenaSize / 2), .05, (Math.random() * arenaSize) - (arenaSize / 2));
        scene.add(healthMesh);
        healthPerks.push(healthMesh);
    }
    if (staminaPerks.length < 7) {
        let stamina_mat = new THREE.MeshBasicMaterial({
                color: 0x4e7fdd
            }),
            staminaMesh = new THREE.Mesh(perk_geo, stamina_mat);
        staminaMesh.position.set((Math.random() * arenaSize) - (arenaSize / 2), .05, (Math.random() * arenaSize) - (arenaSize / 2));
        scene.add(staminaMesh);
        staminaPerks.push(staminaMesh);
    }
    if (ammoPerks.length < 7) {
        let ammo_mat = new THREE.MeshBasicMaterial({
                color: 0xffffff
            }),
            ammoMesh = new THREE.Mesh(perk_geo, ammo_mat);
        ammoMesh.position.set((Math.random() * arenaSize) - (arenaSize / 2), .05, (Math.random() * arenaSize) - (arenaSize / 2));
        scene.add(ammoMesh);
        ammoPerks.push(ammoMesh);
    }
    pickPerks();
}

const oscillatePerks = () => {
    let pX = player.mesh.position.x,
        pZ = player.mesh.position.z,
        gap = .6;
    for (let i in healthPerks) {
        let perkX = healthPerks[i].position.x,
            perkZ = healthPerks[i].position.z,
            collide = (pX - perkX < gap && pX - perkX > -gap) && (pZ - perkZ < gap && pZ - perkZ > -gap);
        healthPerks[i].position.y = (Math.sin(oscillate) / 4) + .4;
        collide ? pickPerk(i, healthPerks, 'health') : 0;
    }
    for (let i in staminaPerks) {
        let perkX = staminaPerks[i].position.x,
            perkZ = staminaPerks[i].position.z,
            collide = (pX - perkX < gap && pX - perkX > -gap) && (pZ - perkZ < gap && pZ - perkZ > -gap);
        staminaPerks[i].position.y = (Math.sin(oscillate) / 4) + .4;
        collide ? pickPerk(i, staminaPerks, 'stamina') : 0;
    }
    for (let i in ammoPerks) {
        let perkX = ammoPerks[i].position.x,
            perkZ = ammoPerks[i].position.z,
            collide = (pX - perkX < gap && pX - perkX > -gap) && (pZ - perkZ < gap && pZ - perkZ > -gap);
        ammoPerks[i].position.y = (Math.sin(oscillate) / 4) + .4;
        collide ? pickPerk(i, ammoPerks, 'ammo') : 0;
    }
    oscillate += .08;
}

const pickPerks = (i, arr, type) => {
    if (type == 'health') {
        //
    } else if (type == 'stamina') {
        //
    } else {
        //
    }
    arr.splice(i, 1);
}
