var Zone = function () {
    var scope = this;
    this.init = function () {
        this.height = 400
        geo = new THREE.BoxGeometry(arenaSize, this.height, arenaSize, 5, 5);
        mat = new THREE.MeshBasicMaterial({
            color: 0x70c1d4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: .3
        })
        scope.mesh = new THREE.Mesh(geo, mat);
        scope.mesh.position.y = (this.height / 2) - 1;
        scene.add(scope.mesh);
    };
    this.shrink = function (speed) {
        scope.mesh.scale.x -= speed;
        scope.mesh.scale.z -= speed;
    }
}
