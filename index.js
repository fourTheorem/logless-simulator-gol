'use strict'

var State = require('./state')


module.exports = function () {
  var state


  /**
   * process inbound message and respond with outbound message
   * message:
   *   - ttl
   *   - traceId
   *   - msgType: sumMod | sumAdv
   *   - fromSvcId
   *   - toSvcId
   *   - payload
   */
  function processMessage (inbound) {
    var outbound = { ttl: inbound.ttl - 1,
      traceId: inbound.traceId,
      msgType: inbound.msgType,
      fromSvcId: inbound.toSvcId
    }

    outbound.toSvcId = state[inbound.msgType](inbound.fromSvcId)
    outbound.payload = outbound.fromSvcId + ',' + outbound.toSvcId + ',' + outbound.msgType + ',' + outbound.ttl
    return outbound
  }


  /**
   * initalise:
   * options.services -> service count
   * options.fillFraction -> board fraction to fill on initial state
   */
  function init (options) {
    state = State(options)
  }


  return {
    init,
    processMessage,
    MSGTYPE_SUMMOD: 'sumMod',
    MSGTYPE_SUMADV: 'sumAdv'
  }
}

