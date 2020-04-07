console.log('bunny javascript working');
const levelProperties = [
  {
    level: 1,
    holes: 9,
    heightAndWidth: 100 / 3 + '%',
  },
  {
    level: 2,
    holes: 16,
    heightAndWidth: 100 / 4 + '%',
  },
  {
    level: 3,
    holes: 25,
    heightAndWidth: 100 / 5 + '%',
  },
  {
    level: 4,
    holes: 36,
    heightAndWidth: 100 / 6 + '%',
  },
];

class Bunny {
  constructor() {
    // setInterval timer - store so it can be stopped
    this.bunnyTimer; 
    // setTimeout timer - store so it can be stopped
    this.bunnyTimeout;
    this.bunnyDOMElement;
  }
  // func - make DOM element
  makeBunnyElement = () => {
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/bunny.svg');
    bunnyImg.setAttribute('class', 'bunny');
    this.bunnyDOMElement = bunnyImg;
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
  stopBunnyTimers = () => {
    clearInterval(this.bunnyTimer);
    clearTimeout(this.bunnyTimeout);
  }
}

//const testBunny = new Bunny();
//testBunny.makeBunnyElement();
//testBunny.makeBunnyTimer(testBunny.bunnyDOMElement);
//console.log('testBunny DOM', testBunny.bunnyDOMElement);
//console.log('testBunny timer', testBunny.bunnyTimer);
//testBunny.stopBunnyTimers();


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
      const holeArea = document.createElement('div');
      holeArea.setAttribute('class', 'hole-area');
      holeArea.style['height'] = levelObject.heightAndWidth;
      holeArea.style['width'] = levelObject.heightAndWidth;
      // create hole images
      const holeImg = document.createElement('img');
      holeImg.setAttribute('src', 'img/hole.svg');
      holeImg.setAttribute('class', 'hole');

      // create bunny object
      const bunny = new Bunny();
      bunny.makeBunnyElement();

      // append images to hole-area
      holeArea.appendChild(holeImg);
      holeArea.appendChild(bunny.bunnyDOMElement);

      // append hole-area to playing field
      playingField.appendChild(holeArea);
      console.log('making holes')

      // start bunny timers
      bunny.makeBunnyTimer(bunny.bunnyDOMElement);
      this.bunnyArray.push(bunny);
    }
  },
  clearPlayingField() {
    // remove all children of playing-field div
    while (playingField.firstChild) {
      playingField.removeChild(playingField.firstChild);
    }
    // stop all timers
    for (let i = 0; i < this.bunnyArray.length; i++) {
      this.bunnyArray[i].stopBunnyTimers();
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
    time --;
    if (time === 0) {
      timerElement.textContent = time;
      clearInterval(timer);
      playingFieldObject.clearPlayingField();
    }
    //updateTime();
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