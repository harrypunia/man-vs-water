class Gun {
    constructor() {
        this.reloadStatus = false;
        this.bullet_geo = new THREE.SphereGeometry(stats.bulletSize, 10, 10);
        this.bullet_mat = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.bullet = new THREE.Mesh(this.bullet_geo, this.bullet_mat);
        this.bulletCount = stats.magazineSize - 1;
    }
    init() {
        bulletCountDisplay.innerHTML = this.bulletCount + 1 + ' / ' + stats.totalBullets;
        for (var i = 0; i < stats.magazineSize; i++) {
            bullets[i] = this.bullet.clone();
            bullets[i].position.set(0, -5, 0);
            scene.add(bullets[i]);
        }
    }
    shoot(theta) {
        if (this.bulletCount >= 0) {
            this.gunSound(stats.fireSpeed);
            bullets[this.bulletCount].position.set(player.mesh.position.x, stats.bulletHeight, player.mesh.position.z);
            bullets[this.bulletCount].velocity = new THREE.Vector3((-Math.sin(theta)), 0, (-Math.cos(theta)));
            bullets[this.bulletCount].velocity.x *= stats.bulletSpeed;
            bullets[this.bulletCount].velocity.z *= stats.bulletSpeed;
            bullets[this.bulletCount].alive = true;
            this.bulletCount--;
            bulletCountDisplay.innerHTML = this.bulletCount + 1 + ' /' + stats.totalBullets;
        } else {
            emptyGun.play();
            this.ammoError();
        }
    }
    gunSound() {
        let AR = gunSupressor.cloneNode();
        stats.type == 'Speedy' ? (AR.volume = 0.05, AR.play()) : stats.type == 'Assassin' ? (sniper.playbackRate = 2, sniper.play()) : stats.type == 'Tank' ? (shotgun.playbackRate = (120 / stats.fireSpeed), shotgun.play()) : 0;
    }
    reload() {
        if (stats.totalBullets > 0) {
            this.animateReloadButton(stats.reloadSpeed);
            this.reloadStatus = true;
            reloadPistol.playbackRate = ((1000 / stats.reloadSpeed) * 2);
            reloadPistol.play();
            setTimeout(() => {
                bulletCountAnimation.style.animation = '';
                if (stats.magazineSize - this.bulletCount <= stats.totalBullets) {
                    stats.totalBullets -= (stats.magazineSize - this.bulletCount - 1);
                    this.bulletCount = stats.magazineSize - 1;
                } else if (stats.magazineSize - this.bulletCount > stats.totalBullets) {
                    this.bulletCount += stats.totalBullets;
                    stats.totalBullets = 0;
                }
                bulletCountDisplay.innerHTML = this.bulletCount + 1 + ' /' + stats.totalBullets;
                bullets.reverse();
                this.reloadStatus = false;
            }, stats.reloadSpeed);
        } else {
            //Not Enough AMMO
        }
    }
    allowReload() {
        return this.bulletCount == stats.magazineSize - 1 ? false : true;
    }
    animateReloadButton() {
        bulletCountAnimation.style.animation = 'reload ' + stats.reloadSpeed / 1000 + 's linear';
    }
    ammoError() {
        bulletCountDisplay.classList.add('shake');
        setTimeout(function () {
            bulletCountDisplay.classList.remove('shake');
        }, 300);
    }
}
const bulletPhysics = (walls) => {
    for (let i in bullets) {
        //Walls
        for (let j in walls) {
            var bX = bullets[i].position.x,
                bZ = bullets[i].position.z;

            if (bullets[i].position.y > 0) {
                let gapX = walls[j].position.x - bullets[i].position.x,
                    gapZ = walls[j].position.z - bullets[i].position.z

                if ((gapX <= ((1.5 + stats.bulletSize))) && (gapX >= -((1.5 + stats.bulletSize))) && (gapZ <= ((1.5 + stats.bulletSize))) && gapZ >= -((1.5 + stats.bulletSize))) {
                    bullets[i].position.set(0, -5, 0);
                    bullets[i].alive = false;
                }
            }
        }
        //Zone
        if (bullets[i].position.x < -(arenaSize / 2) || bullets[i].position.x > arenaSize / 2 || bullets[i].position.z < -(arenaSize / 2) || bullets[i].position.z > (arenaSize / 2)) {
            bullets[i].position.set(0, -5, 0);
            bullets[i].alive = false;
        }
        bullets[i].alive ? (bullets[i].position.add(bullets[i].velocity)) : false;
        //Other players
        if (bullets[i].alive) {
            for (let k in keys) {
                let thisKey = keys[k],
                    them = otherPlayers[thisKey].mesh.position,
                    gap = .5 + (stats.bulletSize / 2),
                    collide = bX - them.x < gap && bX - them.x > -gap && bZ - them.z < gap && bZ - them.z > -gap;
                collide ? (console.log(thisKey), giveDamage(thisKey), bullets[i].position.set(0, -5, 0), bullets[i].alive = false) : 0;
            }
        }
    }
}
