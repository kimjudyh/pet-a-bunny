console.log('bunny javascript working');
const levelProperties = [
  {
    level: 1,
    holes: 6,
    heightAndWidth: 100 / 3 + '%',
    hasSnakes: true,
  },
  {
    level: 2,
    holes: 9,
    heightAndWidth: 100 / 3 + '%',
    hasSnakes: true,
  },
  {
    level: 3,
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

/** ======= CLASSES ======= **/
class Bunny {
  constructor() {
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
  hide() {
    // change display to none
    this.DOMElement.style['display'] = 'none';
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
      //let num = 1000; // 2 s
      //console.log('random bunny ', num);
      //const bunnyTimeout = setTimeout(function () {
      this.bunnyTimeout = setTimeout(function() {
        // show bunny 
        bunny.style.removeProperty('display');
        console.log('showing bunny');
        //this.bunnyTimeout = bunnyTimeout;
      //}, num);
      }, randomDuration);

      // turn display off
     // bunny.style['display'] = 'none';
  }
  // func - stop bunny timer
  stopTimers = () => {
    clearTimeout(this.bunnyTimer);
    clearTimeout(this.bunnyTimeout);
  }
}

class WhiteBunny extends Bunny {
  constructor() {
    super(); 
    this.points = 5;
  }
  makeElement = () => {
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/white_bunny.svg');
    bunnyImg.classList.add('bunny', 'white');
    this.DOMElement = bunnyImg;
    return bunnyImg;
  }
}

const testWhiteBunny = new WhiteBunny();
testWhiteBunny.makeElement();
console.log(testWhiteBunny.DOMElement);
console.log(testWhiteBunny.points);

class GoldBunny extends Bunny {
  constructor() {
    super();
    this.points = 10;
  }
  makeElement = () => {
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/gold_bunny.svg');
    bunnyImg.classList.add('bunny', 'gold');
    this.DOMElement = bunnyImg;
    return bunnyImg;
  }
}

const testGoldBunny = new GoldBunny();
testGoldBunny.makeElement();
console.log(testGoldBunny.DOMElement);
console.log(testGoldBunny.points);

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
  hide() {
    // change display to none
    this.DOMElement.style['display'] = 'none';
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
      this.snakeTimeout = setTimeout(function() {
        snake.style.removeProperty('display');
        console.log('showing snake');
        //this.snakeTimeout = timeout;
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
    this.interval;
    this.duration;
    this.animalTimer;
    this.whiteBunny; this.goldBunny;
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

    // special animals
    // create white bunny object
    const whiteBunny = new WhiteBunny();
    whiteBunny.makeElement();
    // create gold bunny object
    const goldBunny = new GoldBunny();
    goldBunny.makeElement(); 

    this.hole = holeImg;
    this.bunny = bunny;
    this.snake = snake;
    this.DOMElement = holeArea;
    this.whiteBunny = whiteBunny;
    this.goldBunny = goldBunny;
  };
  chooseAnimalTimer = (snake, bunny, whiteBunny, goldBunny) => {
    // params: objects
    // every x sec, choose which animal to display, ex. snake or bunny
    this.animalTimer = setInterval(function() {
      console.log('animal timer running');
      let num = Math.floor(Math.random() * 101);
      console.log('rand num', num);

      if (num <= 90) {
        // bunny
        snake.stopTimers();
        whiteBunny.stopTimers();
        goldBunny.stopTimers();
        // hide other animals
        snake.hide();
        whiteBunny.hide();
        goldBunny.hide();

        // remove any class added to bunny
        if (bunny.DOMElement.classList.contains('clicked')) {
          bunny.DOMElement.classList.remove('clicked');
        }
        // hide bunny
        bunny.hide();
        console.log('bunny display removed');
        // start bunny timer
        bunny.makeBunnyTimer(bunny.DOMElement);
        // turn display off
        bunny.hide();
      }
      else if (num >= 90 && num < 95) {
        // snake
        bunny.stopTimers();
        whiteBunny.stopTimers();
        goldBunny.stopTimers();
        // hide other animals
        bunny.hide();
        whiteBunny.hide();
        goldBunny.hide();

        // remove any class added to snake
        if (snake.DOMElement.classList.contains('clicked')) {
          snake.DOMElement.classList.remove('clicked');
        }
        // hide snake
        snake.hide();
        console.log('snake display removed');
        //start snake timer
        snake.makeSnakeTimer(snake.DOMElement);
        // hide snake
        snake.hide();
      }
      else if (num >= 95 && num < 100) {
        // white bunny
        // stop other timers
        bunny.stopTimers();
        goldBunny.stopTimers();
        snake.stopTimers();
        // hide other animals
        bunny.hide();
        goldBunny.hide();
        snake.hide();
        // remove any class added to white bunny
        if (whiteBunny.DOMElement.classList.contains('clicked')) {
          whiteBunny.DOMElement.classList.remove('clicked');
        }
        // hide white bunny
        whiteBunny.hide();
        // start white bunny timer
        whiteBunny.makeBunnyTimer(whiteBunny.DOMElement);
        // hide white bunny
        whiteBunny.hide();
      }
      else if (num === 100) {
        // gold bunny
        // stop other timers
        bunny.stopTimers();
        whiteBunny.stopTimers();
        snake.stopTimers();
        // hide other animals
        bunny.hide();
        whiteBunny.hide();
        snake.hide();
        // remove any class added to white bunny
        if (goldBunny.DOMElement.classList.contains('clicked')) {
          goldBunny.DOMElement.classList.remove('clicked');
        }
        // hide white bunny
        goldBunny.hide();
        // start white bunny timer
        goldBunny.makeBunnyTimer(goldBunny.DOMElement);
        // hide white bunny
        goldBunny.hide();
      }
      console.log('created snake or bunny timer');
    }, 2000);
    //}, Math.floor(Math.random() * 2000) + 1000);
    //this.animalTimer = animalTimer;
    //this.interval = Math.floor(Math.random() * 2000) + 2000;
    //this.duration = Math.floor(Math.random() * 500) + 1000;
  }
  stopTimers() {
    clearInterval(this.animalTimer);
    this.bunny.stopTimers();
    this.snake.stopTimers();
    this.whiteBunny.stopTimers();
    this.goldBunny.stopTimers();
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
      // set bunny display to none at beginning
      tile.bunny.hide();
      //tile.bunny.DOMElement.style['display'] = 'none';
      tile.DOMElement.appendChild(tile.bunny.DOMElement);
      // add special bunnies
      tile.whiteBunny.hide();
      tile.goldBunny.hide();
      //tile.whiteBunny.DOMElement.style['display'] = 'none';
      //tile.goldBunny.DOMElement.style['display'] = 'none';
      tile.DOMElement.appendChild(tile.whiteBunny.DOMElement);
      tile.DOMElement.appendChild(tile.goldBunny.DOMElement);

      // if level has snakes, create snakes
      if (levelObject.hasSnakes) {
        // set display to none
        tile.snake.hide();
        //tile.snake.DOMElement.style['display'] = 'none';
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
  startAnimalTimers() {
    // start animal timers
    for (let i = 0; i < this.tileArray.length; i++) {
      this.tileArray[i].chooseAnimalTimer(this.tileArray[i].snake, this.tileArray[i].bunny, this.tileArray[i].whiteBunny, this.tileArray[i].goldBunny);
    }

  },
  endLevel() {
    // stop all timers
    // hide all animals, but still show holes
    console.log('ending level');
    for (let i = 0; i < this.tileArray.length; i++) {
      console.log('stopping timers');
      this.tileArray[i].stopTimers();
      console.log('hiding animals');
      this.tileArray[i].bunny.hide();
      this.tileArray[i].whiteBunny.hide();
      this.tileArray[i].goldBunny.hide();
      this.tileArray[i].snake.hide();
    }
    console.log('done ending level');
  },
  clearPlayingField() {
    // remove all children of playing-field div
    console.log('clearing playing field');
    while (playingField.firstChild) {
      playingField.removeChild(playingField.firstChild);
    }
    //// stop all timers
    //for (let i = 0; i < this.tileArray.length; i++) {
    //  this.tileArray[i].stopTimers();
    //}
  }
}

// set timer
let time = 30;
// update timer on game board
const timerElement = document.querySelector('#timer span');
const setTimer = (time) => {
  const timer = setInterval( () => {
    timerElement.textContent = time;
    // time has reached 0
    if (time === 0) {
      timerElement.textContent = time;
      // stop timer, clear playing field
      clearInterval(timer);
      playingFieldObject.endLevel();
      setTimeout(function() {
        console.log('fading out');
        $('.playing-field').fadeOut(2000);
      }, 1000);
      setTimeout(function() {
        playingFieldObject.clearPlayingField();
      }, 3000)
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
  if (clickedOn.classList.contains('bunny')) {
    console.log('clicked bunny');
    // add clicked class to change display
    clickedOn.classList.add('clicked');
    if (clickedOn.classList.contains('white')) {
      // white bunny
      scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].whiteBunny.points;
    }
    else if (clickedOn.classList.contains('gold')) {
      // gold bunny
      scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].goldBunny.points;
    }
    else {
      // normal bunny
      // add 1 point for each bunny click
      scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].bunny.points;
    }
  }
  // if clicked snake
  else if (clickedOn.className === 'snake') {
    console.log('clicked snake');
    // add clicked class to change display
    clickedOn.classList.add('clicked');
    // -5 pts for snake
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].snake.points;
  }
}
)

// start/stop button
const startStop = document.querySelector('#start-stop button');
let gameTimer;
startStop.addEventListener('click', () => {
  // button says start
  if (startStop.classList.contains('start')) {
    // remove instructions overlay
    // jQuery fade out animation
    $('.instructions').fadeOut('normal');
    // wait 1s to allow for animation to complete
    // then fill the playing field
    setTimeout(function(){
      startStop.classList.remove('start');
      // change button to stop
      startStop.classList.add('stop');
      startStop.textContent = 'STOP';

      // make level 1
      playingFieldObject.makeLevel(1);
      playingFieldObject.startAnimalTimers();
      //// start animal timers
      //for (let i = 0; i < playingFieldObject.tileArray.length; i++) {
      //  playingFieldObject.tileArray[i].chooseAnimalTimer(playingFieldObject.tileArray[i].snake, playingFieldObject.tileArray[i].bunny, playingFieldObject.tileArray[i].whiteBunny, playingFieldObject.tileArray[i].goldBunny);
      //}
      // set level countdown timer
      gameTimer = setTimer(time);
    }, 1000);
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
  playingField.style.removeProperty('display');
  // update level
  const levelSpan = document.querySelector('#level span');
  const level = parseInt(levelSpan.textContent) + 1;
  levelSpan.textContent = level;
  // make next level
  playingFieldObject.makeLevel(level);
  playingFieldObject.startAnimalTimers();
  //// start animal timers
  //for (let i = 0; i < playingFieldObject.tileArray.length; i++) {
  //  playingFieldObject.tileArray[i].chooseAnimalTimer(playingFieldObject.tileArray[i].snake, playingFieldObject.tileArray[i].bunny);
  //}
  // reset timer
  gameTimer = setTimer(time);

})