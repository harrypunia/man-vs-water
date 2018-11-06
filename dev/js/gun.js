class Gun {
    constructor(bulletSize, magazineSize, bulletSpeed, totalBullets) {
        this.totalBullets = totalBullets;
        this.magazineSize = magazineSize;
        this.bulletSpeed = bulletSpeed;
        this.totalBullets = totalBullets;
        this.reloadStatus = false;
        this.bulletHeight = 1;
        this.bullet_geo = new THREE.SphereGeometry(bulletSize, 10, 10);
        this.bullet_mat = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.bullet = new THREE.Mesh(this.bullet_geo, this.bullet_mat);
        this.bulletCount = this.magazineSize - 1;
    }
    init() {
        bulletCountDisplay.innerHTML = this.bulletCount + 1 + ' / ' + this.totalBullets;
        for (var i = 0; i < this.magazineSize; i++) {
            bullets[i] = this.bullet.clone();
            bullets[i].position.set(0, -5, 0);
            scene.add(bullets[i]);
        }
    }
    shoot(theta, fireSpeed) {
        if (this.bulletCount >= 0) {
            this.gunSound(fireSpeed);
            bullets[this.bulletCount].position.set(player.mesh.position.x, this.bulletHeight, player.mesh.position.z);
            bullets[this.bulletCount].velocity = new THREE.Vector3((-Math.sin(theta)), 0, (-Math.cos(theta)));
            bullets[this.bulletCount].velocity.x *= this.bulletSpeed;
            bullets[this.bulletCount].velocity.z *= this.bulletSpeed;
            bullets[this.bulletCount].alive = true;
            this.bulletCount--;
            bulletCountDisplay.innerHTML = this.bulletCount + 1 + ' /' + this.totalBullets;
        } else {
            emptyGun.play();
            this.ammoError();
        }
    }
    gunSound(fireSpeed) {
        let AR = gunSupressor.cloneNode();
        playerType == 'Speedy' ? (AR.volume = 0.05, AR.play()) : playerType == 'Assassin' ? (sniper.playbackRate = 2, sniper.play()) : playerType == 'Tank' ? (shotgun.playbackRate = (120 / fireSpeed), shotgun.play()) : 0;
    }
    reload(reloadSpeed) {
        this.animateReloadButton(reloadSpeed);
        if (this.totalBullets > 0) {
            this.reloadStatus = true;
            reloadPistol.playbackRate = ((1000 / reloadSpeed) * 2);
            reloadPistol.play();
            setTimeout(() => {
                bulletCountAnimation.style.animation = '';
                if (this.magazineSize - this.bulletCount <= this.totalBullets) {
                    this.totalBullets -= (this.magazineSize - this.bulletCount - 1);
                    this.bulletCount = this.magazineSize - 1;
                } else if (this.magazineSize - this.bulletCount > this.totalBullets) {
                    this.bulletCount += this.totalBullets;
                    this.totalBullets = 0;
                }
                bulletCountDisplay.innerHTML = this.bulletCount + 1 + ' /' + this.totalBullets;
                bullets.reverse();
                this.reloadStatus = false;
            }, reloadSpeed);
        } else {
            //Not Enough AMMO
        }
    }
    allowReload() {
        return this.bulletCount == this.magazineSize - 1 ? false : true;
    }
    animateReloadButton(reloadSpeed) {
        bulletCountAnimation.style.animation = 'reload ' + reloadSpeed / 1000 + 's linear';
    }
    ammoError() {
        bulletCountDisplay.classList.add('shake');
        setTimeout(function () {
            bulletCountDisplay.classList.remove('shake');
        }, 300);
    }
}

const giveDamage = enemy => {
    if (enemy.x - player.mesh.position.x < 1 || enemy.x - player.mesh.position.x > 1 && enemy.z - player.mesh.position.z < 1 || enemy.z - player.mesh.position.z > 1) {
        console.log('i hit someone');
    } else {
        console.log('missed it');
    }
}

const bulletPhysics = (walls, bulletSize) => {
    for (let i in bullets) {
        for (let j in walls) {
            if ((walls[j].position.x - bullets[i].position.x <= ((1.5 + bulletSize))) && (walls[j].position.x - bullets[i].position.x >= -((1.5 + bulletSize))) && (walls[j].position.z - bullets[i].position.z <= ((1.5 + bulletSize))) && (walls[j].position.z - bullets[i].position.z >= -((1.5 + bulletSize))) && bullets[i].position.y > 0) {
                bullets[i].position.set(0, -5, 0);
                bullets[i].alive = false;
            }
        }
        if (bullets[i].position.x < -(arenaSize / 2) || bullets[i].position.x > arenaSize / 2 || bullets[i].position.z < -(arenaSize / 2) || bullets[i].position.z > (arenaSize / 2)) {
            bullets[i].position.set(0, -5, 0);
            bullets[i].alive = false;
        }
        bullets[i].alive ? bullets[i].position.add(bullets[i].velocity) : false;
    }
}
