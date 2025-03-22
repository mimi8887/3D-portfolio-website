import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";

export default class extends Controller {
  connect() {
    console.log("hello, stimulus!", this.element);
    console.log("Three.js version:", THREE.REVISION); // Should show 174
    console.log("Three.js classes:", {
      Scene: THREE.Scene,
      WebGLRenderer: THREE.WebGLRenderer
    });
    // Set up the scene, camera, and renderer
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.element.clientWidth / this.element.clientHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.element });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Geometry and material for the cube
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create and add the cube
    this.originCube = this.createCube(0, 0, 0);
    this.scene.add(this.originCube);

    // Set the camera position
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    // Start animation
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Rotate the cube
    this.originCube.rotation.x += 0.01;
    this.originCube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  createCube(x, y, z) {
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x, y, z);

    return cube;
  }
}
