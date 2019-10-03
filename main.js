$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;

function initializeApp(){
  $('.card').click(handleCardClick);
}

function hideCard() {
  firstCardClicked.find('.back').removeClass('hidden');
  secondCardClicked.find('.back').removeClass('hidden');
  firstCardClicked = null;
  secondCardClicked = null;
}

function allCardsMatched(){
  if(matches === max_matches){
    toggleModal();
    $('main, .header').css('opacity', '.4');
  }
}

function handleCardClick(event){
  $(event.currentTarget).find('.back').addClass('hidden');

  if(firstCardClicked === null){
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
      matches++;
      allCardsMatched();
      firstCardClicked = null;
      secondCardClicked = null;
      console.log('card matches');
    } else {
        setTimeout(hideCard, 1500);
    }
  }
}

function toggleModal(){
  $('.endModal').removeClass('hidden');
}
