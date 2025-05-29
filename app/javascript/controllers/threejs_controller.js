import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/controls/OrbitControls.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18.0/dist/lil-gui.esm.js';


export default class extends Controller {
  static targets = ["container"];

  connect() {
    console.log("hello, stimulus!", this.element);
    console.log("Three.js version:", THREE.REVISION);
    this.initScene();
    this.loadModels();
    this.setupEventListeners();
    this.animate();
  }
  disconnect() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.handleWindowResize);
    this.renderer.dispose();
  }

  initScene() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    document.querySelector('#canvas').appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.cameraStartPos = new THREE.Vector3(15.5, 4.3, 9.5);
    this.cameraEndPos = new THREE.Vector3(11.6, 4.3, 13.6);
    this.animationDuration = 6000;
    this.camera.position.copy(this.cameraStartPos);



    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.minPolarAngle = 0.5;
    this.controls.maxPolarAngle = 1.5;
    this.controls.autoRotate = false;
    this.controls.target = new THREE.Vector3(-0.2, 3, -1.5);
    this.controls.update();

    // Lighting
    this.setupLights();
  }

  setupLights() {
    const spotLight = new THREE.SpotLight(new THREE.Color(0.43, 0.21, 1), 3000, 100, 0.22, 1);
    spotLight.position.set(20, 50, 0.68);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    this.scene.add(spotLight);

    const spotLight2Parent = new THREE.Object3D();
    this.scene.add(spotLight2Parent);
    const spotLight2 = new THREE.SpotLight(0xffffff, 136, 17, 0.3, 1);
    spotLight2.position.set(0, 0, 0);
    spotLight2.castShadow = true;
    spotLight2.shadow.bias = -0.0001;
    spotLight2Parent.add(spotLight2);
    spotLight2Parent.position.set(-0.8, 11.2, -1.8);
    spotLight2Parent.rotation.set(-1.9, 0, -0.4);

    const spotLight2Target = new THREE.Object3D();
    spotLight2Target.position.set(0, 0, -1); // forward from spotlight
    spotLight2Parent.add(spotLight2Target);
    spotLight2.target = spotLight2Target;

    const spotLight3 = new THREE.SpotLight(new THREE.Color(0.8, 0.3, 1), 500, 200, 0.22, 1);
    spotLight3.position.set(20, 10.5, 20);
    spotLight3.castShadow = true;
    spotLight3.shadow.bias = -0.0001;
    this.scene.add(spotLight3);

    const pointLight = new THREE.PointLight( new THREE.Color(0.351, 0.498, 1), 4, 50 );
    pointLight.position.set( -2.6, 1.7, 4.8 );
    this.scene.add( pointLight );
    // pointlight 2
    const pointLight2 = new THREE.PointLight( new THREE.Color(0.695, 0.326, 0.695), 2, 50 );
    pointLight2.position.set(-2.6, 2.8, -0.2 );
    this.scene.add( pointLight2 );

    const pointLight3 = new THREE.PointLight( new THREE.Color(0.5, 0.226, 0.616), 0.5 , 200, 1.5 );
    pointLight3.position.set(-5.1, 4.65, 1.1 );
    this.scene.add( pointLight3 );
  }


    loadModels() {
    const models = [
          { path: '3Dmodels/wall-floor/wall-floor.glb', scale: 0.5 },
          { path: '3Dmodels/chair/chair.gltf', scale: 0.5 },
          { path: '3Dmodels/desk/desk.glb', scale: 0.5 },
          { path: '3Dmodels/screens/screens.glb', scale: 0.5 },
          { path: '3Dmodels/curtain/curtain.glb', scale: 0.5 },
          { path: '3Dmodels/bed/bed.gltf', scale: 0.5 },
          { path: '3Dmodels/left_wall/left_wall.gltf', scale: 0.5 },
          { path: '3Dmodels/aquarium/aquarium.glb', scale: 0.5 },
          { path: '3Dmodels/table/low-table.glb', scale: 0.5 }
        ];

      let loadedCount = 0;
      const totalModels = models.length;

      const loader = new GLTFLoader();
      models.forEach(model => {
        loader.load(
          model.path,
          (gltf) => {
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace;
                if (child.material.emissiveMap) {
                  child.material.emissiveIntensity = 5;
                }
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            gltf.scene.scale.set(model.scale, model.scale, model.scale);
            this.scene.add(gltf.scene);

            loadedCount++;
            if (loadedCount === totalModels) {
              this.hideLoadingOverlay();
            }
          },
          undefined,
          (error) => {
            console.error('Failed to load:', model.path, error);
            loadedCount++;
            if (loadedCount === totalModels) {
              this.hideLoadingOverlay();
            }
          }
        );
      });
    }

    hideLoadingOverlay() {
      const overlay = document.getElementById('loading-overlay');
      const introBox = document.querySelector('.intro-box');
    setTimeout(() => {
        if (overlay) overlay.classList.add('hidden');

        if (introBox) introBox.classList.add('visible');

         this.animationStartTime = performance.now();
         this.isAnimatingCamera = true;
      }, 1000);
    }


  setupEventListeners() {
    this.handleWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('keydown', (event) => {
      if (event.key === 'l') {
        console.log('Camera Position:', this.camera.position);
        console.log('Camera Target:', this.controls.target);
      }
    });


  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    if (this.isAnimatingCamera) {
      const elapsed = performance.now() - this.animationStartTime;
      const t = Math.min(elapsed / this.animationDuration, 1); // normalized [0..1]

      // Linear interpolation between start and end positions
      this.camera.position.lerpVectors(this.cameraStartPos, this.cameraEndPos, t);

      if (t === 1) {
        this.isAnimatingCamera = false;  // stop animating after end reached
      }
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
