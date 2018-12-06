const addLights = () => {
    ambLight = new THREE.AmbientLight(0xffffff, 1);
    sun = new THREE.SpotLight(0xffffff);
    sun.intensity = 1;
    sun.penumbra = 1;
    sun.position.set(player.mesh.position.x, 200, player.mesh.position.z);
    sun.lookAt(player.mesh.position);
    sun.castShadow = true;
    sun.shadowDarkness = 0.5;
    sun.shadowCameraVisible = true;
    scene.add(ambLight);
    scene.add(sun);
}
