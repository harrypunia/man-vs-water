var canvas, scene, camera, mapCamera, renderer, dimBack, controls, mapSize, game = new Game(),
    mapPos = {
        x: 0,
        y: 70,
        z: 0
    },
    mapView = {
        width: 200,
        height: 200,
        x: window.innerWidth - 220,
        y: 20
    }

const init = () => {
    canvas = document.getElementById('container');
    scene = new THREE.Scene();
    mapCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 0;
    camera.rotation.order = 'YXZ';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
    document.body.appendChild(container);
}

const animate = () => {
    if (controls) {
        controls.update();
    }
    game.update();
    render();
    requestAnimationFrame(animate);
}

const render = () => {
    if (dimBack == true) {
        dimLight();
    }
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.autoClear = false;

    fullLight();
    renderer.setViewport(mapView.x, mapView.y, mapView.width, mapView.height);
    mapCamera.aspect = mapView.width / mapView.height;
    mapCamera.updateProjectionMatrix();
    mapCamera.position.set(mapPos.x, mapPos.y, mapPos.z);
    renderer.render(scene, mapCamera);
}

const initThreeJs = () => {
    init();
    game.init();
    mapPos.x = player.mesh.position.x;
    mapPos.z = player.mesh.position.z;
    animate();
}

const dimLight = () => {
    ambLight.intensity = .3;
    sun.intensity = .3;
}

const fullLight = () => {
    ambLight.intensity = 1;
    sun.intensity = 1;
}