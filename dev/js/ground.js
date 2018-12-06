const loadGround = () => {
    geo = new THREE.PlaneGeometry(arenaSize * 4, arenaSize * 4, arenaSize / 4, arenaSize / 4);
    mat = new THREE.MeshPhongMaterial({
        color: 0x222222
    });
    plane = new THREE.Mesh(geo, mat);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
}
