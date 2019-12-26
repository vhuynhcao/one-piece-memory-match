$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = 0;
var calcAccuracy = null;

function initializeApp(){
  $('.card-container').click(handleCardClick);
  displayStats();
  $('.attempts').text('0');
  $('.accuracy').text('0%');
  $(function () {
    var parent = $(".right-game");
    var divs = parent.children();
    while (divs.length) {
      parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  });
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
    firstCardClicked.addClass('no-click');
  } else {
    secondCardClicked = $(event.currentTarget);
    secondCardClicked.addClass('no-click');
    if (firstCardClicked.find('.front').css('background-image') === secondCardClicked.find('.front').css('background-image')) {
      matches++;
      firstCardClicked.find('.found').removeClass('hidden');
      secondCardClicked.find('.found').removeClass('hidden');
      firstCardClicked.find('.card-face').addClass('matched-cards');
      secondCardClicked.find('.card-face').addClass('matched-cards');

      allCardsMatched();
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(hideCard, 1000);
      firstCardClicked.removeClass('no-click');
      secondCardClicked.removeClass('no-click');
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
  $('.card-face').removeClass('matched-cards');
  $('.card-container').removeClass('no-click');
  $('.found').addClass('hidden');
}

function toggleModal(){
  $('.end-modal').removeClass('hidden');
  $('.close-btn').click(function(){
    $('.end-modal').addClass('hidden');
    $('main, .header').css('opacity', '1');
    resetStats();
    $(function () {
      var parent = $(".right-game");
      var divs = parent.children();
      while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
    });
  });
  games_played++;
  $('.games-played').text(games_played);
}

function calculateAccuracy(){
  calcAccuracy = (matches / attempts) * 100;
  if(isNaN(calcAccuracy)){
    calcAccuracy = 0;
  }
  return calcAccuracy;
}

function displayStats(){
  calculateAccuracy();
  $('.accuracy').text(calcAccuracy.toFixed(2) + '%');
  $('.attempts').text(attempts);
}
