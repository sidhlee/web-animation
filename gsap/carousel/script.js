const carousel = document.querySelector('.carousel');
const indicators = document
  .querySelector('.indicators')
  .querySelectorAll('button');

// Transform value
let value = 0;
let currentItemIndex = 0;
let intervalId;
/** GSAP timeline instance */
let timeline;
const DURATION = 4000;
const ITEM_SIZE = 5;

const itemTexts = ['first', 'second', 'third', 'fourth', 'fifth'];

function getCarouselItem(index) {
  return `
    <div class="box${index + 1} box">
        <div class="bg-layer"></div>
        <div class="details">
          <h1>I'm the ${itemTexts[index]} Box</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Integer lacinia dui lectus. Donec scelerisque ipsum
            diam, ac mattis orci pellentesque eget.
          </p>
          <button class="check-now">Check Now</button>
        </div>

        <div class="illustration">
          <div class="inner"></div>
        </div>
      </div>
    `;
}

function insertCarouselItems(size = ITEM_SIZE) {
  const items = [...Array(size)].map((_, i) => getCarouselItem(i)).join('');
  document.querySelector('.carousel').innerHTML = items;
}

const slide = (direction = 'right') => {
  if (direction === 'left') {
    updateItemIndex('decrease');
  } else {
    updateItemIndex('increase');
  }
  renderCarousel();
};

function renderCarousel() {
  updateActive();
  translateCarousel();
  startTimeline();
}

function updateActive() {
  indicators.forEach((indicator, i) => {
    if (i === currentItemIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

function updateItemIndex(how) {
  if (how === 'increase') {
    currentItemIndex = (currentItemIndex + 1) % ITEM_SIZE;
  } else if (how === 'decrease') {
    currentItemIndex = (ITEM_SIZE + currentItemIndex + -1) % ITEM_SIZE;
  } else if (typeof how === 'number' && how >= 0 && how < ITEM_SIZE) {
    currentItemIndex = how;
  }
}

function translateCarousel() {
  const x = currentItemIndex * (100 / ITEM_SIZE);
  carousel.style.transform = `translateX(-${x}%)`;
}

function startTimeline() {
  timeline = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power2.inOut' },
  });
  timeline
    .from('.bg-layer', { x: '-100%', opacity: 0 })
    .from('p', { opacity: 0 }, '-=0.3') // start animation 0.3 seconds before previous animation ends
    .from('h1', { opacity: 0, y: '30px' }, '-=0.3')
    .from('.check-now', { opacity: 0, y: '-40px' }, '-=.8');
}

const restartTimeline = () => timeline.restart();

function stopCarousel() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

function startCarousel() {
  stopCarousel();
  intervalId = setInterval(() => slide('right'), DURATION);
}

function handleIndicatorClick(e) {
  clearInterval(intervalId);
  const selectedItemIndex = this.textContent - 1;
  currentItemIndex = selectedItemIndex;
  renderCarousel();
  intervalId = setInterval(() => slide('increase'), DURATION);
}

const handlePrevButtonClick = (e) => {
  clearInterval(intervalId);
  slide('left');
  intervalId = setInterval(() => slide('right'), DURATION);
};
const handleNextButtonClick = (e) => {
  clearInterval(intervalId);
  slide('right');
  intervalId = setInterval(() => slide('right'), DURATION);
};

// Mobile touch Slide Section
function setupMobileTouchSlide() {
  let xStart, xMove, xDelta, carouselWidth;

  carousel.addEventListener('touchstart', (e) => {
    stopCarousel();
    // Reset carousel width to account for possible viewport resize.
    carouselWidth = carousel.clientWidth / ITEM_SIZE;
    xStart = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', (e) => {
    e.preventDefault();
    // get the touche position of X on the screen when dragging stops
    xMove = e.touches[0].clientX;
    xDelta = xMove - xStart;
  });

  const handleCarouselTouchEnd = (e) => {
    // if change is greater than a quarter of sliderWidth, next else Do NOTHING
    if (Math.abs(xDelta) > carouselWidth / 4) {
      if (xDelta > 0) slide('left');
      if (xDelta < 0) slide('right');
    }

    [xStart, xMove, xDelta, carouselWidth] = [0, 0, 0, 0];
    startCarousel();
  };
  // call mobile on touch end
  carousel.addEventListener('touchend', handleCarouselTouchEnd);
}

const app = {
  init() {
    // populate carousel items
    insertCarouselItems();

    // bind events
    document
      .getElementById('prev-btn')
      .addEventListener('click', handlePrevButtonClick);
    document
      .getElementById('next-btn')
      .addEventListener('click', handleNextButtonClick);
    indicators.forEach((indicator) =>
      indicator.addEventListener('click', handleIndicatorClick)
    );

    setupMobileTouchSlide();

    // start initial animation
    startTimeline();
    startCarousel();
  },
};

app.init();
