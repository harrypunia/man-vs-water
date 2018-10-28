var player_geo = new THREE.BoxBufferGeometry(1, 1, 1);
var player_mat = new THREE.MeshLambertMaterial({
    color: 0xf5ea66,
    transparent: true
});
var Player = function (playerID, playerName, playerType) {
    this.playerID = playerID;
    this.username = playerName;
    this.isMainPlayer = false;
    this.mesh;
    this.playerType = playerType;

    scope = this;
    this.init = () => {
        scope.mesh = new THREE.Mesh(player_geo, player_mat);
        scope.meshBorder = new THREE.Mesh(player_geo, gameStroke);
        scope.mesh.position.x = (arenaSize / 2) - (Math.floor(Math.random() * arenaSize));
        scope.mesh.position.y = arenaSize / 2;
        scope.mesh.position.z = (arenaSize / 2) - (Math.floor(Math.random() * arenaSize));
        scope.mesh.add(scope.meshBorder);
        scene.add(scope.mesh);

        if (scope.isMainPlayer) {
            controls = new THREE.PlayerControls(camera, scope.mesh, scope.playerType);
        }
    }
    this.setOrientation = (pos, rot) => {
        if (scope.mesh) {
            scope.mesh.position.copy(pos);
            scope.mesh.rotation.x = rot.x;
            scope.mesh.rotation.y = rot.y;
            scope.mesh.rotation.z = rot.z;
        }
    }
    this.restrict = (activePlayer) => {
        let parameter = arenaSize / 2 - 0.5;
        activePlayer.position.x = activePlayer.position.x <= -parameter ? -parameter : activePlayer.position.x >= parameter ? parameter : activePlayer.position.x;
        activePlayer.position.z = activePlayer.position.z <= -parameter ? -parameter : activePlayer.position.z >= parameter ? parameter : activePlayer.position.z;
    }
}
