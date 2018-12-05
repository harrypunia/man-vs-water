var player_geo;
var Player = function (id, name, skin, side) {
    this.playerId = id;
    this.username = name;
    this.isMainPlayer = false;
    this.mesh;
    this.playerType = stats.type;
    this.player_mat;
    this.skin = skin;
    this.chosenSide = side;
    scope = this;
    this.init = () => {
        if (this.chosenSide == 'man') {
            player_geo = new THREE.BoxBufferGeometry(1, 1, 1);
            man_mats = [
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("assets/SVG/man_skin" + this.skin + "_right.svg"),
                    transparent: true,
                    side: THREE.DoubleSide
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("assets/SVG/man_skin" + this.skin + "_left.svg"),
                    transparent: true,
                    side: THREE.DoubleSide
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("assets/SVG/man_skin" + this.skin + "_top.svg"),
                    transparent: true,
                    side: THREE.DoubleSide
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("assets/SVG/man_skin" + this.skin + "_bottom.svg"),
                    transparent: true,
                    side: THREE.DoubleSide
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("assets/SVG/man_skin" + this.skin + "_back.svg"),
                    transparent: true,
                    side: THREE.DoubleSide
                }),
            new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load("assets/SVG/man_skin" + this.skin + "_front.svg"),
                    transparent: true,
                    side: THREE.DoubleSide
                })
            ];
            player_mat = new THREE.MeshFaceMaterial(man_mats);
        } else {
            player_mat = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/SVG/water_skin" + this.skin + ".svg"),
                transparent: true,
                side: THREE.DoubleSide,
            });
            player_geo = new THREE.SphereGeometry(.5, 15, 15);
        }
        scope.mesh = new THREE.Mesh(player_geo, player_mat);
        scope.meshBorder = new THREE.Mesh(player_geo, gameStroke);
        user.side == 'man' ? scope.mesh.position.set(10 - (arenaSize / 2), arenaSize / 2, (Math.random() * arenaSize) - (arenaSize / 2)) : scope.mesh.position.set((arenaSize / 2) - 10, arenaSize / 2, (Math.random() * arenaSize) - (arenaSize / 2));
        scope.mesh.add(scope.meshBorder);
        scene.add(scope.mesh);
        if (scope.isMainPlayer) {
            controls = new THREE.HarryControls(camera, scope.mesh, stats);
        }
    }
    this.setOrientation = (pos, rot) => {
        if (scope.mesh) {
            scope.mesh.position.copy(pos);
            scope.mesh.rotation.y = rot;
        }
    }
    this.restrict = activePlayer => {
        let parameter = arenaSize / 2 - 0.5;
        activePlayer.position.x = activePlayer.position.x <= -parameter ? -parameter : activePlayer.position.x >= parameter ? parameter : activePlayer.position.x;
        activePlayer.position.z = activePlayer.position.z <= -parameter ? -parameter : activePlayer.position.z >= parameter ? parameter : activePlayer.position.z;
    }
}
