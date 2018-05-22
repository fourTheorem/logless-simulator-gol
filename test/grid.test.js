'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tap').test
var grid = require('../grid')()


test('random grid generation', function (t) {

  var params = {
    dims: {rows: 16, columns: 16},
    fill: 40
  }
  var g = grid.generateRandom(params)
  t.equal(g.generation, 1)
  t.equal(g.rows, params.dims.rows)
  t.equal(g.columns, params.dims.columns)
  t.end()
})


test('read grid', function (t) {
  var g = grid.parseGridFile(path.join(__dirname, 'start1.txt'))
  t.equal(g.generation, 1)
  t.equal(g.rows, 4)
  t.equal(g.columns, 8)
  t.end()
})


test('write grid', function (t) {
  var g = grid.parseGridFile(path.join(__dirname, 'start1.txt'))
  var raw = fs.readFileSync(path.join(__dirname, 'start1.txt'), 'utf8')
  var s = grid.writeGrid(g)
  t.equal(s, raw)
  t.end()
})
