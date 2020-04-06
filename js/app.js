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
  }
];

// fill playing field with holes
const makeLevel = (level) => {
  /* 
    <div class='hole-area'>
      <img class = 'hole' src="img/hole.svg" alt="hole in ground">
      <img class='bunny' src="img/bunny.svg" alt="bunny">
    </div>
  */
  // level 1: 4x4 grid
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
    // append images to hole-area
    holeArea.appendChild(holeImg);
    holeArea.appendChild(bunnyImg);
    // append hole-area to playing field
    playingField.appendChild(holeArea);
    console.log('making holes')
    console.log(playingField);
  }

}

// click on bunny, make it disappear;
const playingField = document.querySelector('.playing-field');
playingField.addEventListener('click', (event) => {
  console.log(event);
  clickedOn = event.target;
  console.log(typeof clickedOn);
  if (clickedOn.className === 'bunny') {
    console.log('clicked bunny');
    clickedOn.classList.add('clicked');
  }

})

makeLevel(2);