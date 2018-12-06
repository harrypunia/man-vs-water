const loadGround = () => {
    geo = new THREE.PlaneGeometry(arenaSize * 4, arenaSize * 4, arenaSize / 4, arenaSize / 4);
    let ground_texture = new THREE.TextureLoader().load("assets/PNG/ground.jpg");
    ground_texture.wrapT = THREE.RepeatWrapping;
    ground_texture.wrapS = THREE.RepeatWrapping;
    ground_texture.repeat.set(50, 50);
    mat = new THREE.MeshLambertMaterial({
        map: ground_texture,
        side: THREE.DoubleSide,
        color: 0x6a614c
    });
    plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
}
