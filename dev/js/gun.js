var Gun = function (bulletSize, magazineSize, bulletSpeed, totalBullets) {
    var bullet_geo = new THREE.SphereGeometry(bulletSize, 10, 10),
        bullet_mat = new THREE.MeshBasicMaterial({
            color: 0xffffff
        }),
        bullet = new THREE.Mesh(bullet_geo, bullet_mat),
        bulletCount = magazineSize - 1;

    this.totalBullets = totalBullets;
    this.reloadStatus = false;
    this.bulletHeight = 1;
    var gunScope = this;
    this.init = () => {
        bulletCountDisplay.innerHTML = bulletCount + 1 + ' / ' + totalBullets;
        for (var i = 0; i < magazineSize; i++) {
            bullets[i] = bullet.clone();
            bullets[i].position.set(0, -5, 0);
            scene.add(bullets[i]);
        }
    }
    this.shoot = (theta, fireSpeed) => {
        if (bulletCount >= 0) {
            this.gunSound(fireSpeed);
            bullets[bulletCount].position.set(player.mesh.position.x, gunScope.bulletHeight, player.mesh.position.z);
            bullets[bulletCount].velocity = new THREE.Vector3((-Math.sin(theta)), 0, (-Math.cos(theta)));
            bullets[bulletCount].velocity.x *= bulletSpeed;
            bullets[bulletCount].velocity.z *= bulletSpeed;
            bullets[bulletCount].alive = true;
            bulletCount--;
            bulletCountDisplay.innerHTML = bulletCount + 1 + ' / ' + totalBullets;
        } else {
            emptyGun.play();
            bulletCountDisplay.classList.add('shake');
            setTimeout(function () {
                bulletCountDisplay.classList.remove('shake');
            }, 300);
        }
    }
    this.gunSound = fireSpeed => {
        if (playerType == 'Speedy') {
            let gunShot = gunSupressor.cloneNode();
            gunShot.volume = .05;
            gunShot.play();
        } else if (playerType == 'Assassin') {
            sniper.playbackRate = 2;
            sniper.play();
        } else {
            shotgun.playbackRate = (120 / fireSpeed);
            shotgun.play();
        }
    }
    this.allowReload = () => bulletCount == magazineSize - 1 ? false : true;
    this.reload = reloadSpeed => {
        if (totalBullets > 0) {
            gunScope.reloadStatus = true;
            if (playerType == 'Speedy') {
                reloadPistol.playbackRate = ((1000 / reloadSpeed) * 2);
                reloadPistol.play();
            }
            bulletCountAnimation.style.animation = 'reload ' + reloadSpeed / 1000 + 's linear';
            setTimeout(function () {
                bulletCountAnimation.style.animation = '';
                if (magazineSize - bulletCount <= totalBullets) {
                    totalBullets -= (magazineSize - bulletCount - 1);
                    bulletCount = magazineSize - 1;
                } else if (magazineSize - bulletCount > totalBullets) {
                    bulletCount += totalBullets;
                    totalBullets = 0;
                }
                bullets.reverse();
                bulletCountDisplay.innerHTML = bulletCount + 1 + ' / ' + totalBullets;
                gunScope.reloadStatus = false;
            }, reloadSpeed);
        } else {
            console.log('you dont have enough ammo');
        }
    }
}

const bulletPhysics = (walls, bulletSize) => {
    for (let i = 0; i < bullets.length; i++) {
        //Hit Wall
        for (let j = 0; j < walls.length; j++) {
            if ((walls[j].position.x - bullets[i].position.x <= ((1.5 + bulletSize))) && (walls[j].position.x - bullets[i].position.x >= -((1.5 + bulletSize))) && (walls[j].position.z - bullets[i].position.z <= ((1.5 + bulletSize))) && (walls[j].position.z - bullets[i].position.z >= -((1.5 + bulletSize))) && bullets[i].position.y > 0) {
                bullets[i].position.set(0, -5, 0);
                bullets[i].alive = false;
            }
        }
        //LeaveZone
        if (bullets[i].position.x < -(arenaSize / 2) || bullets[i].position.x > arenaSize / 2 || bullets[i].position.z < -(arenaSize / 2) || bullets[i].position.z > (arenaSize / 2)) {
            bullets[i].position.set(0, -5, 0);
            bullets[i].alive = false;
        }
        //Apply physics
        if (bullets[i] == undefined) continue;
        else if (bullets[i].alive == true) {
            bullets[i].position.add(bullets[i].velocity);
        } else if (bullets[i].alive == false) continue;
    }
}
