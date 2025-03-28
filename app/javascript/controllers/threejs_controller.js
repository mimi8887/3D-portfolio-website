import { Controller } from "@hotwired/stimulus";
import * as THREE from "three";

export default class extends Controller {
  connect() {
    console.log("hello, stimulus!", this.element);
    console.log("Three.js version:", THREE.REVISION);
    console.log("Three.js classes:", {
      Scene: THREE.Scene,
      WebGLRenderer: THREE.WebGLRenderer
    });
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, this.element.clientWidth / this.element.clientHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.element });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // this.originCube = this.createCube(0, 0, 0);
    // this.scene.add(this.originCube);

    // this.camera.position.set(0, 5, 10);
    // this.camera.lookAt(0, 0, 0);

    this.addArtworks();

    this.animate();
  }

  addArtworks() {
    const count = 6; // Number of green code items
    const rootNode = new THREE.Object3D();
    this.scene.add(rootNode);

    for (let i = 0; i < count; i++) {
      const baseNode = new THREE.Object3D();
      baseNode.rotation.y = i * (2 * Math.PI / count); // Rotate around the center
      rootNode.add(baseNode);

      // Border
      const border = new THREE.Mesh(
        new THREE.BoxGeometry(3.1, 4.1, 0.09),
        new THREE.MeshBasicMaterial({ color: 0x202020 }) // Dark border
      );
      border.name = `Border_${i}`;
      border.position.z = -4;
      baseNode.add(border);

      // Artwork (Green code block)
      const artwork = new THREE.Mesh(
        new THREE.BoxGeometry(3, 4, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // Bright green
      );
      artwork.name = `Art_${i}`;
      artwork.position.z = -4;
      baseNode.add(artwork);

      // Left arrow
      const leftArrow = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.01),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        })
      );
      leftArrow.name = `LeftArrow_${i}`;
      leftArrow.position.set(-1.8, 0, -4);
      baseNode.add(leftArrow);

      // Right arrow
      const rightArrow = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.01),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        })
      );
      rightArrow.name = `RightArrow_${i}`;
      rightArrow.position.set(1.8, 0, -4);
      baseNode.add(rightArrow);
    }

    this.rootNode = rootNode; // Save the rootNode for potential future updates
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Rotate the cube
    // this.originCube.rotation.x += 0.01;
    // this.originCube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  createCube(x, y, z) {
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x, y, z);

    return cube;
  }
}
