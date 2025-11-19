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

    this.clock = new THREE.Clock(); // For animation mixer

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
    spotLight2Target.position.set(0, 0, -1);
    spotLight2Parent.add(spotLight2Target);
    spotLight2.target = spotLight2Target;

    const spotLight3 = new THREE.SpotLight(new THREE.Color(0.8, 0.3, 1), 500, 200, 0.22, 1);
    spotLight3.position.set(20, 10.5, 20);
    spotLight3.castShadow = true;
    spotLight3.shadow.bias = -0.0001;
    this.scene.add(spotLight3);

    const pointLight = new THREE.PointLight(new THREE.Color(0.351, 0.498, 1), 4, 50);
    pointLight.position.set(-2.6, 1.7, 4.8);
    this.scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(new THREE.Color(0.695, 0.326, 0.695), 2, 50);
    pointLight2.position.set(-2.6, 2.8, -0.2);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(new THREE.Color(0.5, 0.226, 0.616), 0.5, 200, 1.5);
    pointLight3.position.set(-5.1, 4.65, 1.1);
    this.scene.add(pointLight3);
  }

  loadModels() {
    const loader = new GLTFLoader();
    const models = [
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957973/wall-floor_gg9py9.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957969/chair_jalkad.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957974/desk_hok2y1.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957971/screens_stywns.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957973/curtain_n4tawg.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957970/bed_nsskmq.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957971/left_wall_dgz64a.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957971/aquarium_yllcje.glb', scale: 0.5 },
      { path: 'https://res.cloudinary.com/dlmjemn37/image/upload/v1748957968/low-table_ppc7nj.glb', scale: 0.5 }
    ];

    let loadedCount = 0;
    const totalModels = models.length + 1; // +1 for furry model

    // Load original models
    models.forEach(model => {
      loader.load(model.path, (gltf) => {
        gltf.scene.traverse(child => {
          if (child.isMesh) {
            if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        gltf.scene.scale.set(model.scale, model.scale, model.scale);
        this.scene.add(gltf.scene);
        loadedCount++;
        if (loadedCount === totalModels) this.hideLoadingOverlay();
      });
    });

    // Load furry model with animation
    loader.load(
      'https://res.cloudinary.com/dlmjemn37/image/upload/v1763575264/furry_idle_test_3_gy558n.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse(child => {
          if (child.isMesh) {
            if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Original position/scale/rotation
        model.position.set(1.6, 0.2, 3.4);
        model.scale.set(0.065, 0.065, 0.065);
        model.rotation.set(0, 1.19, 0);

        this.furryModel = model;
        this.scene.add(this.furryModel);

        // GUI for scale and rotation only
        this.setupGUI();

        // Animation mixer
        if (gltf.animations && gltf.animations.length > 0) {
          this.furryMixer = new THREE.AnimationMixer(model);
          this.furryAction = this.furryMixer.clipAction(gltf.animations[0]);
          this.furryAction.play();
        }

        loadedCount++;
        if (loadedCount === totalModels) this.hideLoadingOverlay();
      },
      undefined,
      (error) => {
        console.error('Failed to load furry model', error);
        loadedCount++;
        if (loadedCount === totalModels) this.hideLoadingOverlay();
      }
    );
  }

  setupGUI() {
    // if (!this.furryModel) return;
    // const gui = new GUI();
    // const scaleFolder = gui.addFolder('Furry Model Scale');
    // scaleFolder.add(this.furryModel.scale, 'x', 0.01, 0.1, 0.01).name('scale');
    // scaleFolder.add(this.furryModel.scale, 'y', 0.01, 0.1, 0.01).name('scale');
    // scaleFolder.add(this.furryModel.scale, 'z', 0.01, 0.1, 0.01).name('scale');

    // const rotationFolder = gui.addFolder('Furry Model Rotation');
    // rotationFolder.add(this.furryModel.rotation, 'x', 0, Math.PI * 2, 0.01);
    // rotationFolder.add(this.furryModel.rotation, 'y', 0, Math.PI * 2, 0.01);
    // rotationFolder.add(this.furryModel.rotation, 'z', 0, Math.PI * 2, 0.01);
    // scaleFolder.open();
    // rotationFolder.open();

    // const positionFolder = gui.addFolder('Furry Model Position');
    // positionFolder.add(this.furryModel.position, 'x', -10, 10, 0.1);
    // positionFolder.add(this.furryModel.position, 'y', -10, 10, 0.1);
    // positionFolder.add(this.furryModel.position, 'z', -10, 10, 0.1);
    // positionFolder.open();

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

  showRotateHint() {
    const hint = document.getElementById('rotate-hint');
    if (!hint) return;
    hint.classList.add('show');
    setTimeout(() => {
      hint.classList.remove('show');
    }, 1500);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    // Camera animation
    if (this.isAnimatingCamera) {
      const elapsed = performance.now() - this.animationStartTime;
      const t = Math.min(elapsed / this.animationDuration, 1);
      this.camera.position.lerpVectors(this.cameraStartPos, this.cameraEndPos, t);
      if (t === 1 && this.isAnimatingCamera) {
        this.isAnimatingCamera = false;
        const hint = document.getElementById('rotate-hint');
        if (hint) {
          hint.classList.remove('show');
          void hint.offsetWidth;
          hint.classList.add('show');
          setTimeout(() => { hint.classList.remove('show'); }, 3000);
        }
      }
    }

    // Update animation mixer
    const delta = this.clock.getDelta();
    if (this.furryMixer) this.furryMixer.update(delta);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
