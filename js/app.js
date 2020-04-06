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
    holes: 24,
    heightAndWidth: 100 / 6 + '%',
  },
];

class Bunny {
  constructor() {
    this.bunnyTimer; 
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
  // store timer so that it can be stopped
}

const testBunny = new Bunny();
testBunny.makeBunnyElement();
testBunny.makeBunnyTimer(testBunny.bunnyDOMElement);
console.log('testBunny DOM', testBunny.bunnyDOMElement);
console.log('testBunny timer', testBunny.bunnyTimer);
testBunny.stopBunnyTimers();


const playingFieldObject = {
  // bunnies made
  bunnyArray: [],
  // func - make level
  makeLevel(level) {
    // grab playing-field
    const playingField = document.querySelector('.playing-field');
    const levelObject = levelProperties[level - 1];
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
      bunny.makeBunnyTimer(bunny.bunnyDOMElement);
      this.bunnyArray.push(bunny);

      // append images to hole-area
      holeArea.appendChild(holeImg);
      holeArea.appendChild(bunny.bunnyDOMElement);

      // append hole-area to playing field
      playingField.appendChild(holeArea);
      console.log('making holes')
    }
    // set level
    const levelSpan = document.querySelector('#level span');
    levelSpan.textContent = level;
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

// make bunny appearance timer
const makeBunnyTimer = (bunny) => {
    // do every 5 s
  const bunnyTimer = setInterval(function () {
    console.log('interval timer started');
    // remove any class added to bunny
    if (bunny.classList.contains('clicked')) {
      bunny.classList.remove('clicked');
    }
    // hide bunny
    bunny.style['display'] = 'none';
    console.log('bunny display removed');

    window.setTimeout(function () {
      // show bunny for 2s
      bunny.style.removeProperty('display');
      console.log('showing bunny');
    }, Math.floor(Math.random() * 500) + 1000)

    // turn display off
    bunny.style['display'] = 'none';
  }, Math.floor(Math.random() * 2000) + 2000)
  return bunnyTimer;
}

// fill playing field with holes
const makeLevel = (level) => {
  /* 
    <div class='hole-area'>
      <img class = 'hole' src="img/hole.svg" alt="hole in ground">
      <img class='bunny' src="img/bunny.svg" alt="bunny">
    </div>
  */
  // grab playing-field
  const playingField = document.querySelector('.playing-field');
  const levelObject = levelProperties[level - 1];
  for (let i = 1; i <= levelObject.holes; i++) {
    // create div w/ class 'hole-area'
    const holeArea = document.createElement('div');
    holeArea.setAttribute('class', 'hole-area');
    holeArea.style['height'] = levelObject.heightAndWidth;
    holeArea.style['width'] = levelObject.heightAndWidth;
    // create hole and bunny images
    const holeImg = document.createElement('img');
    holeImg.setAttribute('src', 'img/hole.svg');
    holeImg.setAttribute('class', 'hole');
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/bunny.svg');
    bunnyImg.setAttribute('class', 'bunny');
    // create snake image

    // attach timer to bunny
    bunnyTimer = makeBunnyTimer(bunnyImg);

    // append images to hole-area
    holeArea.appendChild(holeImg);
    holeArea.appendChild(bunnyImg);
    // append hole-area to playing field
    playingField.appendChild(holeArea);
    console.log('making holes')
  }
  // set level
  const levelSpan = document.querySelector('#level span');
  levelSpan.textContent = level;
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

})

const clearPlayingField = () => {
  while (playingField.firstChild) {
    playingField.removeChild(playingField.firstChild);
  }
}

const startStop = document.querySelector('#start-stop button');
startStop.addEventListener('click', () => {
  if (startStop.classList.contains('start')) {
    startStop.classList.remove('start');
    startStop.classList.add('stop');
    startStop.textContent = 'STOP';

    playingFieldObject.makeLevel(1);
  }
  else if (startStop.classList.contains('stop')) {
    playingFieldObject.clearPlayingField();
    startStop.classList.remove('stop');
    startStop.classList.add('start');
    startStop.textContent = 'START';
  }
})