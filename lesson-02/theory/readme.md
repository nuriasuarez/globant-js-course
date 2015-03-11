
# Lesson 2: OOP, Design patterns & Intro to jQuery

## Introduccion a OOP en JS

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

**Referencias**<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript<br>
http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/<br>
http://nefariousdesigns.co.uk/object-oriented-javascript.html<br>

## Patrones de diseño

**Referencias**<br>

## Introduccion a jQuery

**Referencias**<br>

