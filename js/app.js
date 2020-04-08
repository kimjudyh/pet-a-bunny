console.log('bunny javascript working');
const levelProperties = [
  {
    level: 1,
    holes: 4,
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
    // param bunny: DOM element of the bunny
    // do every 5 s
      // remove any class added to bunny
      //if (bunny.classList.contains('clicked')) {
      //  bunny.classList.remove('clicked');
      //}
      //// hide bunny
      //bunny.style['display'] = 'none';
      //console.log('bunny display removed');
      let randomDuration = Math.floor(Math.random() * 500) + 500;
      console.log('random bunny ', randomDuration);
      const bunnyTimeout = setTimeout(function () {
        // show bunny 
        bunny.style.removeProperty('display');
        console.log('showing bunny');
        this.bunnyTimeout = bunnyTimeout;
      }, randomDuration)

      // turn display off
     // bunny.style['display'] = 'none';
  }
  // func - stop bunny timer
  stopTimers = () => {
    clearTimeout(this.bunnyTimer);
    clearTimeout(this.bunnyTimeout);
  }
}


class Snake {
  constructor() {
    this.snakeTimer;  // change name to repeatingTimer
    this.snakeTimeout;  // change name to durationTimer
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
  // func - make snake timer
  makeSnakeTimer(snake) {
    // do every x sec
      // remove any class added to snake
      //console.log(snake);
      //if (snake.classList.contains('clicked')) {
      //  snake.classList.remove('clicked');
      //}
      //// hide snake
      //snake.style['display'] = 'none';
      //console.log('snake display removed');

      // show snake for y sec
      const timeout = setTimeout(function() {
        snake.style.removeProperty('display');
        console.log('showing snake');
        this.snakeTimeout = timeout;
      }, Math.floor(Math.random() * 500) + 1000);
      // hide snake
      //snake.style['display'] = 'none';

  }
  stopTimers() {
    clearTimeout(this.snakeTimer);
    clearTimeout(this.snakeTimeout);
  }
}


// tile class
class Tile {
  constructor() {
    this.bunny;
    this.snake;
    this.hole;
    this.DOMElement;
    this.repeatingTimer;
    this.interval;
    this.durationTimer;
    this.duration;
    this.animalTimer;
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
  };
  chooseAnimalTimer = (snake, bunny) => {
    // every 5s, choose which animal to display, ex. snake or bunny
    const animalTimer = setInterval(function() {
      console.log('animal timer running');
      let num = Math.floor(Math.random() * 12);
      console.log('rand num', num);

      if (num < 11) {
        // if bunny timer already running, do nothing
        // if not, stop all other timers
        // start bunny timer
        //bunny.stopTimers();
        snake.stopTimers();
        // hide snake
        snake.DOMElement.style['display'] = 'none';

        // remove any class added to bunny
        if (bunny.DOMElement.classList.contains('clicked')) {
          bunny.DOMElement.classList.remove('clicked');
        }
        // hide bunny
        bunny.DOMElement.style['display'] = 'none';
        console.log('bunny display removed');
        // start bunny timer
        bunny.makeBunnyTimer(bunny.DOMElement);
        // turn display off
        bunny.DOMElement.style['display'] = 'none';
      }
      else {
        // snake
        bunny.stopTimers();
        //snake.stopTimers();
        // hide bunny
        bunny.DOMElement.style['display'] = 'none';

        // remove any class added to snake
        if (snake.DOMElement.classList.contains('clicked')) {
          snake.DOMElement.classList.remove('clicked');
        }
        // hide snake
        //snake.DOMElement.style['display'] = 'none';
        console.log('snake display removed');
        //start snake timer
        snake.makeSnakeTimer(snake.DOMElement);
        // hide snake
        snake.DOMElement.style['display'] = 'none';
      }
      console.log('created snake or bunny timer');
    }, Math.floor(Math.random() * 3000) + 2000);
    this.animalTimer = animalTimer;
    //this.interval = Math.floor(Math.random() * 2000) + 2000;
    //this.duration = Math.floor(Math.random() * 500) + 1000;
  }
  stopTimers() {
    clearInterval(this.animalTimer);
    this.bunny.stopTimers();
    this.snake.stopTimers();
  }

}


const playingFieldObject = {
  // bunnies made
  bunnyArray: [],
  // tiles made
  tileArray: [],
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
      // make new Tile object
      const tile = new Tile();
      tile.makeElement();
      tile.DOMElement.style['height'] = levelObject.heightAndWidth;
      tile.DOMElement.style['width'] = levelObject.heightAndWidth;

      // append images to hole-area
      tile.DOMElement.appendChild(tile.hole);
      tile.DOMElement.appendChild(tile.bunny.DOMElement);

      // if level has snakes, create snakes
      if (levelObject.hasSnakes) {
        // set display to none
        tile.snake.DOMElement.style['display'] = 'none';
        tile.DOMElement.appendChild(tile.snake.DOMElement);
      }

      // append hole-area to playing field
      playingField.appendChild(tile.DOMElement);
      console.log('making holes')

      // push tiles to tileArray
      this.tileArray.push(tile);
      this.bunnyArray.push(tile.bunny);

    }
  },
  clearPlayingField() {
    // remove all children of playing-field div
    while (playingField.firstChild) {
      playingField.removeChild(playingField.firstChild);
    }
    // stop all timers
    for (let i = 0; i < this.tileArray.length; i++) {
      this.tileArray[i].stopTimers();
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
    // time has reached 0
    if (time === 0) {
      timerElement.textContent = time;
      // stop timer, clear playing field
      clearInterval(timer);
      playingFieldObject.clearPlayingField();
    }
    // decrement time
    time --;
  }, 1000)
  return timer;
}

// click on bunny, make it disappear;
const playingField = document.querySelector('.playing-field');

playingField.addEventListener('click', (event) => {
  console.log(event);
  // get target of click event
  const clickedOn = event.target;
  // get score DOM element
  let scoreSpan = document.querySelector('#score span');
  // if clicked bunny
  if (clickedOn.className === 'bunny') {
    console.log('clicked bunny');
    // add clicked class to change display
    clickedOn.classList.add('clicked');
    // add 1 point for each bunny click
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + 1;
  }
  // if clicked snake
  else if (clickedOn.className === 'snake') {
    console.log('clicked snake');
    // add clicked class to change display
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
  // button says start
  if (startStop.classList.contains('start')) {
    startStop.classList.remove('start');
    // change button to stop
    startStop.classList.add('stop');
    startStop.textContent = 'STOP';

    // make level 1
    playingFieldObject.makeLevel(1);
    // start animal timers
    for (let i = 0; i < playingFieldObject.tileArray.length; i++) {
      playingFieldObject.tileArray[i].chooseAnimalTimer(playingFieldObject.tileArray[i].snake, playingFieldObject.tileArray[i].bunny);
    }
    // set level countdown timer
    time = 30;
    gameTimer = setTimer();
  }
  // button says stop
  else if (startStop.classList.contains('stop')) {
    // clear playing field, stop animal timers
    playingFieldObject.clearPlayingField();
    // stop level countdown timer
    clearInterval(gameTimer);

    // change button to start
    startStop.classList.remove('stop');
    startStop.classList.add('start');
    startStop.textContent = 'START';
  }
})

// next level button
const nextLevel = document.querySelector('.next-level button');

nextLevel.addEventListener('click', () => {
  // stop level timer
  clearInterval(gameTimer);
  // remove objects, stop animal timers
  playingFieldObject.clearPlayingField();
  // update level
  const levelSpan = document.querySelector('#level span');
  const level = parseInt(levelSpan.textContent) + 1;
  levelSpan.textContent = level;
  // make next level
  playingFieldObject.makeLevel(level);
  // start animal timers
  for (let i = 0; i < playingFieldObject.tileArray.length; i++) {
    playingFieldObject.tileArray[i].chooseAnimalTimer(playingFieldObject.tileArray[i].snake, playingFieldObject.tileArray[i].bunny);
  }
  // reset timer
  time = 30;
  gameTimer = setTimer();

})