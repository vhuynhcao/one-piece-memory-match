$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = 0;

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
    attempts++;
    displayStats();
  }
}

function resetStats(){
  matches = null;
  attempts = null;
  $('.attempts').text('0');
  $('.accuracy').text('0%');
}

function redirectLv2(){
  $('.endModal').addClass('hidden');
  window.location = 'level2.html';
}

function toggleModal(){
  $('.endModal').removeClass('hidden');
  games_played++;
  resetStats();
  setTimeout(redirectLv2, 3000);
}

function calculateAccuracy(){
  var calcAccr = matches / attempts;
  return calcAccr;
}

function displayStats(){
  $('.gamesPlayed').text(games_played);
  $('.attempts').text(attempts);

  var accuracyPercent = Math.floor(calculateAccuracy()*100) + '%';
  $('.accuracy').text(accuracyPercent);
}
