console.log('bunny javascript working');
const levelProperties = [
  {
    level: 1,
    holes: 9,
    heightAndWidth: 100 / 3 + '%',
    hasSnakes: true,
  },
  {
    level: 2,
    holes: 16,
    heightAndWidth: 100 / 4 + '%',
    hasSnakes: true,
  },
  {
    level: 3,
    holes: 25,
    heightAndWidth: 100 / 5 + '%',
    hasSnakes: true,
  },
  {
    level: 4,
    holes: 36,
    heightAndWidth: 100 / 6 + '%',
    hasSnakes: true,
  },
];

class Bunny {
  constructor() {
    // setInterval timer - store so it can be stopped
    this.bunnyTimer; 
    // setTimeout timer - store so it can be stopped
    this.bunnyTimeout;
    this.DOMElement;
    this.points = 1;
  }
  // func - make DOM element
  makeElement = () => {
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/bunny.svg');
    bunnyImg.setAttribute('class', 'bunny');
    this.DOMElement = bunnyImg;
    return bunnyImg;
  }
  // func - make bunny timer
  makeBunnyTimer = (bunny) => {
    // do every 5 s
    const bunnyTimer = setInterval(function () {
      // remove any class added to bunny
      if (bunny.classList.contains('clicked')) {
        bunny.classList.remove('clicked');
      }
      // hide bunny
      bunny.style['display'] = 'none';
      console.log('bunny display removed');

      const bunnyTimeout = setTimeout(function () {
        // show bunny for 2s
        bunny.style.removeProperty('display');
        console.log('showing bunny');
        this.bunnyTimeout = bunnyTimeout;
      }, Math.floor(Math.random() * 500) + 1000)

      // turn display off
      bunny.style['display'] = 'none';
    }, Math.floor(Math.random() * 2000) + 2000)
    this.bunnyTimer = bunnyTimer;
    return bunnyTimer;
  }
  // func - stop bunny timer
  stopTimers = () => {
    clearInterval(this.bunnyTimer);
    clearTimeout(this.bunnyTimeout);
  }
}

//const testBunny = new Bunny();
//testBunny.makeElement();
//testBunny.makeBunnyTimer(testBunny.DOMElement);
//console.log('testBunny DOM', testBunny.DOMElement);
//console.log('testBunny timer', testBunny.bunnyTimer);
//testBunny.stopTimers();

class Snake {
  constructor() {
    this.snakeTimer;
    this.snakeTimeout;
    this.DOMElement;
    this.points = -5;
  }
  // func - make snake DOM element
  makeElement() {
    const snakeImg = document.createElement('img');
    snakeImg.setAttribute('src', 'img/snake.svg');
    snakeImg.setAttribute('class', 'snake');
    this.DOMElement = snakeImg;
  }
}

const testSnake = new Snake();
testSnake.makeElement();
console.log(testSnake.DOMElement);

// hole area class
class HoleArea {
  constructor() {
    this.bunny;
    this.snake;
    this.hole;
    this.DOMElement;
  }
  // func - make hole-area DOM element
  makeElement() {
    // create hole area 
    const holeArea = document.createElement('div');
    holeArea.setAttribute('class', 'hole-area');
    // create hole images
    const holeImg = document.createElement('img');
    holeImg.setAttribute('src', 'img/hole.svg');
    holeImg.setAttribute('class', 'hole');
    // make bunny element
    // create bunny object
    const bunny = new Bunny();
    bunny.makeElement();
    // make snake element
    const snake = new Snake();
    snake.makeElement();

    this.hole = holeImg;
    this.bunny = bunny;
    this.snake = snake;
    this.DOMElement = holeArea;
  }

}

const holeArea = new HoleArea;
holeArea.makeElement();
holeArea.hole;
console.log(holeArea.bunny);
holeArea.snake;
holeArea.DOMElement;

const playingFieldObject = {
  // bunnies made
  bunnyArray: [],
  // level timer
  levelTimer: null,
  // func - start level timer

  // func - make level
  makeLevel(level) {
    // grab playing-field
    const playingField = document.querySelector('.playing-field');
    const levelObject = levelProperties[level - 1];
    // set level
    const levelSpan = document.querySelector('#level span');
    levelSpan.textContent = level;
    for (let i = 1; i <= levelObject.holes; i++) {
      // create div w/ class 'hole-area'
      //const holeArea = document.createElement('div');
      //holeArea.setAttribute('class', 'hole-area');
      const holeArea = new HoleArea();
      holeArea.makeElement();
      holeArea.DOMElement.style['height'] = levelObject.heightAndWidth;
      holeArea.DOMElement.style['width'] = levelObject.heightAndWidth;
      // create hole images
      //const holeImg = document.createElement('img');
      //holeImg.setAttribute('src', 'img/hole.svg');
      //holeImg.setAttribute('class', 'hole');

      // create bunny object
      //const bunny = new Bunny();
      //bunny.makeElement();

      // append images to hole-area
      holeArea.DOMElement.appendChild(holeArea.hole);
      holeArea.DOMElement.appendChild(holeArea.bunny.DOMElement);

      // append hole-area to playing field
      playingField.appendChild(holeArea.DOMElement);
      console.log('making holes')

      // start bunny timers
      holeArea.bunny.makeBunnyTimer(holeArea.bunny.DOMElement);
      this.bunnyArray.push(holeArea.bunny);

      // if level has snakes, create snakes
      if (levelObject.hasSnakes) {
        //const snake = new Snake();
        //snake.makeElement();
        holeArea.DOMElement.appendChild(holeArea.snake.DOMElement);
      }
    }
  },
  clearPlayingField() {
    // remove all children of playing-field div
    while (playingField.firstChild) {
      playingField.removeChild(playingField.firstChild);
    }
    // stop all timers
    for (let i = 0; i < this.bunnyArray.length; i++) {
      this.bunnyArray[i].stopTimers();
    }
  }
}

// set timer
let time = 30;
// update timer on game board
const timerElement = document.querySelector('#timer span');
const setTimer = () => {
  const timer = setInterval( () => {
    timerElement.textContent = time;
    if (time === 0) {
      timerElement.textContent = time;
      clearInterval(timer);
      playingFieldObject.clearPlayingField();
    }
    time --;
  }, 1000)
  return timer;
}

// click on bunny, make it disappear;
const playingField = document.querySelector('.playing-field');

playingField.addEventListener('click', (event) => {
  console.log(event);
  const clickedOn = event.target;
  let scoreSpan = document.querySelector('#score span');
  if (clickedOn.className === 'bunny') {
    console.log('clicked bunny');
    clickedOn.classList.add('clicked');
    // add 1 point for each bunny click
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + 1;
  }
  else if (clickedOn.className === 'snake') {
    console.log('clicked snake');
    clickedOn.classList.add('clicked');
    // -5 pts for snake
    scoreSpan.textContent = parseInt(scoreSpan.textContent) - 5;
  }
}
)

// start/stop button
const startStop = document.querySelector('#start-stop button');
let gameTimer;
startStop.addEventListener('click', () => {
  if (startStop.classList.contains('start')) {
    startStop.classList.remove('start');
    startStop.classList.add('stop');
    startStop.textContent = 'STOP';

    playingFieldObject.makeLevel(1);
    time = 30;
    gameTimer = setTimer();
  }
  else if (startStop.classList.contains('stop')) {
    playingFieldObject.clearPlayingField();
    clearInterval(gameTimer);

    startStop.classList.remove('stop');
    startStop.classList.add('start');
    startStop.textContent = 'START';
  }
})

// next level button
const nextLevel = document.querySelector('.next-level button');

nextLevel.addEventListener('click', () => {
  clearInterval(gameTimer);
  playingFieldObject.clearPlayingField();
  const levelSpan = document.querySelector('#level span');
  const level = parseInt(levelSpan.textContent) + 1;
  levelSpan.textContent = level;
  playingFieldObject.makeLevel(level);
  time = 30;
  gameTimer = setTimer();

})