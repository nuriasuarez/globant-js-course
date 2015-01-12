// Ex. 01
function isGreaterThanMax (max) {
  var max = max;

  return function (val) {
    return val > max;
  };
}

var test = isGreaterThanMax(10);

console.log(test(3));
console.log(test(10));
console.log(test(13));


// Ex. 02
function santaClaus () {
  var presents = ['micromachine', 'GI Joe', 'ps4', 'Barbie'],
      givePresent = function () {
        if (presents.length) {
          var randomIndex = Math.floor(Math.random() * presents.length);

          return presents.splice(randomIndex, 1).toString();
        } else {
          return 'No more presents';
        }
      };

  return {
    givePresent: givePresent
  };
}

var santa = santaClaus();

console.log(santa.givePresent());
console.log(santa.givePresent());
console.log(santa.givePresent());
console.log(santa.givePresent());
console.log(santa.givePresent());


// Ex. 03
function pingPongGame (scorePlayer1, scorePlayer2) {
  var minToWin = 21,
      gapToWin = 2,
      player1Points = scorePlayer1,
      player2Points = scorePlayer2,
      gameFinished = false,
      point = function (player) {
        if (!gameFinished) {
          if (player=='player 01') {
            player1Points++;
          } else if (player=='player 02') {
            player2Points++;
          }

          if (Math.max(player1Points, player2Points)>=minToWin && (Math.max(player1Points, player2Points) - Math.min(player1Points, player2Points))>= gapToWin) {
            gameFinished = true;
          }

          console.log('player 01', player1Points, ' - ', player2Points, 'player 02');

          if (gameFinished) {
            console.log('Player', (player1Points>player2Points ? '01' : '02'), 'won!!');
          }
        }
      };

  return {
    point: point
  };
}

var game = pingPongGame(20, 20);
game.point('player 02');
game.point('player 02');
game.point('player 02');


// Ex. 04
(function () {
  setInterval(function () {
    var today = new Date();
    console.log(today.getHours() + ':' + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' + (today.getSeconds() < 10 ? '0' : '') + today.getSeconds());
  }, 1000);
}());


// Ex. 05
var $$$ = (function () {
  var select = function (selector) {
    console.log('Looking for', selector, 'inside the DOM');
    console.log(document.querySelector(selector));
  };

  function Main (selector) {
    select(selector);
  }

  Main.select = select;

  return Main;
}());

$$$('head');
$$$.select('body');


// Ex. 06
var person = {
  firstname: 'some',
  lastname: 'guy',
  nowYouAre: function (firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  },
  whoAreYou: function () {
    console.log('I am', this.firstname, this.lastname);
  }
};

person.whoAreYou();
person.nowYouAre('Nicolas', 'Ronsmans');
person.whoAreYou();


// Ex. 07
function whichColorsIsTheDress () {
  console.log('The dress is obviously', this.colorsSeen);
}

var regularGuy = {
      colorsSeen: 'blue and black'
    },
    weirdGuy = {
      colorsSeen: 'white and gold'
    },

    regularGuyColorsSeen = whichColorsIsTheDress.bind(regularGuy),
    weirdGuyColorsSeen = whichColorsIsTheDress.bind(weirdGuy);

regularGuyColorsSeen();
weirdGuyColorsSeen();
