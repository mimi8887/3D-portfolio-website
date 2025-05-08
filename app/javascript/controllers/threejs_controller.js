import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/controls/OrbitControls.js";

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
    // this.renderer.setClearColor(0x000000);
    this.renderer.setClearColor(0x444444); // Medium gray background
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.element.appendChild(this.renderer.domElement);

    // Scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(30, 10, 30);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.minPolarAngle = 0.5;
    this.controls.maxPolarAngle = 1.5;
    this.controls.autoRotate = false;
    this.controls.target = new THREE.Vector3(2, 2.5, 1);
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

    const light = new THREE.AmbientLight( 0xa400f0, 1 );
    this.scene.add(light);
    // Other lights setup similarly...
    // [Keep the rest of your lighting setup code here]
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

    const loader = new GLTFLoader();
    models.forEach(model => {
      loader.load(`${model.path}`, (gltf) => {
        gltf.scene.traverse((child) => {
          console.log("mesh loaded")
          if (child.isMesh) {
            if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        gltf.scene.scale.set(model.scale, model.scale, model.scale);
        this.scene.add(gltf.scene);
      });
      (error) => {
        console.error('Failed to load:', model.path);
        console.error('Full URL attempted:', error.url);
      }
    });
  }

  setupEventListeners() {
    this.handleWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', this.handleWindowResize);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
