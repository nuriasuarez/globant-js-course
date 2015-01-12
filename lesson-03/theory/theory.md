
# Lesson 3: Closures, IIFE, this and jQuery
## Preamble
```javascript
'use strict';
```
What the... ?

If you want to be an extreme ninja master as of the fratacho of JS, you should probably get used to code JS using the ECMAScript 5 strict mode.
You can either place it in the beginning of your **.js** file, and it will apply to the whole file, or inside a function and will only apply to its body.

**'use strict';** will make the JS compiler more exigent but will also help you write better code and avoid falling into bad practices or JS pitfalls.
Still, it's recommended using it but not obligatory at all.

Anyway, all the examples and results shown in this lesson will be using the strict mode, even if not explicitly shown in the code.


**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

## Introduction
In order to understand the why's and the how's of the following topics, let's play with some experiments to see what JS has in its guts.
It's more than recommended to try all the code in the console or in a complete HTML + JS project!

Ok, let's start, shall we?
```javascript
var color = 'Red';

// "Red"
console.log(color);
```
```javascript
name = 'Fulano';

// "Fulano"
console.log(name);

// "Fulano"
console.log(window.name);
```
```javascript
function open () {
  console.log(this, 'opened');
}

// "undefined opened"
opened();

// "Window {...} opened"
window.opened();
```
```javascript
function god () {
  name = 'CR7';

  console.log(name);
}

// "Uncaught ReferenceError: name is not defined"
god();
```
```javascript
function trueGod () {
  var name = 'Messi';

  console.log(name);
}

// "Messi"
trueGod();
```
```javascript
function starOfCuarteto () {
  var starName = 'The Monkey';

  console.log(starName, 'is the star of Cuarteto');
}

// "The Monkey is the star of Cuarteto"
starOfCuarteto();

// "Uncaught ReferenceError: starName is not defined"
console.log(starName);
```
```javascript
var greetings = 'Hi there!';

function greet () {
  console.log(greetings);
}

function salute () {
  var greetings = 'Hello!';

  console.log(greetings);
}

// "Hi there!"
greet();

// "Hello!"
salute();
```
```javascript
var beverage = 'cafe';

function drink (beverage) {
  console.log('Hey, do you want some', beverage, '?');
}

// "Hey, do you want some mate ?"
drink('mate');
```
```javascript
var meat = 'chorrizo';

function asado (meat) {
  var meat = 'matambre';

  console.log('Asado\'s ready, here is some', meat);
}

// "Asado's ready, here is some matambre"
asado('costilla');
```
```javascript
var fruit = 'papaya';

function fruit () {
  return 'lulo';
}

// "Fresh juice of papaya is the best!"
console.log('Fresh juice of', fruit, 'is the best!');

// "Uncaught TypeError: string is not a function"
console.log(fruit());
```
```javascript
function dessert (dessert) {
  var dessert = 'Lemon pie';

  console.log(dessert, 'is so delicious!!');
}

// "Lemon pie is so delicious!!"
dessert('Pasta flora');
```
```javascript
var countries = ['Argentina', 'Brasil', 'USA', 'Belgium'],
    country = function () {
      var randomIndex = Math.floor(Math.random() * countries.length);

      console.log(countries[randomIndex]);
    };

// "Argentina" or "Brasil" or "USA" or "Belgium"
country();
```
```javascript
var snl = function intro () {
      console.log('.. And live from New York.. it\'s Saturday Night Live!');
    },
    theSimpsons = function () {
      console.log('Playing opening sequence..');
    };

// ".. And live from New York.. it's Saturday Night Live!"
window.snl();

// "Playing opening sequence.."
window.theSimpsons();
```
```javascript
var family = {
  name: 'Fockers',
  meet: function () {
    console.log('Meet the', this.name);
  }
};

// "This is the Fockers family"
console.log('This is the', family.name, 'family');

// "Meet the Fockers"
family.meet();
```
**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var

## Closures
In JS, *closure* is how a function can remember the variables from the environment where it’s been defined. Let's see how a same function, when invoked can define its own environment on each invocation, and therefore, can create closure for inner functions:
```javascript
function Person () {
  var name = 'Unknown';

  return {
    setName: function (newName) {
      name = newName;
    },
    getName: function () {
      console.log(name);
    }
  };
}

var person1 = Person(),
    person2 = Person();

// "Unknown"
person1.getName();

// "Unknown"
person2.getName();

person1.setName('Michael Jackson');

// "Michael Jackson"
person1.getName();

// "Unknown"
person2.getName();

person2.setName('Elvis');

// "Michael Jackson"
person1.getName();

// "Elvis"
person2.getName();
```
Here is a common issue that occurs with loops. When you declare a variable, it becomes available during the whole time (while looping) for the functions inside the loop, not only for one iteration of the loop. In the following examples, the variable **i** is only declared once and gets its value updated through the loop, if some functions happen to be executed after the loop is finished, they will get for **i** its last value assigned:
```javascript
for (var i=0; i<10; i++) {
  // "i directly inside the loop 0"
  // "i directly inside the loop 1"
  // "i directly inside the loop 2"
  // "i directly inside the loop 3"
  // "i directly inside the loop 4"
  // "i directly inside the loop 5"
  // "i directly inside the loop 6"
  // "i directly inside the loop 7"
  // "i directly inside the loop 8"
  // "i directly inside the loop 9"
  console.log('i directly inside the loop', i);
}

for (var i=0; i<10; i++) {
  // "i directly inside the loop 10" (x10)
  setTimeout(function () { console.log('i inside a callback', i); }, 1000);
}
```
Because when the anonymous function is executed, the loop already has finished and the local var **i** is already set to 10 for each callback.
A possible fix would be:
```javascript
function callback (i) {
  console.log('fixed: i inside a callback', i);
}

for (var i=0; i<10; i++) {
  // "i directly inside the loop 0"
  // "i directly inside the loop 1"
  // "i directly inside the loop 2"
  // "i directly inside the loop 3"
  // "i directly inside the loop 4"
  // "i directly inside the loop 5"
  // "i directly inside the loop 6"
  // "i directly inside the loop 7"
  // "i directly inside the loop 8"
  // "i directly inside the loop 9"
  setTimeout(callback(i), 0);
}
```
Or could directly be done using the console.log method as a callback
```javascript
for (var i=0; i<10; i++) {
  // "i directly inside the loop 0"
  // "i directly inside the loop 1"
  // "i directly inside the loop 2"
  // "i directly inside the loop 3"
  // "i directly inside the loop 4"
  // "i directly inside the loop 5"
  // "i directly inside the loop 6"
  // "i directly inside the loop 7"
  // "i directly inside the loop 8"
  // "i directly inside the loop 9"
  setTimeout(console.log('fixed: i', i), 0);
}
```
Another way of fixing this could be using *IIFE* (immediately invoked function expression):
```javascript
for (var i=0; i<10; i++) {
  (function (j) {
    // "i directly inside the loop 0"
    // "i directly inside the loop 1"
    // "i directly inside the loop 2"
    // "i directly inside the loop 3"
    // "i directly inside the loop 4"
    // "i directly inside the loop 5"
    // "i directly inside the loop 6"
    // "i directly inside the loop 7"
    // "i directly inside the loop 8"
    // "i directly inside the loop 9"
    setTimeout(function () { console.log('fixed: i inside a callback', j); }, 0);
  }(i));
}
```
**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
##IIFE
Wait, what?! IIFE??

In JavaScript, every function, when invoked, creates a new execution context. Because variables and functions defined within a function may only be accessed inside, but not outside, that context, invoking a function provides a very easy way to create privacy.
An IIFE is all about that, but also gets immediately invoked after its declaration using some trick to get the parser to do it, wrapping the function with **()**.
```javascript
(function(){ /* ... */ }()); // Crockford recommends this one

// or

(function(){ /* ... */ })(); // But this one works just as well
```
A good example of IIFE:
```javascript
var fernet = (function () {
  // private variables.
  var description = 'This is a fernet\'s singleton',
      brands = ['branca', '1882', 'vitone'];

  // object containing public properties and methods that will be assigned to the "fernet" variable.
  return {
    description: description,
    showMeYourStock: function () {
      console.log(brands);
    },
    pourMeOne: function (brand) {
      var isBrand = false;

      for (var i=0; i<brands.length; i++) {
        if (brand === brands[i]) {
          isBrand = true;
          break;
        }
      }

      if (isBrand) {
        console.log('Your fernet', brand, 'is served my dear sir!');
      } else {
        console.log('Sorry we don\'t have fernet', brand, 'in stock');
      }
    }
  };
})();

// "Object"
console.log(fernet);

// "Uncaught ReferenceError: brands is not defined"
console.log(brands);

// "undefined"
console.log(fernet.brands);

// "This is a fernet's singleton"
console.log(fernet.description);

// "["branca", "1882", "vitone"]"
fernet.showMeYourStock();

// "Sorry we don't have fernet "banca" in stock"
fernet.pourMeOne('banca');

// "Your fernet "branca" is served my dear sir!"
fernet.pourMeOne('branca');
```
**Reference**<br>
http://en.wikipedia.org/wiki/Immediately-invoked_function_expression<br>
http://benalman.com/news/2010/11/immediately-invoked-function-expression

##this
What is **this**? Well its a read-only keyword used to refer to the context. Ok.. What’s the context exactly?
In JS, there are 2 kind of context, the global one and the function one, let's see some example:
```javascript
// "Window"
console.log(this);
```
In this case **this** refers to the global context, which would be in a web browser the **window** object.
Remember that any global variable or function, in a web browser, will be bound the the **window** object, as you can see here:
```javascript
var activity = 'Ping Pong';

function doSport () {
  console.log(window.activity); // same as console.log(activity);
}

// "Ping Pong"
window.doSport(); // same as doSport();
```
And the function context:
```javascript
var showMeThis = function () {
  console.log(this);
};

function showMeThat () {
  console.log(this);
}

// "Window" or "undefined" (strict mode)
showMeThis();

// "Window" or "undefined" (strict mode)
showMeThat();
```
And an example with both:
```javascript
function shine () {
  console.log(this);
}

var sun = {
  shine: function () {
    console.log(this);
  }
};

// "undefined"
shine();

// "Object" (sun)
someObject.shine();
```
But, wait... I’ve already seen **this** inside global functions.<br>
You’re right, but because it was probably used for instantiation, using the function as a constructor. The magic of all of this happens because of the **new** keyword:
```javascript
function Team (name) {
  // private variable
  var name = name;

  // public method
  this.sayName = function () {
    console.log(name);
  };
}

var team1 = new Team('River Plate'),
    team2 = new Team('Boca Junior');

// "River Plate"
team1.sayName();

// "Boca Junior"
team2.sayName();
```
If you try `team3 = Team('Vélez Sarsfield');` without the **new** keyword, it won’t work or will throw you an error if using the strict mode.

**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

##bind()
Another way to define the context is to use the **bind** method. It became available with ECMAScript 5, but has polyfills to assure cross-browsers/versions support.
Its use is very easy, you just have to define to which element (**object**, **this**) should a function or method be bound and this element will become the context for this function/method. Binding will return a new element with the bound function, which can be stored in a variable:
```javascript
function showQuantity () {
  console.log(this.quantity);
}

var daysPerWeek = {
  quantity: 7
};

var hoursPerDay = {
  quantity: 24
};

var showDaysPerWeek = showQuantity.bind(daysPerWeek);
var showHoursPerDay = showQuantity.bind(hoursPerDay);

// "7"
showDaysPerWeek();

// "24"
showHoursPerDay();
```
And now, in a concrete situation:
```javascript
function haveBreakfast () {
  var defaultProduct = 'Jam';

  console.log('Have some', (this && this.traditionalProduct
                                    ? this.traditionalProduct
                                    : defaultProduct), 'for breakfast.');
}

var argentine = {
  traditionalProduct: 'Dulce de Leche'
};

var hotel = {
  allIn: function () {
    console.log('Sorry, we don\'t have ',
                this.traditionalProduct,
                ', here we only serve continental breakfast.');
  }
};

var argentineBreakfast = haveBreakfast.bind(argentine),
    allIn = hotel.allIn.bind(argentine);

// "Have some Jam for breakfast."
haveBreakfast();

// "Have some Dulce de Leche for breakfast."
argentineBreakfast();

// "Sorry, we don't have Dulce de Leche, here we only serve continental breakfast."
allIn();
```
**Reference**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

##jQuery
For all this jQuery section, don’t forget to include the library in your html before your script:
```html
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="js/your-script.js"></script>
```
Generally jQuery code is executed when document is ready or fully loaded.<br>
Document is ready when all html has been parsed, therefore you can start accessing/manipulating all its DOM elements.<br>
Document is loaded when document is ready AND all medias included have been loaded.

```javascript
// Document ready
$(document).ready(function () {
  console.log('Document ready.');
});

$(function () {
  console.log('Alt. document ready.');
});

// Window loaded
$(window).load(function () {
  console.log('Window loaded.');
});

// "Document ready."
// "Alt. document ready."
// "Window loaded."
```
We could write the same as above without using an anonymous function ```function () { /* … */ }``` as a callback:
```javascript
function init () {
  console.log('Document ready callback.');
}

$(document).ready(init);

// "Document ready callback."
```
Now, let’s say we want to create a title and an input field to interact with each other (yes, another Hello World practice). All the following code will have to be INSIDE your init function.<br>
In jQuery creating DOM elements has never been so easy:
```javascript
$('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body');
```
```appendTo``` is a method that appends the left part to the right part: ```(leftPart).appendTo(rightPart)```. This also works the other way, try this:
```javascript
$('body').append('<input type="text" name="userEntry">');
```
With append being a method that appends the right part to the left part.
The reason why **appendTo** can be interesting is that it return the appended element:
```javascript
var $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body');

// "[h1#title, prevObject: m.fn.init[1], context: undefined, jquery: "1.11.2", constructor: function, selector: ""…]"
console.log($title);
```
Quick recap of our ```init``` function:
```javascript
function init () {
  var $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body');

  $('body').append('<input type="text" name="userEntry">');
}
```
And what about storing the text input? No worries we can still use the jQuery selector to get it:
```javascript
var $input = $('input[name="userEntry"]');

// "[input, prevObject: m.fn.init[1], context: document, selector: "input[name="userEntry"]", jquery: "1.11.2", constructor: function...]"
console.log($input);
```
Now let’s make some magic, what are going to show in the span inside the title the text entered by the user:
```javascript
$input.on('keyup', function () {
  $title.find('span').text(input.val());
});
```
This is obviously not optimized but it works! This would be a better way to do it:
```javascript
var $titleSpan = $title.find('span');

function onInputKeyUp () {
  $titleSpan.text($(this).val());
}

$input.on('keyup', onInputKeyUp);
```
In order to make the input field match the title we can do this:
```javascript
$input.val($titleSpan.text());
```
Note that it’s better to have the **onInputKeyUp** function outside the **init** function or inside a variable.
Here is the final version of the code:
```javascript
function init () {
  var $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body');

  $('body').append('<input type="text" name="userEntry">');

  var $input = $('input[name="userEntry"]'),
      $titleSpan = $title.find('span'),
      onInputKeyUp = function () {
        $titleSpan.text($(this).val());
      };

  $input.on('keyup', onInputKeyUp);
  $input.val($titleSpan.text());
}

$(document).ready(init);
```
Let’s add some styling to all of this, first add this code in the head section of the page, before any script:
```html
<link href="http://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
```
Now let’s add some style with jQuery, we can do it through the **css** method:
```javascript
title.css('fontFamily', 'Indie Flower');
title.css({
  'background': '#0e8dbc',
  'padding': '10px 20px',
  'margin': '0',
  'textAlign': 'center',
  'fontSize': '48px',
  'fontWeight': 'normal',
  'textShadow': '0 1px 0 #ccc,' +
                '0 2px 0 #c9c9c9,' +
                '0 3px 0 #bbb,' +
                '0 4px 0 #b9b9b9,' +
                '0 5px 0 #aaa,' +
                '0 6px 1px rgba(0,0,0,.1),' +
                '0 0 5px rgba(0,0,0,.1),' +
                '0 1px 3px rgba(0,0,0,.3),' +
                '0 3px 5px rgba(0,0,0,.2),' +
                '0 5px 10px rgba(0,0,0,.25),' +
                '0 10px 10px rgba(0,0,0,.2),' +
                '0 20px 20px rgba(0,0,0,.15)',
  'color': 'white',
  'whiteSpace': 'nowrap'
```
As you can see, either you pass to the css method a single pair key/value or an object with a list of property/value.<br>
In jQuery you can basically access all css properties removing the “-” and capitalizing all words except the first one (e.g. **"margin-bottom"** > **"marginBottom"**).

Now let’s say I want all of this inside a box to which I could apply some actions/effects/styling.
```javascript
$title.wrap('<div id="container"></div>');

```
And some styles to it:
```javascript
$container.css({
  'position': 'absolute',
  'left': 0,
  'top': 0,
  'overflow': 'hidden',
  'cursor': 'default',
  'borderRadius': '10px 10px 0 0',
  'boxShadow': '0 5px 25px rgba(0, 0, 0, 0.46)'
});
```
We also need to set some styles to the ```<html>``` and ```<body>``` tags, for this, let's see another way of setting css with jQuery, we are going to insert a whole ```<style>``` tag with css rules inside the ```<head>```:
```javascript
var styles = 'html, body { overflow: hidden; height:100%; margin: 0; padding: 0; width: 100%; }';
$('head').append('<style>' + styles + '</style>');
```
Now that **$title** is inside **$container**, we also need to detach and move **$input** there, and, btw, let's add it some styles too:
```javascript
$input.detach().appendTo($container);
$input.css({
  'width': '100%',
  'padding': '5px',
  'border': '2px solid #0e8dbc',
  'boxSizing': 'border-box',
  'outline': 'none'
});
```
Ok, we are good to do some wicked interactions now. What if we wanted to change the color of the **$title**'s background and the **$input**'s border? In order to do that, we will add some code in the **onInputKeyUp** function, refactor it, and also add some functions (stored in variables) to generate the random color:
```javascript
onInputKeyUp = function () {
  var color = randomColor();

  $title.css('background', '#' + color);
  $input.css('borderColor', '#' + color);

  updateTitle();
},
updateTitle = function () {
  $titleSpan.text($input.val());
};

var randomColor = function () {
  var color = '';

  // 3 * random hexadecimal (R, G, B)
  for (var i=0; i<3; i++) {
    color += randomHexa();
  }

  return color;
},
randomHexa = function () {
  // converts a random 0 >= number >= 255 to an hexadecimal
  var hexa = (Math.round(Math.random() * 255)).toString(16);

  // if the hexadecimal < 10, we need it to be of 2 chars
  return hexa.length==1
       ? '0' + hexa
       : hexa;
};
```
Pretty cool, right??<br>
What!? Useless and ugly most of the time?? You vicious code pervert!! it's never enough for you, is it?<br>
Right, right, wanna get to to upper level? What if we wanted the box the follow the mouse with some basic easing? Also it would be nice to avoid the box to get outside the viewport. Challenge accepted?

First things firt, in order to follow the mouse position, we need to store it, and javascript has the perfect **Event** for that purpose:
```javascript
$(window).on('mousemove', onMouseMove);
```
And now the callback:
```javascript
var mouseX = 0,
    mouseY = 0,
    onMouseMove = function () {
      mouseX = event.clientX || event.pageX;
      mouseY = event.clientY || event.pageY;
    };
```
And now, the funny part, we are going to use the ```requestAnimationFrame()``` API which executes code before the page's next repaint. It's similar to the ```setTimout()``` function but doesn't rely on the time factor, it just needs the current repaint to be finished.<br>
In practice, it can allow a refreshing up to 60 fps. If for any reason (calculation, medias in memory, ...) the cpu can't follow, it will need more time to execute all the code and will decrease the fps avoiding to freeze the browser/cpu.
```javascript
var onEnterFrame = function () {
  var containerWidth = $container.width(),
      containerHeight = $container.height(),
      containerX = $container.offset().left,
      containerY = $container.offset().top,
      distX = mouseX - containerX - containerWidth * .5, // ... *.5 => center horizontally the container regarding the mouse
      distY = mouseY - containerY - containerHeight * .5, // ... *.5 => center vertically the container regarding the mouse
      posX = containerX + (distX * .1), // "ease" function
      posY = containerY + (distY * .1),
      maxX = $(window).width() - containerWidth,
      maxY = $(window).height() - containerHeight;

  // if the container goes outside the viewport, in the horizontal axis
  if (posX < 0) {
    posX = 0;
  } else if (posX > maxX) {
    posX = maxX;
  }

  // if the container goes outside the viewport, in the vertical axis
  if (posY < 0) {
    posY = 0;
  } else if (posY > maxY) {
    posY = maxY;
  }

  // if new position isn't the same as the current one
  if (containerX != posX || containerY != posY) {
    $container.css({
      'left': posX + 'px',
      'top': posY  + 'px'
    });
  }

  // this will invoke "onEnterFrame" when repaint is done.
  window.requestAnimationFrame(onEnterFrame);
};

onEnterFrame();
```
We could add also some bits of randomness:
```javascript
var randomMvtXMax = 5,
    randomMvtYMax = 5;

onEnterFrame = function () {
   /* ... */

  var randomMvtX = (randomMvtXMax * .5) - Math.round(Math.random() * randomMvtXMax),
      randomMvtY = (randomMvtYMax * .5) - Math.round(Math.random() * randomMvtYMax),
      posX = containerX + (distX * .1) + randomMvtX,
      posY = containerY + (distY * .1) + randomMvtY,

   /* ... */
};
```
We could emphatize the relation with the mouse position, playing with the opacity of the box:
```javascript
var opacityMaxDist = 500;

onEnterFrame = function () {
   /* ... */

  var dist = Math.sqrt(Math.pow(mouseX - posX - containerWidth * .5, 2) + Math.pow(mouseY - posY - containerHeight * .5, 2));

  if (containerX != posX || containerY != posY) {
    $container.css({
      'opacity': dist > opacityMaxDist
               ? 0
               : dist < (randomMvtX + randomMvtY) * .5
               ? 1
               : 1 - (dist / opacityMaxDist)
    });
  }

   /* ... */
};
```
Not so easy to get the input focused? No problem, let's add an event to the box to automaticaly get focus when clicked.
```javascript
var onClick = function () {
      $input.focus();
    };

$container.on('click', onClick);
```
And for the final touch, we are going to prefill the input and update the title with an ajax request to a free online service (https://randomuser.me/documentation):
```javascript
var ajaxUrl = 'http://api.randomuser.me/',
    onAjaxDone = function (response) {
      var user = response.results[0].user,
          userName = user.name.first + ' ' + user.name.last;

      $input.val(userName);
      updateTitle();
    },
    onAjaxFail = function (error) {
      console.log(error);
    };

$.ajax({
  type: 'get',
  url: ajaxUrl,
  dataType: 'json'
}).done(onAjaxDone).fail(onAjaxFail);
```
Here is the full version of the code with a little refactoring:
```javascript
function init () {
      // variables
  var styles = 'html, body { overflow: hidden; height:100%; margin: 0; padding: 0; width: 100%; }',
      mouseX = 0,
      mouseY = 0,
      randomMvtXMax = 5,
      randomMvtYMax = 5,
      opacityMaxDist = 500,
      ajaxUrl = 'http://api.randomuser.me/',

      // jQuery selectors
      $title = $('<h1 id="title">Hello <span>World</span>!</h1>').appendTo('body'),
      $input = null,
      $titleSpan = $title.find('span'),
      $container = $($title.wrap('<div id="container"></div>')).parent(),

      // functions
      randomHexa = function () {
        var hexa = Math.round(Math.random() * 255).toString(16);

        return hexa.length==1
             ? '0' + hexa
             : hexa;
      },
      randomColor = function () {
        var color = '';

        for (var i=0; i<3; i++) {
          color += randomHexa();
        }

        return color;
      },
      updateTitle = function () {
        $titleSpan.text($input.val());
      },

      // event callbacks
      onInputKeyUp = function () {
        var color = randomColor();

        $title.css('background', '#' + color);
        $input.css('borderColor', '#' + color);

        updateTitle();
      },
      onMouseMove = function () {
        mouseX = event.clientX || event.pageX;
        mouseY = event.clientY || event.pageY;
      },
      onClick = function () {
        $input.focus();
      },
      onAjaxDone = function (response) {
        var user = response.results[0].user,
            userName = user.name.first + ' ' + user.name.last;

        $input.val(userName);
        updateTitle();
      },
      onAjaxFail = function (error) {
        console.log(error);
      },
      onEnterFrame = function () {
        var containerWidth = $container.width(),
            containerHeight = $container.height(),
            containerX = $container.offset().left,
            containerY = $container.offset().top,
            distX = mouseX - containerX - containerWidth * .5,
            distY = mouseY - containerY - containerHeight * .5,
            randomMvtX = (randomMvtXMax * .5) - Math.round(Math.random() * randomMvtXMax),
            randomMvtY = (randomMvtYMax * .5) - Math.round(Math.random() * randomMvtYMax),
            posX = containerX + (distX * .1) + randomMvtX,
            posY = containerY + (distY * .1) + randomMvtY,
            dist = Math.sqrt(Math.pow(mouseX - posX - containerWidth * .5, 2) + Math.pow(mouseY - posY - containerHeight * .5, 2)),
            maxX = $(window).width() - containerWidth,
            maxY = $(window).height() - containerHeight;

        if (posX < 0) {
          posX = 0;
        } else if (posX > maxX) {
          posX = maxX;
        }

        if (posY < 0) {
          posY = 0;
        } else if (posY > maxY) {
          posY = maxY;
        }

        if (containerX != posX || containerY != posY) {
          $container.css({
            'left': posX + 'px',
            'top': posY  + 'px',
            'opacity': dist > opacityMaxDist
                     ? 0
                     : dist < (randomMvtX + randomMvtY) * .5
                     ? 1
                     : 1 - (dist / opacityMaxDist)
          });
        }

        window.requestAnimationFrame(onEnterFrame);
      };

  $('head').append('<style>' + styles + '</style>');
  $('body').append('<input type="text" name="userEntry">');

  $title.css({
    'background': '#0e8dbc',
    'padding': '10px 20px',
    'margin': '0',
    'textAlign': 'center',
    'fontFamily': 'Indie Flower',
    'fontSize': '48px',
    'fontWeight': 'normal',
    'textShadow': '0 1px 0 #ccc,' +
                  '0 2px 0 #c9c9c9,' +
                  '0 3px 0 #bbb,' +
                  '0 4px 0 #b9b9b9,' +
                  '0 5px 0 #aaa,' +
                  '0 6px 1px rgba(0,0,0,.1),' +
                  '0 0 5px rgba(0,0,0,.1),' +
                  '0 1px 3px rgba(0,0,0,.3),' +
                  '0 3px 5px rgba(0,0,0,.2),' +
                  '0 5px 10px rgba(0,0,0,.25),' +
                  '0 10px 10px rgba(0,0,0,.2),' +
                  '0 20px 20px rgba(0,0,0,.15)',
    'color': 'white',
    'whiteSpace': 'nowrap'
  });

  $input = $('input[name="userEntry"]')
    .on('keyup', onInputKeyUp)
    .css({
      'width': '100%',
      'padding': '5px',
      'border': '2px solid #0e8dbc',
      'boxSizing': 'border-box',
      'outline': 'none'
    })
    .val($titleSpan.text())
    .detach()
    .appendTo($container);

  $container
    .on('click', onClick)
    .css({
      'position': 'absolute',
      'left': 0,
      'top': 0,
      'overflow': 'hidden',
      'cursor': 'default',
      'borderRadius': '10px 10px 0 0',
      'boxShadow': '0 5px 25px rgba(0, 0, 0, 0.46)'
    });

  $(window).on('mousemove', onMouseMove);

  $.ajax({
      type: 'get',
      url: ajaxUrl,
      dataType: 'json'
    })
    .done(onAjaxDone)
    .fail(onAjaxFail);

  onEnterFrame();
}

$(document).ready(init);
```
