import * as THREE from '../lib/three.module.js';
import { GLTFLoader } from '../lib/GLTFLoader.js';
import { OrbitControls } from '../lib/OrbitControls.js';
// import { DRACOLoader } from 'DRACOLoader';
window.onload = function() {

    function metadata(userData) {

        console.log(userData.properties)
        d3.select('#infoboard').html(
            // 'id ' + userData.properties[0] + '<br/>' +
            '<span class="info-head">Адреса:</span><br> <span class="info-info">' + userData.properties[9] + '</span><br>' +
            '<span class="info-head">Категорія:</span><br> <span class="info-info">' + userData.properties[21] + '</span><br>' +
            '<span class="info-head">Опис:</span><br> <span class="info-info">' + userData.properties[24] + '</span><br>' +
            '<video class="vid-info"width="100%" autoplay loop muted poster="./photo/' + userData.properties[23] + '"><source src="./video_s/' + userData.properties[18] +
            '" type="video/mp4"></video>' + '<br>'
            // 'photo ' + userData.properties[23] + '<br>'
            // 'video ' + userData.properties[18] + '<br>'
        )


    }


    const canvas = document.getElementById('container');
    // const drawing = new Image();
    // drawing.src = "./pic/rose.png"
    // canvas.drawImage(drawing, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.getBoundingClientRect().width, container.getBoundingClientRect().height);
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    canvas.appendChild(renderer.domElement);

    // const drawing = new Image();
    // drawing.src = "./pic/rose.png"
    console.log(canvas.children[0])
        // canvas.children[0].drawImage(drawing, 0, 0);

    var scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(45, container.getBoundingClientRect().width / container.getBoundingClientRect().height, 1, 200);

    if (window.screen.width <= 1023) {
        camera.position.set(-16.766358626702264, 17.89839741567356, -44.75974738274429);
    } else {
        camera.position.set(-10.14000151042189, 8.52496485873762, -27.06991518983146);
    }


    // -10.14000151042189, y: 8.52496485873762, z: -27.06991518983146

    // -10.14000151042189, y: 8.52496485873762, z: -27.06991518983146

    // -16.766358626702264, y: 17.89839741567356, z: -44.75974738274429

    // -16.62999593223956, y: 18.931333503926282, z: -44.39571128567188}

    var Ambientlight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(Ambientlight)

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 50, -40);
    // -40
    light.castShadow = true
    scene.add(light);

    light.shadow.mapSize.width = 4096; // default
    light.shadow.mapSize.height = 4096; // default
    // light.power = 10
    light.shadow.camera.near = 20; // default
    light.shadow.camera.far = 70; // default

    // const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    // scene.add(pointLightHelper);

    // directionalLight.castShadow = true
    // directionalLight.position = (0, 1, 0)

    // directionalLight.target = (0, 1, 0.5)

    // scene.add(directionalLight.target);

    // const light = new THREE.SpotLight(0xffffff);
    // light.position.set(30, 20, -21);
    // light.castShadow = true; // default false
    // scene.add(light);

    // //Set up shadow properties for the light
    // light.shadow.mapSize.width = 512; // default
    // light.shadow.mapSize.height = 512; // default
    // light.shadow.camera.near = 0.5; // default
    // light.shadow.camera.far = 500; // default
    // light.shadow.focus = 1; // default

    // const spotLightHelper = new THREE.SpotLightHelper(light);
    // scene.add(spotLightHelper);

    // light.target = (0, 0, 0)
    // scene.add(light.target)
    // light.target = scene.children[1].children[42]


    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.target.set(0, 0.5, 0);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = true;
    controls.enableDamping = true;
    // обмежуємо зум камери на мінімальний та максимальний

    if (window.screen.width <= 1023) {
        controls.minDistance = 30
        controls.maxDistance = 70
    } else {
        controls.minDistance = 30
        controls.maxDistance = 30
    }
    // controls.minDistance = 30
    // controls.maxDistance = 30

    // controls.minPolarAngle = 0.7 
    // controls.maxPolarAngle = 1.3

    controls.minPolarAngle = 1.3
    controls.maxPolarAngle = 1.3

    // controls.maxAzimuthAngle = 3.7
    // controls.minAzimuthAngle = 3.4

    controls.maxAzimuthAngle = 3.5
    controls.minAzimuthAngle = 3.5

    const loader = new GLTFLoader();
    loader.load(
        // resource URL
        "data/threejs23.gltf",
        // called when the resource is loaded
        function(gltf) {

            const model = gltf.scene;
            model.position.set(1, 1, 0);
            model.scale.set(0.01, 0.01, 0.01);
            scene.add(model);

            // scene.add(gltf.scene);
            renderer.render(scene, camera);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            // animate();


            console.log(scene)
            scene.children[2].children[68].castShadow = true
            scene.children[2].children[68].receiveShadow = false

            for (let step = 0; step < 68; step++) {
                scene.children[2].children[step].receiveShadow = true
            }


        },
        // called while loading is progressing
        function(xhr) {
            // if (xhr.loaded / xhr.total * 100 == 100) {
            //     d3.select('#infoboard').html("")
            // } else { d3.select('#infoboard').html((xhr.loaded / xhr.total * 100) + '% loaded') }
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function(error) {

            console.log('An error happened');

        },


        window.onresize = function() {

            camera.aspect = container.getBoundingClientRect().width / container.getBoundingClientRect().height;
            camera.updateProjectionMatrix();

            renderer.setSize(container.getBoundingClientRect().width, container.getBoundingClientRect().height);

        },

    );

    console.log(scene)

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    class PickHelper {
        constructor() {
            this.raycaster = new THREE.Raycaster();
            this.pickedObject = null;
            this.pickedObjectSavedColor = 0;
        }
        pick(normalizedPosition, scene, camera) {
            console.log('pick')
                // this.pickedObject = undefined;
            if (this.pickedObject) {
                // console.log(this.pickedObject.material.emissive.getHex())
                // this.pickedObject.material.emissive.setHex(0);
                this.pickedObject.material.color.setHex(0xc76163);
                // this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
                this.pickedObject = undefined;
            }

            this.raycaster.setFromCamera(normalizedPosition, camera);

            var for_intersected = []

            for (let step = 0; step < 67; step++) {
                for_intersected.push(scene.children[2].children[step])
            }

            const intersectedObjects = this.raycaster.intersectObjects(for_intersected);
            console.log(intersectedObjects)
            if (intersectedObjects.length) {
                this.pickedObject = intersectedObjects[0].object;
                metadata(this.pickedObject.userData)
                this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
                // console.log(this.pickedObject.material.emissive.getHex())
                // this.pickedObject.material.emissive.setHex(0x441821);
                this.pickedObject.material.color.setHex(0x6c131f);
                // console.log(this.pickedObject.material.emissive.getHex())
            }
        }
    }
    const pickPosition = { x: 0, y: 0 };
    const pickHelper = new PickHelper();
    clearPickPosition();

    // time
    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);

        // console.log(camera.position)

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function getCanvasRelativePosition(event) {
        // console.log(event)
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    function setPickPosition(event) {

        console.log(pickPosition)
        const pos = getCanvasRelativePosition(event);
        pickPosition.x = (pos.x / canvas.clientWidth) * 2 - 1;
        pickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1; // note we flip Y
        pickHelper.pick(pickPosition, scene, camera);
    }

    function clearPickPosition() {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }
    // window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('click', setPickPosition);
    // window.addEventListener('touchend', clearPickPosition);
    // window.addEventListener('mouseout', clearPickPosition);
    // window.addEventListener('mouseleave', clearPickPosition);
}