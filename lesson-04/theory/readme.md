# Lesson 4: Good Practices & Overview of frameworks
http://code.tutsplus.com/tutorials/24-javascript-best-practices-for-beginners--net-5399

## Table of Contents
 1. [Good Practices](#good-practices)
 2. [Style Guide](#style-guide)
 3. [Tools](#tools)
 4. [Document JS](#document-js)
 5. [Test](#test)

## Good Practices

This list of best practices uses code samples and side-by-side examples to help you write more readable, efficient code.

### General

#### Make it Understandable

Choose easy to understand and short names for variables and functions.
 ```javascript
// Bad variable names
var x1 fe2 xbqne

// Also bad variable names:
var incrementerForMainLoopWhichSpansFromTenToTwenty
var createNewMemberIfAgeOverTwentyOneAndMoonIsFull

//Avoid describing a value with your variable or function name.
isOverEighteen()

// good!
isLegalAge()

 ```

Your code is a story - make your storyline easy to follow!

#### Avoid Globals

Global variables are a terribly bad idea.

**Reason**: You run the danger of your code being overwritten by any other JavaScript added to the page after yours.

**Workaround**: use closures and the module pattern

**Problem**: all variables are global and can be accessed; access is not contained, anything in the page can overwrite what you do.

 ```javascript
var current = null;
var labels = {
   'home':'home',
   'articles':'articles',
   'contact':'contact'
};
function init(){
};
function show(){
   current = 1;
};
function hide(){
   show();
};
 ```

**Object Literal**: Everything is contained but can be accessed via the object name.

**Problem**: Repetition of module name leads to huge code and is annoying.
 ```javascript
 demo = {
   current:null,
   labels:{
      'home':'home',
      'articles':'articles',
      'contact':'contact'
   },
   init:function(){
   },
   show:function(){
      demo.current = 1;
   },
   hide:function(){
      demo.show();
   }
}
 ```

**Module Pattern**: You need to specify what is global and what isnt - switching syntax in between.

 ```javascript
 module = function(){
   var labels = {
      'home':'home',
      'articles':'articles',
      'contact':'contact'
   };
   return {
      current:null,
      init:function(){
      },
      show:function(){
         module.current = 1;
      },
      hide:function(){
         module.show();
      }
   }
}();
 ```

***GOOD!***
**Revealing Module Pattern**: Keep consistent syntax and mix and match what to make global.

 ```javascript
 module = function(){
   var current = null;
   var labels = {
      'home':'home',
      'articles':'articles',
      'contact':'contact'
   };
   var init = function(){
   };
   var show = function(){
      current = 1;
   };
   var hide = function(){
      show();
   }
   return{init:init, show:show, current:current}
}();
module.init();

 ```

### jQuery

  - Prefix jQuery object variables with a `$`.

    ```javascript
    // bad
    var sidebar = $('.sidebar');

    // good
    var $sidebar = $('.sidebar');
    ```

  - Cache jQuery lookups.

    ```javascript
    // bad
    function setSidebar() {
      $('.sidebar').hide();

      // ...stuff...

      $('.sidebar').css({
        'background-color': 'pink'
      });
    }

    // good
    function setSidebar() {
      var $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...stuff...

      $sidebar.css({
        'background-color': 'pink'
      });
    }
    ```

  - For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)
  - Use `find` with scoped jQuery object queries.

    ```javascript
    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();
    ```

**[⬆ back to top](#table-of-contents)**


## ECMAScript 5 Compatibility

  - Refer to [Kangax](https://twitter.com/kangax/)'s ES5 [compatibility table](http://kangax.github.com/es5-compat-table/)

**[⬆ back to top](#table-of-contents)**


## Testing

  - **Yup.**

    ```javascript
    function() {
      return true;
    }
    ```

**[⬆ back to top](#table-of-contents)**


## Performance

  - [On Layout & Web Performance](http://kellegous.com/j/2013/01/26/layout-performance/)
  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)
  - Loading...

**[⬆ back to top](#table-of-contents)**


## Resources


**Read This**

  - [Annotated ECMAScript 5.1](http://es5.github.com/)

**Tools**

  - Code Style Linters
    + [JSHint](http://www.jshint.com/) - [Airbnb Style .jshintrc](https://github.com/airbnb/javascript/blob/master/linters/jshintrc)
    + [JSCS](https://github.com/jscs-dev/node-jscs) - [Airbnb Style Preset](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json)

## Style Guides

**Other Styleguides**

  - [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
  - [jQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
  - [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js/)

**Other Styles**

  - [Naming this in nested functions](https://gist.github.com/4135065) - Christian Johansen
  - [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen
  - [Popular JavaScript Coding Conventions on Github](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun
  - [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

## Tools

### JSHint

JSHint is a community-driven tool to detect errors and potential problems in JavaScript code and to enforce your team's coding conventions. It is very flexible so you can easily adjust it to your particular coding guidelines and the environment you expect your code to execute in. JSHint is open source and will always stay this way.

[Install and Configure](http://jshint.com/docs/)

[Options](http://jshint.com/docs/options/)


 **Reference**

 *  http://jshint.com/docs/



Hacer ejercicio que contenga malas practicas, lo validen y lo vayan corrigiendo.

### JSCS — JavaScript Code Style.

It doesn’t do anything unless you give it a configuration file or tell it to use a preset. You can download configurations from their website, so it’s not a big problem, and it has a number of presets, such as the jQuery coding style preset and the Google preset.

It has over 90 different rules, but unfortunately it’s not extensible with custom ones. It does, however, support custom reporters, which makes it easier to integrate with tools that need their input in a specific format.

JSCS is a code style checker. This means it only catches issues related to code formatting, and not potential bugs or errors. As a result, it’s less flexible than the others, but if you need to enforce a specific coding style, it’s a job JSCS does well.



**Reference**

 *  http://jscs.info/index.html

### Document JS

JSDOCKER


### Test

Jazmin, mocha y caspper

Ejercicio: hacer un codigo y q lo testeen

