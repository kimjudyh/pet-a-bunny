console.log('bunny javascript working');

// click on bunny, make it disappear;
const bunny = document.querySelector('.bunny');
bunny.addEventListener('click', (event) => {
  console.log(event.target);
  bunny.style['display'] = 'none';
})