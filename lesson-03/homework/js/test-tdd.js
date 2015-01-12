'use strict';

requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min',
    mocha: '../node_modules/mocha/mocha',
    chai: '../node_modules/chai/chai'
  }
});

requirejs(['jquery', 'chai', 'game', 'mocha'], function ($, chai, game) {
  mocha.reporter('html');
  mocha.setup('tdd');

  var expect = chai.expect,
      should = chai.should;

  suite('Tetris-like', function() {
    suite('the "game" variable', function() {
      test('should not be undefined', function() {
        assert(game); // if(true)
      });
    });
  });

  mocha.run();
});
