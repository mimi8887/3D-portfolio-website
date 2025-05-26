import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content"]

  connect() {
    this.modal = new bootstrap.Modal(this.contentTarget)
    this.carousel = null
  }

  open(event) {
    event.preventDefault()
    const url = event.currentTarget.href

    fetch(url, {
      headers: { Accept: "text/vnd.turbo-stream.html" }
    })
    .then(response => response.text())
    .then(html => {
      this.contentTarget.innerHTML = html
      this.modal.show()

      // Initialize carousel after modal is shown
      this.contentTarget.addEventListener('shown.bs.modal', () => {
        this.initializeCarousel()
      }, { once: true })
    })
  }

  initializeCarousel() {
    // Destroy previous carousel instance if exists
    if (this.carousel) {
      this.carousel.dispose()
    }

    const carouselEl = this.contentTarget.querySelector('#projectCarousel')
    if (carouselEl) {
      this.carousel = new bootstrap.Carousel(carouselEl, {
        interval: false
      })
    }
  }

  close() {
    this.modal.hide()
    if (this.carousel) {
      this.carousel.dispose()
    }
  }
}
