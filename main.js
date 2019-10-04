$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;
var attempts = null;
var games_played = 0;
var calcAccuracy = null;

function initializeApp(){
  $('.card').click(handleCardClick);
  displayStats();
  $('.attempts').text('0');
  $('.accuracy').text('0%');
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
  if(firstCardClicked !== null && secondCardClicked !== null){
    return;
  }

  $(event.currentTarget).find('.back').addClass('hidden');

  if(firstCardClicked === null){
    firstCardClicked = $(event.currentTarget);
    firstCardClicked.addClass('noClick');
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardClicked.addClass('noClick');
    if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
      matches++;
      firstCardClicked.find('.found').removeClass('hidden');
      secondCardClicked.find('.found').removeClass('hidden');
      firstCardClicked.find('.cardFace').addClass('matchedCards');
      secondCardClicked.find('.cardFace').addClass('matchedCards');

      allCardsMatched();
      firstCardClicked = null;
      secondCardClicked = null;
      console.log('card matches');
    } else {
      setTimeout(hideCard, 1000);
      firstCardClicked.removeClass('noClick');
      secondCardClicked.removeClass('noClick');
    }
    displayStats();
    attempts++;
  }
}

function resetStats(){
  matches = null;
  attempts = null;
  $('.attempts').text('0');
  $('.accuracy').text('0%');
  $('.back').removeClass('hidden');
  $('.cardFace').removeClass('matchedCards');
  $('.card').removeClass('noClick');
}

function toggleModal(){
  $('.endModal').removeClass('hidden');
  $('.closeBtn').click(function(){
    $('.endModal').addClass('hidden');
    $('main, .header').css('opacity', '1');
    resetStats();
  });
  games_played++;
  $('.gamesPlayed').text(games_played);
}

function calculateAccuracy(){
  calcAccuracy = (matches / attempts) * 100;
  return calcAccuracy;
}

function displayStats(){
  calculateAccuracy();
  $('.accuracy').text(calcAccuracy.toFixed(2) + '%');
  $('.attempts').text(attempts);
}
