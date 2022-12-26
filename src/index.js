import mario from './images/mario.png'
import luigi from './images/luigi.png'
import toad from './images/toad.png'
import bowser from './images/bowser.png'
import characters from './images/characters.webp'
import './styles/index.css'

const images = [mario, luigi, toad, bowser, characters]
let index = 0
const intervalTime = 2000
let slideshow = window.setInterval(handleNext, intervalTime)
setUpSlider()

// FUNCTIONS
function handlePrevious(userClick) {
  document.querySelector('.slide.right').remove()
  document.querySelector('.slide.visible').className = 'slide right'
  document.querySelector('.slide.left').className = 'slide visible'
  if(--index < 0) index = images.length - 1
  document.querySelector('.slider').insertBefore(
    createSlide(images[getImageIndex(true)], 'left'),
    document.querySelector('.slide.visible')
  )

  activateSelector(index)
  if(userClick) stopSlideShow()
}

function handleNext(userClick) {
  document.querySelector('.slide.left').remove()
  document.querySelector('.slide.visible').className = 'slide left'
  document.querySelector('.slide.right').className = 'slide visible'
  if(++index === images.length) index = 0
  document.querySelector('.slider').append(createSlide(images[getImageIndex()], 'right'))
  activateSelector(index)
  if(userClick) stopSlideShow()
}

function getImageIndex(left) {
  if(left) {
    if(index === 0) return images.length - 1
    else return index - 1
  }
  else {
    if(index === images.length - 1) return 0
    else return index + 1
  }
}

function setUpSlider() {
  const slider = document.querySelector('.slider')
  slider.append(createSlide(images[getImageIndex(true)], 'left'))
  slider.append(createSlide(images[index]))
  slider.append(createSlide(images[getImageIndex()], 'right'))
  document.querySelector('.left-button').onclick = () => handlePrevious(true)
  document.querySelector('.right-button').onclick = () => handleNext(true)
  slider.onclick = toggleSlideShow

  const imageSelectors = document.querySelector('.image-selectors')
  imageSelectors.innerHTML = `
    ${images.map((_image, index) => `<button id=${index}></button>`).join('')}
    <p>Click image to toggle slide show</p>
  `
  imageSelectors.querySelectorAll('button')
    .forEach(b => b.onclick = handleSelectorClick)
}

function createSlide(imageSrc, position) {
  const slide = document.createElement('div')
  slide.className = 'slide'
  if(position) slide.classList.add(position)
  else slide.classList.add('visible')

  const image = document.createElement('img')
  image.src = imageSrc
  slide.append(image)
  return slide
}

function handleSelectorClick(e) {
  if(index === parseInt(e.target.id)) return
  index = parseInt(e.target.id)
  document.querySelector('.slide.visible img').src = images[index]
  document.querySelector('.slide.left img').src = images[getImageIndex(true)]
  document.querySelector('.slide.right img').src = images[getImageIndex()]
  activateSelector(index)
  stopSlideShow()
}

function activateSelector(index) {
  document.querySelectorAll('.image-selectors button')
    .forEach(selector => selector.classList.remove('selected'))

  document.getElementById(index).classList.add('selected')
}

function toggleSlideShow(e){
  if(e.target.tagName === "BUTTON") return
  if(slideshow) return stopSlideShow()
  handleNext() // start without delay
  slideshow = window.setInterval(handleNext, intervalTime)
}

function stopSlideShow() {
  clearInterval(slideshow)
  slideshow = null
}
