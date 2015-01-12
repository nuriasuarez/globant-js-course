#Closures
##Exercise 01
Create a function which takes a value as a maximum and returns a function which takes another value to compare with the first one and return true if greater.
##Exercise 02
Create a function ```santaClaus``` which has a list of presents. The function should return a function ```givePresent()``` which randomly returns and removes one present from the list.
##Exercise 03
Based on the same logic as before, create a pingpong counter. It should count points for 2 players, declare the winner and finish the game if one is declared. The initial function could take a default score for each player instead of starting from 0.
#IIFE
##Exercise 04
Create an IIFE which will ```console.log()``` the current time (hh:mm:ss) each second.
##Exercise 05
Create an IIFE which will mimic the jQuery object. We will keep it very basic, the object ```$$$``` will return a function which by default will take as a value a DOM selector (class or id) and return the found (or not) results. Also the ```$$$``` object will have a ```.select()``` to do eactly the same.
#This
##Exercise 06
Create an object which has 2 properties ```.firstname``` and ```.lastname```, and 2 methods ```.nowYouAre()``` and ```.whoAreYou()```.
These methods should return or modify the first and last name propreties.
##Exercise 07
Create a function ```whichColorsIsTheDress()``` that will ```console.log()``` the ```colorsSeen``` var. This function will be bound to 2 objects ```regularGuy``` and ```weirdGuy```, each one having a property ```colorsSeen```. The result of the bound should be stored into a variable and executed to see the result;
