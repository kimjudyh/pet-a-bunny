/** this file contains: 
 * levelProperties - array
 * Bunny - class
 * WhiteBunny - class
 * GoldBunny - classe
 * Snake - class
 * Tile - class
 * playingFieldObject - object
 * setTimer - function
 * playingField event listener
 * startStop event listener
 * nextLevel event listener
 * **/

console.log('bunny javascript working');

/** ======== LEVEL OBJECT ======= **/
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
    level: 4,
    holes: 25,
    heightAndWidth: 100 / 5 + '%',
    hasSnakes: true,
  },
  {
    level: 5,
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
  makeElement () {
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
  makeBunnyTimer (bunny) {
    // param bunny: DOM element of the bunny
    let randomDuration = Math.floor(Math.random() * 500) + 500;
    //let num = 1000; // 2 s
    //console.log('random bunny ', num);
    this.bunnyTimeout = setTimeout(function () {
      // show bunny 
      //$(bunny).fadeIn(150);
      bunny.style.removeProperty('display');
      //console.log('showing bunny');
      //}, num);
    }, randomDuration);

  }
  // func - stop bunny timer
  stopTimers () {
    clearTimeout(this.bunnyTimer);
    clearTimeout(this.bunnyTimeout);
  }
  // change point value
  changePoints(newPointValue) {
    this.points = newPointValue;
  }
}

class WhiteBunny extends Bunny {
  constructor() {
    super(); 
    this.points = 5;
  }
  makeElement () {
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/white_bunny.svg');
    bunnyImg.classList.add('bunny', 'white');
    this.DOMElement = bunnyImg;
    return bunnyImg;
  }
}

//const testWhiteBunny = new WhiteBunny();
//testWhiteBunny.makeElement();
//console.log(testWhiteBunny.DOMElement);
//console.log(testWhiteBunny.points);

class GoldBunny extends Bunny {
  constructor() {
    super();
    this.points = 10;
  }
  makeElement () {
    const bunnyImg = document.createElement('img');
    bunnyImg.setAttribute('src', 'img/gold_bunny.svg');
    bunnyImg.classList.add('bunny', 'gold');
    this.DOMElement = bunnyImg;
    return bunnyImg;
  }
}

//const testGoldBunny = new GoldBunny();
//testGoldBunny.makeElement();
//console.log(testGoldBunny.DOMElement);
//console.log(testGoldBunny.points);

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
    // param snake: DOM element
    // show snake after y sec
    this.snakeTimeout = setTimeout(function () {
      snake.style.removeProperty('display');
      //console.log('showing snake');
    }, Math.floor(Math.random() * 500) + 1000);
  }
  stopTimers() {
    clearTimeout(this.snakeTimer);
    clearTimeout(this.snakeTimeout);
  }
  // change point value
  changePoints(newPointValue) {
    this.points = newPointValue;
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
  chooseAnimalTimer (snake, bunny, whiteBunny, goldBunny) {
    // params: objects
    // every x sec, choose which animal to display, ex. snake or bunny
    this.animalTimer = setInterval(function() {
      //console.log('animal timer running');
      let num = Math.floor(Math.random() * 101);
      //console.log('rand num', num);

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
        //console.log('bunny display removed');
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
        //console.log('snake display removed');
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
      //console.log('created snake or bunny timer');
    //}, 2000);
    }, Math.floor(Math.random() * 2000) + 1000);
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


/** ======= PLAYING FIELD OBJECT ======== **/
const playingFieldObject = {
  // bunnies made
  bunnyArray: [],
  // tiles made
  tileArray: [],
  // level timer
  levelTimer: null,
  // array to keep track of how many animals clicked
  animalCount: {
    bunny: 0,
    whiteBunny: 0,
    goldBunny: 0,
    snake: 0,
  },
  achievementsArray: [],
  // func: make counter that is an array of 0's, with length = # levels
  //setUpAnimalCount() {
  //  for (let i = 0; i < levelProperties.length; i++) {
  //    this.animalCount.bunny.push(0);
  //    this.animalCount.whiteBunny.push(0);
  //    this.animalCount.goldBunny.push(0);
  //    this.animalCount.snake.push(0);
  //  }
  //},
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
  // achievements!
  // bunny bopper
  bunnyBopperCheck() {
    console.log('checking bunny bopper');
    console.log('bunny count', this.animalCount.bunny);
    // if num bunnies clicked = 100, only need to award achievement once
    if (this.animalCount.bunny === 50) {
      console.log('achieved bunny bopper');
      // change bunny points to +2
      this.tileArray[0].bunny.changePoints(2);
      console.log('changed bunny points to 5');
      // doesn't change points for whole class.. need for loop
      console.log('checking bunny 2', this.tileArray[1].bunny.points);
      // add achievement to achievement array
      this.achievementsArray.push('Bunny Bopper');
      // change text of banner
      document.querySelector('.banner h5').textContent = 'Bunny Bopper Unlocked!';
      // display banner when this is unlocked...
      $('.banner').slideToggle('normal');
      // wait to hide banner
      setTimeout(function() {
        $('.banner').slideToggle('normal');
      }, 2000);
    }
  },
  // snake handler
  snakeHandlerCheck() {
    console.log('checking snake handler');
    console.log('snake count', this.animalCount.snake);
    // if num snakes clicked = 10, only need to award achievement once
    if (this.animalCount.snake === 10) {
      console.log('achieved snake handler');
      // change snake points to +5
      this.tileArray[0].snake.changePoints(5);
      console.log('changed snake points to 5');
      // doesn't change points for whole class.. need for loop
      console.log('checking snake 2', this.tileArray[1].snake.points);
      // add achievement to achievement array
      this.achievementsArray.push('Snake Handler');
      // change text of banner
      document.querySelector('.banner h5').textContent = 'Snake Handler Unlocked!';
      // display banner when this is unlocked...
      $('.banner').slideToggle('normal');
      // wait to hide banner
      setTimeout(function() {
        $('.banner').slideToggle('normal');
      }, 2000);
    }
  },
  // magician
  magicianCheck() {
    console.log('checking magician');
    console.log('white bunny count', this.animalCount.whiteBunny);
    // if num white bunnies clicked === 20
    if (this.animalCount.whiteBunny === 20) {
      console.log('achieved magician');
      // change something..
      // add achievement to achievement array
      this.achievementsArray.push('Magician');
      // change text of banner
      document.querySelector('.banner h5').textContent = 'Magician Unlocked!';
      // display banner when this is unlocked...
      $('.banner').slideToggle('normal');
      // wait to hide banner
      setTimeout(function() {
        $('.banner').slideToggle('normal');
      }, 2000);
    }
  },
  // gold rush
  goldRushCheck() {
    console.log('checking gold rush');
    console.log('gold bunny count', this.animalCount.goldBunny);
    // if num gold bunnies clicked = 10
    if (this.animalCount.goldBunny === 10) {
      console.log('achieved gold rush');
      // change something
      // add achievement to achievement array
      this.achievementsArray.push('Gold Rush');
      // change text of banner
      document.querySelector('.banner h5').textContent = 'Gold Rush Unlocked!';
      // display banner when this is unlocked...
      $('.banner').slideToggle('normal');
      // wait to hide banner
      setTimeout(function() {
        $('.banner').slideToggle('normal');
      }, 2000);
    }
  },
  // level transition screen
  fillLevelScreen(level) {
    document.querySelector('.level-over h3').textContent = `Level ${level} Over!`;
    document.querySelector('.level-over .bunny-count').textContent = this.animalCount.bunny;
    document.querySelector('.level-over .white-bunny-count').textContent = this.animalCount.whiteBunny;
    document.querySelector('.level-over .gold-bunny-count').textContent = this.animalCount.goldBunny;
    document.querySelector('.level-over .snake-count').textContent = this.animalCount.snake;

    const achievementsDiv = document.querySelector('.level-over .achievements');
    // clear it out
    while (achievementsDiv.firstChild) {
      achievementsDiv.removeChild(achievementsDiv.firstChild);
    }
    // display achievements
    for (let i = 0; i < this.achievementsArray.length; i++) {
      let achievementP = document.createElement('p');
      achievementP.textContent = this.achievementsArray[i];
      achievementsDiv.appendChild(achievementP);
    }
  },
  // game over screen
  fillGameOverScreen() {
    document.querySelector('.game-over .bunny-count').textContent = this.animalCount.bunny;
    document.querySelector('.game-over .white-bunny-count').textContent = this.animalCount.whiteBunny;
    document.querySelector('.game-over .gold-bunny-count').textContent = this.animalCount.goldBunny;
    document.querySelector('.game-over .snake-count').textContent = this.animalCount.snake;

    // display achievements
    const achievementsDiv = document.querySelector('.game-over .achievements');
    for (let i = 0; i < this.achievementsArray.length; i++) {
      let achievementP = document.createElement('p');
      achievementP.textContent = this.achievementsArray[i];
      achievementsDiv.appendChild(achievementP);
    }
  },
  endLevel() {
    // stop all timers
    // hide all animals, but still show holes
    console.log('ending level');
    for (let i = 0; i < this.tileArray.length; i++) {
      //console.log('stopping timers');
      this.tileArray[i].stopTimers();
      //console.log('hiding animals');
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

/** ======== LEVEL TIMER ========= **/
// set timer
let time = 30;
// update timer on game board
const timerElement = document.querySelector('#timer span');
const setTimer = function(time) {
  const timer = setInterval( function() {
    timerElement.textContent = String(time).padStart(2, ' ');
    const levelSpan = document.querySelector('#level span');
    const level = parseInt(levelSpan.textContent);
    // time has reached 0
    if (time === 0) {
      timerElement.textContent = String(time).padStart(2, ' ');
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

      // game over screen- display if end of last level
      console.log('level: ', level)
      if (level === levelProperties.length) {
        console.log('last level');
        playingFieldObject.fillGameOverScreen();
        setTimeout(function() {
          console.log('displaying game over screen');
          $('.game-over').fadeIn('normal');
        }, 3500);
        }
      else {
        console.log('display level over screen');
        playingFieldObject.fillLevelScreen(level);
        const nextLevel = document.querySelector('.next-level button');
        setTimeout(function () {
          $('.level-over').fadeIn('normal');
          nextLevel.removeAttribute('disabled');
        }, 3500)

      }
    
      console.log(playingFieldObject.animalCount);
    }
    // decrement time
    time --;
  }, 1000)
  return timer;
}


/** ===== ANIMAL CLICK LISTENER ===== **/
// click on bunny, make it disappear;
const playingField = document.querySelector('.playing-field');

playingField.addEventListener('click', (event) => {
  console.log(event);
  // get target of click event
  const clickedOn = event.target;
  // get score DOM element
  let scoreSpan = document.querySelector('#score span');
  // get current level
  const levelSpan = document.querySelector('#level span');
  const level = parseInt(levelSpan.textContent);
  // if clicked bunny
  if (clickedOn.classList.contains('bunny')) {
    console.log('clicked bunny');
    // add clicked class to change display
    clickedOn.classList.add('clicked');
    if (clickedOn.classList.contains('white')) {
      // white bunny
      // increment counter for white bunny clicks for current level
      playingFieldObject.animalCount.whiteBunny++;
      // check for magician achievement
      playingFieldObject.magicianCheck();
      // add points specified in white bunny class
      scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].whiteBunny.points;
    }
    else if (clickedOn.classList.contains('gold')) {
      // gold bunny
      // increment counter for gold bunny clicks
      playingFieldObject.animalCount.goldBunny++;
      // check for gold rush achievement
      playingFieldObject.goldRushCheck();
      // add points specified in gold bunny class
      scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].goldBunny.points;
    }
    else {
      // normal bunny
      // increment counter for bunny clicks
      playingFieldObject.animalCount.bunny++;
      // check for bunny bopper achievement
      playingFieldObject.bunnyBopperCheck();
      // add 1 point for each bunny click
      scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].bunny.points;
    }
  }
  // if clicked snake
  else if (clickedOn.className === 'snake') {
    console.log('clicked snake');
    // increment counter for snake clicks
    playingFieldObject.animalCount.snake++;
    // check for snake handler achievement
    playingFieldObject.snakeHandlerCheck();
    // add clicked class to change display
    clickedOn.classList.add('clicked');
    // add points specified in snake class 
    scoreSpan.textContent = parseInt(scoreSpan.textContent) + playingFieldObject.tileArray[0].snake.points;
  }
}
)

/** ======== BUTTONS ========= **/
// start/stop button
const startStop = document.querySelector('#start-stop button');
const instructions = document.querySelector('.instructions');
let gameTimer;
startStop.addEventListener('click', () => {
  // disable so no one clicks multiple times
  startStop.setAttribute('disabled', true);
  // button says start
  if (startStop.classList.contains('start')) {
    // set up animal count array- 0's with length = # levels
    console.log(playingFieldObject.animalCount);
    // remove instructions overlay
    // jQuery fade out animation
    $('.instructions').fadeOut('normal');
    // wait 1s to allow for animation to complete
    // then fill the playing field
    setTimeout(function(){
      // move instructions to playing-field-container so it's not deleted
      document.querySelector('.playing-field-container').appendChild(instructions);
      startStop.classList.remove('start');
      // change button to stop
      startStop.classList.add('restart');
      startStop.textContent = 'RESTART';
      startStop.removeAttribute('disabled');

      // make level 1
      playingFieldObject.makeLevel(1);
      playingFieldObject.startAnimalTimers();
      // set level countdown timer
      gameTimer = setTimer(time);
    }, 1000);
  }
  // button says stop
  //else if (startStop.classList.contains('stop')) {
  //  // clear playing field, stop animal timers
  //  playingFieldObject.endLevel();
  //  playingFieldObject.clearPlayingField();
  //  // stop level countdown timer
  //  clearInterval(gameTimer);

  //  // change button to restart
  //  startStop.classList.remove('stop');
  //  startStop.classList.add('restart');
  //  startStop.textContent = 'RESTART';
  //}
  else if (startStop.classList.contains('restart')) {
    playingFieldObject.endLevel();
    playingFieldObject.clearPlayingField();
    clearInterval(gameTimer);
    // reset score
    document.querySelector('#score span').textContent = 0;
    // reset timer
    document.querySelector('#timer span').textContent = '--';
    // reset level
    document.querySelector('#level span').textContent = '-';
    // clear achievements
    playingFieldObject.achievementsArray.splice(0);
    console.log(playingFieldObject.achievementsArray);
    // clear animal counter
    playingFieldObject.animalCount.bunny = 0;
    playingFieldObject.animalCount.whiteBunny = 0;
    playingFieldObject.animalCount.goldBunny = 0;
    playingFieldObject.animalCount.snake = 0;
    // hide level over
    document.querySelector('.level-over').style.removeProperty('display');
    document.querySelector('.level-over').setAttribute('display', 'none');
    console.log('hiding level over');
    // hide game over
    document.querySelector('.game-over').style.removeProperty('display');
    document.querySelector('.game-over').setAttribute('display', 'none');
    // display playing-field
    document.querySelector('.playing-field').style.removeProperty('display');
    // display instructions
    document.querySelector('.playing-field').appendChild(document.querySelector('.instructions'));
    document.querySelector('.instructions').style.removeProperty('display');
    // change button to start
    startStop.classList.remove('restart');
    startStop.classList.add('start');
    startStop.textContent = 'START';
    
  }
})

// next level button
const nextLevel = document.querySelector('.next-level button');
nextLevel.setAttribute('disabled', true);

nextLevel.addEventListener('click', () => {
  // disable button
  nextLevel.setAttribute('disabled', true)
  $('.level-over').fadeOut('normal');
  // stop level timer
  clearInterval(gameTimer);
  // remove objects, stop animal timers
  playingFieldObject.endLevel();
  playingFieldObject.clearPlayingField();
  // remove level over screen after a short delay
  setTimeout(function () {
    playingField.style.removeProperty('display');
  }, 500);
  // update level
  const levelSpan = document.querySelector('#level span');
  const level = parseInt(levelSpan.textContent) + 1;
  levelSpan.textContent = level;
  // wait until level over screen fades out, then execute the following
  setTimeout(function () {

    // make next level
    playingFieldObject.makeLevel(level);
    playingFieldObject.startAnimalTimers();
    // on last level, disable next level button
    if (level === levelProperties.length) {
      nextLevel.setAttribute('disabled', true);
    }
    // reset timer
    gameTimer = setTimer(time);
  }, 1000)

})