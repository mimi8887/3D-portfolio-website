import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content"]

  connect() {
    console.log("Modal controller connected!");
    this.modal = new bootstrap.Modal(this.contentTarget)
  }

  open(event) {
    event.preventDefault()
    console.log("Modal#open triggered!")
    const url = event.currentTarget.href

    fetch(url, {
      headers: { Accept: "text/vnd.turbo-stream.html" }
    })
      .then(response => response.text())
      .then(html => {
        this.contentTarget.innerHTML = html
        this.modal.show()
      })
  }

  close() {
    this.modal.hide()
  }
}
