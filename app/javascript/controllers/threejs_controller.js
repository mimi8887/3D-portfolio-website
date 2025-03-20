import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="threejs"
export default class extends Controller {
  connect() {
    console.log("Hello stimulus", this.element);
  }
}
