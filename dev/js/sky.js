let Sky = function () {
    texture = new THREE.TextureLoader().load('../../assets/img/sky3.jpg');
    geo = new THREE.SphereBufferGeometry(arenaSize * 4, 100, 100);
    mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
        map: texture
    })
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.y = (arenaSize / 2) - 1;

    scope = this;
    this.init = function () {
        scene.add(scope.mesh);
    }
}
