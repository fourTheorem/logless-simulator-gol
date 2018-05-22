'use strict'

var path = require('path')
var test = require('tap').test
var game = require('../game')()
var grid = require('../grid')()


test('game load and run test', function (t) {
  var g = grid.parseGridFile(path.join(__dirname, 'start1.txt'))
  var start = g
  for (var idx = 0; idx < 20; ++idx) {
    g = game.nextGen(g)
  }
  t.equal(g.generation, 21)
  t.equal(g.rows, 4)
  t.equal(g.columns, 8)
  t.equal(game.count(g), 5)
  t.equal(game.isSterile(g), false)
  t.equal(game.compare(start, g), false)
  t.equal(game.compare(g, g), true)
  t.end()
})


test('game load and run test 2', function (t) {
  var g = grid.parseGridFile(path.join(__dirname, 'start2.txt'))
  var start = g
  for (var idx = 0; idx < 20; ++idx) {
    g = game.nextGen(g)
  }
  t.equal(g.generation, 21)
  t.equal(g.rows, 8)
  t.equal(g.columns, 16)
  t.equal(game.count(g), 4)
  t.equal(game.isSterile(g), false)
  t.equal(game.compare(start, g), false)
  t.equal(game.compare(g, g), true)
  t.end()
})


test('game load and run test 3', function (t) {
  var g = grid.parseGridFile(path.join(__dirname, 'start3.txt'))
  var start = g
  for (var idx = 0; idx < 20; ++idx) {
    g = game.nextGen(g)
  }
  t.equal(g.generation, 21)
  t.equal(g.rows, 4)
  t.equal(g.columns, 8)
  t.equal(game.count(g), 0)
  t.equal(game.isSterile(g), true)
  t.equal(game.compare(start, g), false)
  t.equal(game.compare(g, g), true)
  t.end()
})
