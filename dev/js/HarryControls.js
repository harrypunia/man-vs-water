var bulletSize;

THREE.PlayerControls = function (camera, player, playerType, domElement) {

    this.camera = camera;
    this.player = player;
    this.domElement = (domElement !== undefined) ? domElement : document;

    // API

    this.enabled = true;

    this.allow = true;

    this.playerType = playerType;

    this.center = new THREE.Vector3(player.position.x, player.position.y, player.position.z);

    this.hasLanded = false;
    this.sprinting = false;
    this.allowSprinting = true;
    this.jumping = false;
    this.jump = false;
    this.gravity = .007;

    this.allowMouseControls;

    let fireRate = 10,
        fireSpeed = 20,
        range,
        bulletSpeed,
        gun,
        magazineSize,
        reloadSpeed,
        totalBullets,
        staminaBar,
        stamina = 100,
        storeMoveSpeed,
        scopeZoom,
        dblScopeZoom,
        jumpPower = .15;
    const bulletContainer = document.getElementById('bulletCountDisplay'),
        map = document.getElementById('map');

    this.reloading = false;
    this.moveSpeed;
    this.acceleration;
    this.maxSpeed;
    this.turnSpeed;
    this.staminaDrain;
    this.staminaRecovery;
    this.sprintTurnSpeed;

    this.userZoom = true;
    this.userZoomSpeed = 1.0;

    this.perspective = 7;

    this.userRotate = true;
    this.userRotateSpeed = 1.5;

    this.autoRotate = false;
    this.autoRotateSpeed = 0.3;
    this.YAutoRotation = false;

    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;

    this.minDistance = 0;
    this.maxDistance = Infinity;

    // internals

    var scope = this;

    var EPS = 0.000001;
    var PIXELS_PER_ROUND = 1800;

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    var zoomStart = new THREE.Vector2();
    var zoomEnd = new THREE.Vector2();
    var zoomDelta = new THREE.Vector2();

    var phiDelta = 0;
    var theta;
    var thetaDelta = 0;
    var scale = 1;

    var lastPosition = new THREE.Vector3(player.position.x, player.position.y, player.position.z);
    var playerIsMoving = false;

    var keyState = {};
    var STATE = {
        NONE: -1,
        ROTATE: 0,
        ZOOM: 1,
        PAN: 2
    };
    var state = STATE.NONE;

    // events

    var changeEvent = {
        type: 'change'
    };

    this.rotateLeft = angle => {
        if (angle === undefined) {
            angle = getAutoRotationAngle();
        }
        thetaDelta -= angle;
    };

    this.rotateRight = angle => {
        if (angle === undefined) {
            angle = getAutoRotationAngle();
        }
        thetaDelta += angle;
    };

    this.rotateUp = angle => {
        if (angle === undefined) {
            angle = getAutoRotationAngle();
        }
        phiDelta -= angle;
    };

    this.rotateDown = angle => {
        if (angle === undefined) {
            angle = getAutoRotationAngle();
        }
        phiDelta += angle;
    };

    this.zoomIn = zoomScale => {
        if (zoomScale === undefined) {
            zoomScale = getZoomScale();
        }
        scale /= zoomScale;
    };

    this.zoomOut = zoomScale => {
        if (zoomScale === undefined) {
            zoomScale = getZoomScale();
        }
        scale *= zoomScale;
    };

    this.access = (px, py, pz) => {
        this.camera.position.x = this.player.position.x + px;
        this.camera.position.y = this.player.position.y + py;
        this.camera.position.z = this.player.position.z + pz;
        this.camera.lookAt(this.player.position);
    };

    this.init = () => {
        if (this.playerType == 'Speedy') {
            this.moveSpeed = 0.17;
            this.maxSpeed = 0.4;
            this.turnSpeed = 0.1;
            this.sprintTurnSpeed = 0.03;
            this.acceleration = 0.007;
            this.staminaDrain = .3;
            this.staminaRecovery = .025;
            fireSpeed = 7;
            bulletSize = .1;
            bulletSpeed = 2;
            magazineSize = 24;
            reloadSpeed = 3400;
            totalBullets = 120;
            scopeZoom = 3;
            dblScopeZoom = 2;
        } else if (this.playerType == 'Tank') {
            this.moveSpeed = 0.12;
            this.maxSpeed = .25;
            this.turnSpeed = 0.05;
            this.sprintTurnSpeed = 0.04;
            this.acceleration = 0.004;
            this.staminaDrain = .1;
            this.staminaRecovery = .02;
            fireSpeed = 60;
            bulletSize = 1;
            bulletSpeed = 1.5;
            magazineSize = 9;
            reloadSpeed = 5400;
            totalBullets = 45;
            scopeZoom = 3;
            dblScopeZoom = 2;
        } else if (this.playerType = 'Assassin') {
            this.moveSpeed = 0.14;
            this.maxSpeed = .25;
            this.turnSpeed = 0.07;
            this.sprintTurnSpeed = 0.05;
            this.acceleration = 0.2;
            this.staminaDrain = .6;
            this.staminaRecovery = .1;
            fireSpeed = 120;
            bulletSize = .4;
            bulletSpeed = 3.5;
            magazineSize = 16;
            reloadSpeed = 1600;
            totalBullets = 72;
            scopeZoom = 3;
            dblScopeZoom = 2;
        }
        storeMoveSpeed = this.moveSpeed;
        gun = new Gun(bulletSize, magazineSize, bulletSpeed, totalBullets);
        gun.init();
    }

    this.update = () => {
        this.checkKeyStates();

        if (scope.jump == true) {
            stamina -= this.staminaDrain;
            gun.bulletHeight = player.position.y + 0.5;
            jumpPower -= scope.gravity;
            player.position.y += jumpPower;
            camera.position.y += jumpPower;
            if (player.position.y <= 0.49) {
                camera.position.y = 1;
                gun.bulletHeight = 1;
                player.position.y = 0.5;
                scope.jumping = false;
                scope.jump = false;
                jumpPower = .15;
            }
        }

        if (fireRate > 0) {
            fireRate--;
        }

        this.center = this.player.position;

        var position = this.camera.position;
        var offset = position.clone().sub(this.center);

        // angle from z-axis around y-axis

        theta = Math.atan2(offset.x, offset.z);

        // angle from y-axis

        var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

        theta += thetaDelta;
        phi += phiDelta;

        // restrict phi to be between desired limits
        phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

        // restrict phi to be between EPS and PI-EPS
        phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

        var radius = offset.length() * scale;

        radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

        offset.x = radius * Math.sin(phi) * Math.sin(theta);
        offset.y = radius * Math.cos(phi);
        offset.z = radius * Math.sin(phi) * Math.cos(theta);

        if (this.autoRotate) {
            this.camera.position.x += this.autoRotateSpeed * ((this.player.position.x + this.perspective * Math.sin(this.player.rotation.y)) - this.camera.position.x);
            this.camera.position.z += this.autoRotateSpeed * ((this.player.position.z + this.perspective * Math.cos(this.player.rotation.y)) - this.camera.position.z);
        } else {
            position.copy(this.center).add(offset);
        }
        this.camera.lookAt(this.center);

        thetaDelta = 0;
        phiDelta = 0;
        scale = 1;

        if (state === STATE.NONE && playerIsMoving) {

            this.autoRotate = true;

        } else {
            this.autoRotate = false;
        }

        if (lastPosition.distanceTo(this.player.position) > 0) {
            lastPosition.copy(this.player.position);

        } else if (lastPosition.distanceTo(this.player.position) == 0) {
            playerIsMoving = false;
        }

    };

    this.checkKeyStates = function () {
        if (this.hasLanded) {
            if (this.allow) {
                if (keyState[16] && keyState[38] || keyState[87] && keyState[16]) {
                    if (stamina > 0) {
                        scope.storeStaminaDelay = scope.staminaDelay;
                        stamina -= this.staminaDrain;
                        displayStamina();
                        if (this.allowSprinting == true) {
                            startRunning();
                        }
                    } else {
                        stamina = 0;
                        stopRunning();
                    }
                    this.sprinting = true;
                } else {
                    if (stamina < 100) {
                        displayStamina();
                        this.allowSprinting = true;
                        stamina += scope.staminaRecovery;
                    }
                    stopRunning();
                }

                if (keyState[38] || keyState[87]) {
                    // up arrow or 'w' - move forward
                    playerIsMoving = true;

                    this.player.position.x -= this.moveSpeed * Math.sin(this.player.rotation.y);
                    this.player.position.z -= this.moveSpeed * Math.cos(this.player.rotation.y);

                    this.camera.position.x -= this.moveSpeed * Math.sin(this.player.rotation.y);
                    this.camera.position.z -= this.moveSpeed * Math.cos(this.player.rotation.y);
                }

                if (keyState[40] || keyState[83]) {
                    // down arrow or 's' - move backward
                    playerIsMoving = true;

                    this.player.position.x += this.moveSpeed * Math.sin(this.player.rotation.y);
                    this.player.position.z += this.moveSpeed * Math.cos(this.player.rotation.y);

                    this.camera.position.x += this.moveSpeed * Math.sin(this.player.rotation.y);
                    this.camera.position.z += this.moveSpeed * Math.cos(this.player.rotation.y);
                }

                if (keyState[81]) {
                    // 'q' - strafe left
                    playerIsMoving = true;

                    this.player.position.x -= (this.moveSpeed * Math.cos(this.player.rotation.y) / 2);
                    this.player.position.z += (this.moveSpeed * Math.sin(this.player.rotation.y) / 2);

                    this.camera.position.x -= (this.moveSpeed * Math.cos(this.player.rotation.y) / 2);
                    this.camera.position.z += (this.moveSpeed * Math.sin(this.player.rotation.y) / 2);

                }

                if (keyState[69]) {
                    // 'e' - strafe right
                    playerIsMoving = true;

                    this.player.position.x += (this.moveSpeed * Math.cos(this.player.rotation.y) / 2);
                    this.player.position.z -= (this.moveSpeed * Math.sin(this.player.rotation.y) / 2);

                    this.camera.position.x += (this.moveSpeed * Math.cos(this.player.rotation.y) / 2);
                    this.camera.position.z -= (this.moveSpeed * Math.sin(this.player.rotation.y) / 2);

                }

                if (keyState[70] && scope.jumping == false) { //F Jump
                    scope.jump = true;
                    this.jumping = true;
                }

                if (keyState[192]) { //Aim
                    player.material.opacity > .5 ? player.material.opacity -= 0.05 : 0;
                    playerIsMoving = true;
                    this.turnSpeed = .02;
                    this.perspective > scopeZoom ? this.perspective -= 0.3 : 0;
                    if (keyState[49]) {
                        this.turnSpeed = .01;
                        player.material.opacity > .2 ? player.material.opacity -= 0.01 : 0;
                        this.perspective > dblScopeZoom ? this.perspective -= 0.1 : 0;
                    } else {
                        player.material.opacity < .49 ? player.material.opacity += 0.01 : 0;
                        this.perspective < scopeZoom - 0.1 ? this.perspective += 0.1 : 0;
                    }
                } else {
                    player.material.opacity < 1 ? player.material.opacity += 0.05 : 0;
                    this.perspective < 7 ? (playerIsMoving = true, this.perspective += 0.3) : 0;
                }

                if (keyState[32] && fireRate == 0 && gun.reloadStatus == false) { //Shoot
                    gun.shoot(theta, fireSpeed);
                    fireRate = fireSpeed;
                }
                if (keyState[82]) { //Reload
                    if (!gun.allowReload() && gun.reloadStatus == false) {
                        bulletContainer.classList.add('shake');
                        setTimeout(() => {
                            bulletCountDisplay.classList.remove('shake');
                        }, 500);
                    } else if (gun.allowReload() && gun.reloadStatus == false) {
                        gun.reload(reloadSpeed);
                    }
                }
            }
            if (keyState[77]) { //Map
                mapView.width = window.innerWidth - 200;
                mapView.height = window.innerHeight - 100;
                mapView.x = window.innerWidth / 2 - ((window.innerWidth - 200) / 2);
                mapView.y = window.innerHeight / 2 - ((window.innerHeight - 100) / 2);
                mapPos.x = 0;
                mapPos.y = arenaSize * 1.2;
                mapPos.z = 0;
                dimBack = true;
                this.allow = false;
            } else {
                mapView.width = 200;
                mapView.height = 200;
                mapView.x = window.innerWidth - 220;
                mapView.y = 20;
                mapPos.x = player.position.x;
                mapPos.y = 70;
                mapPos.z = player.position.z;
                dimBack = false;
                this.allow = true;
            }
        } else { //If Not Landed
            mapCamera.lookAt(player.position);
        }
        if (this.allow) {
            if (keyState[37] || keyState[65]) {
                // left arrow or 'a' - rotate left
                playerIsMoving = true;
                this.player.rotation.y += this.turnSpeed;
            }

            if (keyState[39] || keyState[68]) {
                // right arrow or 'd' - rotate right
                playerIsMoving = true;
                this.player.rotation.y -= this.turnSpeed;
            }
        }

        ref.child(playerId).child("orientation").update({
            position: {
                x: this.player.position.x,
                y: this.player.position.y,
                z: this.player.position.z
            },
            rotation: {
                x: this.player.rotation.x,
                y: this.player.rotation.y,
                z: this.player.rotation.z
            },
            takeDamage: false
        })
    };

    function stopRunning() {
        if (scope.moveSpeed > storeMoveSpeed) {
            scope.moveSpeed -= 0.01;
        }
        if (this.playerType == 'Speedy') {
            if (scope.turnSpeed < 0.1) {
                scope.turnSpeed += 0.001;
            }
        } else if (this.playerType == 'Tank') {
            if (scope.turnSpeed < 0.05) {
                scope.turnSpeed += 0.001;
            }
        } else {
            if (scope.turnSpeed < 0.07) {
                scope.turnSpeed += 0.001;
            }
        }
        this.sprinting = false;
    }

    function startRunning() {
        if (scope.moveSpeed < scope.maxSpeed) {
            scope.moveSpeed += scope.acceleration;
        }
        if (scope.playerType == 'Speedy') {
            scope.turnSpeed = scope.sprintTurnSpeed;
        } else if (this.playerType == 'Tank') {
            scope.turnSpeed = scope.sprintTurnSpeed;
        } else {
            scope.turnSpeed = scope.sprintTurnSpeed;
        }
    }

    function displayStamina() {
        staminaBar = document.getElementsByClassName('stamina')[0];
        staminaBar.style.borderLeft = ((stamina / 100) * 300) + 'px solid #4e7fdd';
    }

    function getAutoRotationAngle() {
        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }

    function getZoomScale() {
        return Math.pow(0.95, scope.userZoomSpeed);
    }

    function onMouseDown(event) {
        if (scope.enabled === false) return;
        if (scope.userRotate === false) return;

        event.preventDefault();

        if (event.button === 0) {

            state = STATE.ROTATE;

            rotateStart.set(event.clientX, event.clientY);

        } else if (event.button === 1) {

            state = STATE.ZOOM;

            zoomStart.set(event.clientX, event.clientY);

        }

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

    }

    function onMouseMove(event) {

        if (scope.enabled === false) return;

        event.preventDefault();

        if (state === STATE.ROTATE) {

            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta.subVectors(rotateEnd, rotateStart);

            scope.rotateLeft(2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed);
            scope.rotateUp(2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed);

            rotateStart.copy(rotateEnd);

        } else if (state === STATE.ZOOM) {

            zoomEnd.set(event.clientX, event.clientY);
            zoomDelta.subVectors(zoomEnd, zoomStart);

            if (zoomDelta.y > 0) {

                scope.zoomIn();

            } else {

                scope.zoomOut();

            }

            zoomStart.copy(zoomEnd);
        }

    }

    function onMouseUp(event) {

        if (scope.enabled === false) return;
        if (scope.userRotate === false) return;

        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);

        state = STATE.NONE;

    }

    function onMouseWheel(event) {

        if (scope.enabled === false) return;
        if (scope.userRotate === false) return;

        var delta = 0;

        if (event.wheelDelta) { //WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if (event.detail) { // Firefox

            delta = -event.detail;

        }

        if (delta > 0) {

            scope.zoomOut();

        } else {

            scope.zoomIn();

        }

    }


    this.domElement.addEventListener('contextmenu', (event) => event.preventDefault());
    this.domElement.addEventListener('keydown', (event) => {
        event = event || window.event;
        keyState[event.keyCode || event.which] = true
    });
    this.domElement.addEventListener('keyup', (event) => {
        event = event || window.event;
        keyState[event.keyCode || event.which] = false;
    });
    this.domElement.addEventListener('mousedown', onMouseDown, false);
    this.domElement.addEventListener('mousewheel', onMouseWheel, false);
    this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false);
};

THREE.PlayerControls.prototype = Object.create(THREE.EventDispatcher.prototype);
