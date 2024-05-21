document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const menu = document.getElementById("menu")
  const carousels = document.querySelectorAll(".carousel")
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")
  const checkoutButton = document.getElementById("checkout-button")
  const checkoutSection = document.getElementById("checkout")
  const checkoutForm = document.getElementById("checkout-form")
  let cart = []

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open")
  })

  carousels.forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner")
    const prevButton = carousel.querySelector(".carousel-control.prev")
    const nextButton = carousel.querySelector(".carousel-control.next")
    let currentIndex = 0

    prevButton.addEventListener("click", () => {
      currentIndex = Math.max(currentIndex - 1, 0)
      updateCarousel()
    })

    nextButton.addEventListener("click", () => {
      currentIndex = Math.min(currentIndex + 1, inner.children.length - 1)
      updateCarousel()
    })

    // Touch event handlers
    let startX = 0
    let isDragging = false

    inner.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      isDragging = true
    })

    inner.addEventListener("touchmove", (e) => {
      if (!isDragging) return
      const currentX = e.touches[0].clientX
      const diffX = startX - currentX

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          currentIndex = Math.min(currentIndex + 1, inner.children.length - 1)
        } else {
          currentIndex = Math.max(currentIndex - 1, 0)
        }
        updateCarousel()
        isDragging = false // Reset dragging state
      }
    })

    inner.addEventListener("touchend", () => {
      isDragging = false
    })

    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`
    }
  })

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId
      const productName = button.dataset.productName
      const productPrice = parseFloat(button.dataset.productPrice)
      addToCart(productId, productName, productPrice)
    })
  })

  function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      })
    }
    updateCart()
  }

  function updateCart() {
    cartItems.innerHTML = ""
    let total = 0
    cart.forEach((item) => {
      const li = document.createElement("li")
      li.textContent = `${item.name} - R$${item.price.toFixed(2)} x ${
        item.quantity
      }`
      cartItems.appendChild(li)
      total += item.price * item.quantity
    })
    cartTotal.textContent = total.toFixed(2)
  }

  checkoutButton.addEventListener("click", () => {
    checkoutSection.style.display = "block"
  })

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault()
    alert("Compra realizada com sucesso!")
    cart = []
    updateCart()
    checkoutSection.style.display = "none"
  })
})
////////////////////////////////////
