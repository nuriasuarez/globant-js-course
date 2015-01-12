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
  mocha.setup('bdd');

  var assert = chai.assert;

  describe('Tetris-like', function() {
    describe('the "game" variable', function() {
      it('should not be undefined', function() {
        assert(game); // if(true)
      });

      it('should have an init() method', function() {
        assert(game.init);
      });
    });

    describe('the "game.init()" method', function() {
      it('should be a function', function() {
        assert.isFunction(game.init);
      });
    });

    describe('the "game.options" property', function() {
      it('should not be undefined', function() {
        assert(game.options);
      });

      it('should be an array', function() {
        assert.isObject(game.options);
      });
    });

    describe('the "game.rotateMatrixCW()" method', function() {
      it('should not be undefined', function() {
        assert(game.rotateMatrixCW);
      });

      it('should return an array', function() {
        assert.isArray(game.rotateMatrixCW([0, 0, 0]));
      });

      it('should rotate the matrix Clock Wise', function() {
        assert.deepEqual(game.rotateMatrixCW([[1, 1], [0, 0]]), [[0, 1], [0, 1]]);
      });
    });
  });

  mocha.run();
});
