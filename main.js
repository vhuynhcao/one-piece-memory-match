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
    attempts++;
    displayStats();
  }
}

function toggleModal(){
  $('.endModal').removeClass('hidden');
  $('.closeBtn').click(function(){
    $('.endModal').addClass('hidden');
    $('main, .header').css('opacity', '1');
  });
  games_played++;
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
