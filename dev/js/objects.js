var Wall = function (number, height, player) {
    this.list = [];
    this.posList = [];
    this.downloadStatus = false;
    var obj_geo, obj_mat, obj, objHeight, objBorder, wallScope = this;
    this.init = () => {
        obj_mat = new THREE.MeshPhongMaterial({
            color: 0x6f2c2c
        });
        if (this.downloadStatus) {
            setTimeout(() => {
                for (let i = 0; i < this.posList.length; i++) {
                    objHeight = this.posList[i].h;
                    obj_geo = new THREE.BoxGeometry(3, objHeight, 3, 3, 3, 3);
                    obj = new THREE.Mesh(obj_geo, obj_mat);
                    objBorder = new THREE.Mesh(obj_geo, gameStroke);
                    obj.position.set(this.posList[i].x, this.posList[i].h / 2, this.posList[i].z);
                    this.list.push(obj);
                    obj.add(objBorder);
                    scene.add(obj);
                }
            }, 300);
        } else {
            for (let i = 0; i < number; i++) {
                objHeight = Math.floor((Math.random() * height) + 3)
                obj_geo = new THREE.BoxGeometry(3, objHeight, 3, 3, 3, 3);
                obj = new THREE.Mesh(obj_geo, obj_mat);
                objBorder = new THREE.Mesh(obj_geo, gameStroke);
                obj.position.set((arenaSize / 2) - (Math.floor(Math.random() * arenaSize)), objHeight / 2, (arenaSize / 2) - (Math.floor(Math.random() * arenaSize)));
                this.list.push(obj);
                this.posList[i] = {
                    x: obj.position.x,
                    y: obj.position.y,
                    z: obj.position.z,
                    h: objHeight
                }
                obj.add(objBorder);
                scene.add(obj);
            }
        }
    }
    this.applyPhysics = repelForce => {
        var px = player.position.x,
            pz = player.position.z,
            repelForce = repelForce;

        if (controls.sprinting == true) {
            repelForce *= 2;
        }
        for (let i in this.list) {
            if ((px - this.list[i].position.x) <= 2 && (px - this.list[i].position.x) >= -2 && (pz - this.list[i].position.z) <= 2 && (pz - this.list[i].position.z) >= -2) {
                if (px - this.list[i].position.x <= 0) {
                    player.position.x -= repelForce;
                } else if (px - this.list[i].position.x >= 0) {
                    player.position.x += repelForce;
                }
                if (pz - this.list[i].position.z <= 0) {
                    player.position.z -= repelForce;
                } else if (pz - this.list[i].position.z >= 0) {
                    player.position.z += repelForce;
                }
            }
        }
    }
    this.upload = () => {
        for (let i in this.posList) {
            gameRef.child('Obstacles').child(i).set({
                x: this.posList[i].x,
                y: this.posList[i].y,
                z: this.posList[i].z,
                h: this.posList[i].h
            });
            this.downloadStatus = false;
        }
    }
    this.download = () => {
        gameRef.child('Obstacles').on('value', data => {
            for (let i in data.val()) {
                wallScope.posList[i] = data.val()[i];
            }
        });
        this.downloadStatus = true;
    }
}

var Grass = function (number, height) {
    var grass_geo, grass_mat, grass, grassHeight, grassBorder, grassScope = this;
    this.list = [];
    this.posList = [];
    this.downloadStatus = false;
    this.init = () => {
        grass_mat = new THREE.MeshPhongMaterial({
            color: 0x3b764f
        });
        if (this.downloadStatus == true) {
            setTimeout(() => {
                for (let i = 0; i < this.posList.length; i++) {
                    grassHeight = this.posList[i].h;
                    grass_geo = new THREE.BoxGeometry(3, grassHeight, 3, 3, 3, 3);
                    grass = new THREE.Mesh(grass_geo, grass_mat);
                    grassBorder = new THREE.Mesh(grass_geo, gameStroke);
                    grass.position.set(this.posList[i].x, this.posList[i].h / 2, this.posList[i].z);
                    this.list.push(grass);
                    grass.add(grassBorder);
                    scene.add(grass);
                }
            }, 300);
        } else {
            for (let i = 0; i < number; i++) {
                grassHeight = Math.floor((Math.random() * height) + 3)
                grass_geo = new THREE.BoxGeometry(3, grassHeight, 3, 3, 3, 3);
                grass = new THREE.Mesh(grass_geo, grass_mat);
                grassBorder = new THREE.Mesh(grass_geo, gameStroke);
                grass.position.set((arenaSize / 2) - (Math.floor(Math.random() * arenaSize)), grassHeight / 2, (arenaSize / 2) - (Math.floor(Math.random() * arenaSize)));
                this.list.push(grass);
                this.posList[i] = {
                    x: grass.position.x,
                    y: grass.position.y,
                    z: grass.position.z,
                    h: grassHeight
                }
                grass.add(grassBorder);
                scene.add(grass);
            }
        }
    }
    this.upload = () => {
        for (let i in this.posList) {
            gameRef.child('Bushes').child(i).set({
                x: this.posList[i].x,
                y: this.posList[i].y,
                z: this.posList[i].z,
                h: this.posList[i].h,
            });
            this.downloadStatus = false;
        }
    }
    this.download = () => {
        gameRef.child('Bushes').on("value", data => {
            for (let i in data.val()) {
                grassScope.posList[i] = data.val()[i];
            }
        });
        this.downloadStatus = true;
    }
}
