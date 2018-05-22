'use strict'

var test = require('tap').test
var State = require('../state')


test('state test', function (t) {
  var state = State({services: 16, fillFraction: 0.5})

  state.dump()

  var nxt = 0
  for (var idx = 0; idx < 10; ++idx) {
    nxt = state.sumMod(nxt)
    t.ok(nxt >= 0 && nxt < 16)
  }

  nxt = 0
  for (idx = 0; idx < 10; ++idx) {
    nxt = state.sumAdv(nxt)
    t.ok(nxt >= 0 && nxt < 16)
  }

  t.end()
})

