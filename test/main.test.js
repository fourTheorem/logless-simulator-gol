'use strict'

var test = require('tap').test
var main = require('../index')()


test('main test summod', function (t) {
  main.init({services: 16, fillFraction: 0.5})
  var msg = { ttl: 5, traceId: '123456', msgType: main.MSGTYPE_SUMMOD, fromSvcId: 0, toSvcId: 5, payload: 'fromfrontend' }
  while (msg.ttl > 0 && msg.toSvcId !== 0) {
    msg = main.processMessage(msg)
    t.equal(msg.traceId, '123456')
    t.equal(msg.msgType, main.MSGTYPE_SUMMOD)
  }
  t.end()
})


test('main test sumadv', function (t) {
  main.init({services: 16, fillFraction: 0.5})
  var msg = { ttl: 5, traceId: '123456', msgType: main.MSGTYPE_SUMADV, fromSvcId: 0, toSvcId: 5, payload: 'fromfrontend' }
  while (msg.ttl > 0 && msg.toSvcId !== 0) {
    msg = main.processMessage(msg)
    t.equal(msg.traceId, '123456')
    t.equal(msg.msgType, main.MSGTYPE_SUMADV)
  }
  t.end()
})

