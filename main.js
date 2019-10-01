$(document).ready(initializeApp);

function initializeApp(){
  $('.card').click(handleCardClick);
}

function handleCardClick(event){
  console.log('Event: ', event);
  $(event.currentTarget).children('.front').addClass('hidden');
}
