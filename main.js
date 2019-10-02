$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp(){
  $('.card').click(handleCardClick);
}

function hideCard() {
  firstCardClicked.find('.front').removeClass('hidden');
  secondCardClicked.find('.front').removeClass('hidden');
  firstCardClicked = null;
  secondCardClicked = null;
}

function handleCardClick(event){
  $(event.currentTarget).find('.front').addClass('hidden');

  if(firstCardClicked === null){
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    if (firstCardClicked.find('.back').css('background-image') === secondCardClicked.find('.back').css('background-image')) {
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      console.log('card matches');
    } else {
        setTimeout(hideCard, 1500);

    }
  }

}
