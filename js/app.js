console.log('bunny javascript working');

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