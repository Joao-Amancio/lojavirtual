let menuOpen = false
let cartTotal = 0
let autoSlideInterval
let isPaused = false

function toggleMenu() {
  const navMenu = document.getElementById("nav-menu")
  const menuIcon = document.querySelector(".menu-icon")
  if (menuOpen) {
    navMenu.classList.remove("show")
    menuIcon.classList.remove("change")
  } else {
    navMenu.classList.add("show")
    menuIcon.classList.add("change")
  }
  menuOpen = !menuOpen
}

let slideIndex1 = 0
showSlides(1)
startAutoSlide()

function nextSlide(n) {
  showSlides((slideIndex1 += n))
}

function prevSlide(n) {
  showSlides((slideIndex1 -= n))
}

function showSlides(n) {
  let i
  const slides = document.querySelectorAll("#carrossel1 .carousel-slide")
  if (n >= slides.length) {
    slideIndex1 = 0
  }
  if (n < 0) {
    slideIndex1 = slides.length - 1
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slides[slideIndex1].style.display = "block"
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide(1)
  }, 3000)
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval)
}
