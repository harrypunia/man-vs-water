var Wall = function (number, height, player) {
    this.list = [];
    var obj_geo, obj_mat, obj, objHeight, objBorder;
    for (var i = 0; i < number; i++) {
        objHeight = Math.floor((Math.random() * height) + 3)
        obj_geo = new THREE.BoxGeometry(3, objHeight, 3, 3, 3, 3);
        obj_mat = new THREE.MeshPhongMaterial({
            color: 0x6f2c2c
        });
        obj = new THREE.Mesh(obj_geo, obj_mat);
        objBorder = new THREE.Mesh(obj_geo, gameStroke);
        obj.position.set((arenaSize / 2) - (Math.floor(Math.random() * arenaSize)), objHeight / 2, (arenaSize / 2) - (Math.floor(Math.random() * arenaSize)));
        this.list.push(obj);
        obj.add(objBorder);
        scene.add(obj);
    }
    this.applyPhysics = function (repelForce) {
        var px = player.position.x,
            pz = player.position.z,
            repelForce = repelForce;

        //Increases repelForce if player is sprinting
        if (controls.sprinting == true) {
            repelForce *= 2;
        }
        //Apply repelForce if player is touching the wall
        for (var i = 0; i < this.list.length; i++) {
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
}

var Grass = function (number, height) {
    var grass_geo, grass_mat, grass, grassHeight, grassBorder;
    this.list = [];
    for (var i = 0; i < number; i++) {
        grassHeight = Math.floor((Math.random() * height) + 3)
        grass_geo = new THREE.BoxGeometry(3, grassHeight, 3, 3, 3, 3);
        grass_mat = new THREE.MeshPhongMaterial({
            color: 0x3b764f
        });
        grass = new THREE.Mesh(grass_geo, grass_mat);
        grassBorder = new THREE.Mesh(grass_geo, gameStroke);
        grass.position.set((arenaSize / 2) - (Math.floor(Math.random() * arenaSize)), grassHeight / 2, (arenaSize / 2) - (Math.floor(Math.random() * arenaSize)));
        this.list.push(grass);
        grass.add(grassBorder);
        scene.add(grass);
    }
}
