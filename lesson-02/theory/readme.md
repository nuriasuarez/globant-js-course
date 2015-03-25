
# Lesson 2: OOP, Design patterns & Intro to jQuery

## Introduction to OOP on JS

## Objetos nativos
JavaScript tiene varios objetos incluidos en su núcleo, como Math, Object, Array y String.

## Objetos personalizados
JavaScript utiliza funciones como clases. 
Definir una clase es tan fácil como definir una función. En el ejemplo siguiente se define una nueva clase llamada Persona.

```javascript
function Persona() {
}
```

Para crear un nuevo ejemplo de un objeto Personal utilizamos la declaración new Persona, asignando el resultado (que es de tipo Persona) 
a una variable para tener acceso más adelante.

```javascript
function Persona() {
}

var padre = new Persona();
var hijo = new Persona();
```

## El constructor:
No hay necesidad de definir explícitamente un método constructor, ya que es llamado en el momento de la creación de la instancia.
Se usa para establecer las propiedades del objeto o para llamar a los métodos para preparar el objeto para su uso.

```javascript
var Persona = function Persona(firstName, lastName) {
  console.log('Inicializando ' + firstName + ' ' + lastName);
}

var padre = new Persona('Homero', 'Simpson');
var hijo = new Persona('Bart', 'Simpson');
```

## Propiedades:
Las propiedades son variables contenidas en la clase, y deben establecerse a la propiedad prototipo de la clase (función), 
para que la herencia funcione correctamente.

Para trabajar con propiedades dentro de la clase se utiliza la palabra reservada this, que se refiere al objeto y contexto actual.

```javascript
var Persona = function Persona(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var padre = new Persona('Homero', 'Simpson');
var hijo = new Persona('Bart', 'Simpson');

console.log(padre.firstName);
console.log(hijo.firstName);
``` 

## Metodos:
Los métodos siguen la misma lógica que las propiedades, la diferencia es que son funciones y se definen como funciones. 
Llamar a un método es similar a acceder 
a una propiedad, pero se agrega () al final del nombre del método, es posible llamarlos con argumentos.

En JavaScript los métodos son objetos como lo es una función normal y se vinculan a un objeto como lo hace una propiedad, 
lo que significa que se pueden invocar desde "fuera de su contexto". 

```javascript
var Persona = function Persona(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Persona.prototype.getFullName = function() {
  console.log(this.firstName + ' ' + this.lastName);
}

var padre = new Persona('Homero', 'Simpson');
var hijo = new Persona('Bart', 'Simpson');

padre.getFullName();
hijo.getFullName();
```

## Herencia y Encapsulacion:
```javascript
var Persona = function Persona(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Persona.prototype.getFullName = function() {
  console.log(this.firstName + ' ' + this.lastName);
}

var Bombero = function Bombero(firstName, lastName, age) {
  // llamamos al constructor padre
  Persona.call(this, firstName, lastName);
  
  this.age = age;
}

// Heredamos de la clase Persona
Bombero.prototype = Object.create(Persona.prototype);

// Asignamos el constructor a nuestra clase hija
Bombero.prototype.constructor = Bombero;

// Agregamos un metodo a la clase hija
Bombero.prototype.getAge = function getAge() {
  console.log(this.age);
}

var bomberoLoco = new Bombero('Flavio', 'Carreño', 32);
bomberoLoco.getAge();
bomberoLoco.getFullName();
```

## Poliformismo:
```javascript
var Persona = function Persona(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Persona.prototype.getFullName = function() {
  console.log(this.firstName + ' ' + this.lastName);
}

var Bombero = function Bombero(firstName, lastName, age) {
  // llamamos al constructor padre
  Persona.call(this, firstName, lastName);
  
  this.age = age;
}

// Heredamos de la clase Persona
Bombero.prototype = Object.create(Persona.prototype);

// Asignamos el constructor a nuestra clase hija
Bombero.prototype.constructor = Bombero;

// Agregamos un metodo a la clase hija
Bombero.prototype.getAge = function getAge() {
  console.log(this.age);
}

// Redefinimos el metodo getFullName
Bombero.prototype.getFullName = function getFullName() {
  console.log(this.lastName + ', ' + this.firstName);
}

var bomberoLoco = new Bombero('Flavio', 'Carreño', 32);
bomberoLoco.getAge();
bomberoLoco.getFullName();
```

**Referencias**
[Introduction to Object-Oriented JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
[OOP In JavaScript: What You NEED to Know](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
[Object-Oriented Javascript](http://nefariousdesigns.co.uk/object-oriented-javascript.html)

----------
## Desing patterns

 - Design patterns are reusable solutions to commonly occurring problems in software design.
 - Design patterns also provide us a common vocabulary to describe solutions.
 - A pattern usually reflects an out of the box solution that can be adapted to suit our own needs.

#### A simple example
Imagine that we have a script where for each DOM element found on a page with class "foo" we wish to increment a counter.
We have 3 different ways to do:

 1. Select all of the elements in the page using regular expressions
 2. Use a modern native browser feature such as `querySelectorAll()` to select all of the elements.
 3. Use a native feature such as `getElementsByClassName()` to similarly get back the desired collection.

**Which is the best solution?**
Developers using jQuery don't have to worry about this problem however, as it's luckily abstracted away for us using the *Facade* pattern. 

Behind the scenes, the library simply opts for the most optimal approach to selecting elements depending on what our current browser supports and we just consume the abstraction layer.

We're probably all also familiar with jQuery's `$("selector")`. This is significantly more easy to use for selecting HTML elements on a page versus having to manually opt for `getElementById()`, `getElementsByClassName()`, `getElementByTagName` and so on.

### Creational Design Patterns ###
This patterns focus on handling object creation mechanisms where objects are created in a manner suitable for the situation we're working in. 

 - Factory
 - Builder
 - Prototype
 - Singleton

### Structural Design Patterns ###
This patterns are concerned with object composition and typically identify simple ways to realize relationships between different objects.

 - Adapter
 - Decorator
 - Facade
 - Proxy

### Behavioral Design Patterns ###
This patterns focus on improving or streamlining the communication between disparate objects in a system.

 - Iterator
 - Mediator
 - Observer
 - Strategy

----------

## JavaScript Design Patterns ##

### The Constructor Pattern ###

**Object creation**
The three common ways to create new objects in JavaScript are as follows:

```javascript
    // preferred, object literal
    var person = {
	    name: "Pepe"
    };
    
    var person = Object.create(Object.prototype);
    
    // antipattern
    var person = new Object();
    person.name = "Pepe";
```

**Basic constructors**
As we saw earlier, JavaScript doesn't support the concept of classes but it does support special constructor functions that work with objects.

```javascript
function Person(name, lastName) {
	this.name = name;
	this.lastName = lastName;
	
	this.getFullName = function () {
		return this.name + " " + this.lastName;
	};
}

// usage
var driver = new Person("Cosme", "Fulanito");
console.log(driver.getFullName());
```

**Constructors with prototypes**
Functions, like almost all objects in JavaScript, contain a "prototype" object. 

```javascript
function Person(name, lastName) {
	this.name = name;
	this.lastName = lastName;
}

Person.prototype.getFullName = function () {
	return this.name + " " + this.lastName;
};

// usage
var driver = new Person("Cosme", "Fulanito");
console.log(driver.getFullName());
```

### The module pattern ###
Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized.

**Object literals**
Object literals don't require instantiation using the `new` operator.

```javascript
var Person = {
	name: "Cosme",
	lastName: "Fulanito",
	
	getFullName: function() {
		return this.name + " " + this.lastName;
	}
};

// usage
Person.name = "Pepe";
console.log(Person.getFullName());
```

**Module pattern**
The Module pattern was originally defined as a way to provide both private and public encapsulation for classes in conventional software engineering.

In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope.

```javascript
var Person = (function () {
	var _name = "Cosme",
		_lastName = "Fulanito";
		
	var	_getFormalName = function () {
			return _lastName + ", " + _name;
		};
	
	return {
		getFullName: function () {
			return _name + " " + _lastName;
		},
		getFormalName: function () {
			return _getFormalName();
		}
	}
})();

// usage
console.log(Person.getFullName());
console.log(Person.getFormalName());
```
**Variations**
*Import mixins*

Demonstrates how globals can be passed in as arguments to our module's anonymous function. This effectively allows us to import them and locally alias them as we wish.
```javascript
var name = "Cosme";
var lastName = "Fulanito";
var Person = (function (n, ln) {
	var _name = n,
		_lastName = ln;
		
	var	_getFormalName = function () {
			return _lastName + ", " + _name;
		};
	
	return {
		getFullName: function () {
			return _name + " " + _lastName;
		},
		getFormalName: function () {
			return _getFormalName();
		}
	}
})(name, lastName);

// usage
console.log(Person.getFullName());
console.log(Person.getFormalName());
```

*Export*

Allows us to declare globals without consuming them and could similarly support the concept of global imports.

```javascript
var Person = (function () {
	var objPerson = {};
	
	// Private variables
	var _name = "Cosme",
		_lastName = "Fulanito";

	// Private method
	function _getFormalName() {
		return _lastName + ', ' + _name;
	};
	
	// Public methods
	objPerson.getFullName = function() {
		return _name + ' ' + _lastName;
	};
	
	objPerson.getFormalName = function() {
		return _getFormalName();
	};
	
	return objPerson;
})();

// usage
console.log(Person.getFullName());
console.log(Person.getFormalName());
```

###The Singleton Pattern###

The Singleton pattern is thus known because it restricts instantiation of a class to a single object. 

```javascript
var Person = (function (){
	var _instance,
		_name = "Cosme",
		_lastName = "Fulanito";

	var objPerson = function() {
		if(_instance){
			return _instance;
		}
		
		this.getFullName = function() {
			return _name + ' ' + _lastName;
		}
		
		this.setName = function(n) {
			_name = n;
		}
		
		_instance = this;
	};
	
	return objPerson;
})();

// usage
var p1 = new Person();
var p2 = new Person();

p2.setName('Pepito');

console.log(p2.getFullName());
console.log(p1.getFullName());
console.log(p1 === p2);
```

###The Observer Pattern###

Is a publish/subscribe pattern which allows a number of observer objects to see an event,  automatically notifying them of any changes to state.

```javascript
var pubsub = {};

(function(myObject) {
 
    // Storage for topics that can be broadcast 
    // or listened to
    var topics = {};
 
    // An topic identifier
    var subUid = -1;
 
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function(topic, args) {
        if (!topics[topic]) {
            return false;
        }
 
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
 
        while (len--) {
            subscribers[len].func(topic, args);
        }
        return this;
    };
 
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    
    myObject.subscribe = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
 
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
 
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(pubsub));

// usage
var messageLogger = function (topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

var subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

pubsub.publish("inbox/newMessage", "hello world!");
pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);

pubsub.unsubscribe(subscription);

pubsub.publish("inbox/newMessage", "Hello! are you still there?");
```

###Revelation Pattern###
It is about having private methods, which you also expose as public methods.

```javascript
var Person = (function (){
	var _name = "Cosme",
		_lastName = "Fulanito";

	function _getFullName() {
		return _name + ' ' + _lastName;
	};

	function _getFormalName() {
		return _lastName + ', ' + _name;
	};

	return {
		getFullName: _getFullName,
		getFormalName: _getFormalName
	}

})();

// usage
console.log(Person.getFormalName());
console.log(Person.getFullName());
```

###Facade Pattern###
Provides a simplified interface to a large body of code.

```javascript
var mobileEvent = {
	// ...
	stop:function (e) {
		e.preventDefault();
		e.stopPropagation();
	}
	// ...
};

// usage
var link = document.querySelector('#someAnchorId');
link.addEventListener('click', function(e){
	mobileEvent.stop(e);
});
```

###The Prototype Pattern###


----------

**References:**
[Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
[JS Patterns](http://shichuan.github.io/javascript-patterns/)


----------
#Introduction to jQuery#

jQuery is just a JavaScript library, or set of helpful add-ons, to the JavaScript programming language. 

It takes a while to become comfortable with JavaScript, and it's trickier to manipulate HTML elements directly with JavaScript than with jQuery.

jQuery provides a simple interface for the underlying JavaScript.



----------
**References:**
[jQuery Documentation](http://api.jquery.com/)