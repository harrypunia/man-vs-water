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
        collide ? pickPerks(i, 'health') : 0;
    }
    for (let i in staminaPerks) {
        let perkX = staminaPerks[i].position.x,
            perkZ = staminaPerks[i].position.z,
            collide = (pX - perkX < gap && pX - perkX > -gap) && (pZ - perkZ < gap && pZ - perkZ > -gap);
        staminaPerks[i].position.y = (Math.sin(oscillate) / 4) + .4;
        collide ? pickPerks(i, 'stamina') : 0;
    }
    for (let i in ammoPerks) {
        let perkX = ammoPerks[i].position.x,
            perkZ = ammoPerks[i].position.z,
            collide = (pX - perkX < gap && pX - perkX > -gap) && (pZ - perkZ < gap && pZ - perkZ > -gap);
        ammoPerks[i].position.y = (Math.sin(oscillate) / 4) + .4;
        collide ? pickPerks(i, 'ammo') : 0;
    }
    oscillate += .08;
}

const pickPerks = (i, type) => {
    if (type == 'health') {
        if (controls.health < stats.health) {
            if (controls.health < stats.health - 10) {
                controls.health += 10;
                if (controls.health / stats.health > .4) {
                    document.getElementsByClassName('damage')[0].style.opacity = 0;
                }
            } else {
                controls.health = stats.health;
            }
            updateHealth();
            scene.remove(healthPerks[i])
            healthPerks.splice(i, 1);
        }
    } else if (type == 'stamina') {
        if (controls.stamina < 100) {
            if (controls.stamina < 90) {
                controls.stamina += 10;
            } else {
                controls.stamina = 100;
            }
            scene.remove(staminaPerks[i])
            staminaPerks.splice(i, 1);
        }
    } else if (type == 'ammo') {
        if (stats.totalBullets < stats.maxBullets) {
            if (stats.totalBullets < stats.maxBullets - 5) {
                stats.totalBullets += 5;
            } else {
                stats.totalBullets = stats.maxBullets;
            }
            bulletCountDisplay.innerHTML = gun.bulletCount + 1 + ' /' + stats.totalBullets;
            scene.remove(ammoPerks[i])
            ammoPerks.splice(i, 1);
        }
    }
}
