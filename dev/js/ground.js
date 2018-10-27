const loadGround = () => {
    geo = new THREE.PlaneGeometry(arenaSize * 4, arenaSize * 4, arenaSize / 4, arenaSize / 4);
    mat = new THREE.MeshLambertMaterial({
        color: 0x2e2925
    });
    plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
}
