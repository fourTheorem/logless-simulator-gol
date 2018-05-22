'use strict'

var grid = require('./grid')()
const game = require('./game')()


/**
 * generate service states
 * options:
 *   services: number of services to be represented by this board
 *   fill: fillFraction (e.g. 0.2 is a 20% fill)
 */
module.exports = function (options) {
  var boards = []


  function init () {
    var params = {
      dims: {rows: options.services, columns: options.services},
      fill: (options.services * options.services) * options.fillFraction
    }
    var g = grid.generateRandom(params)

    boards.push(g)
    for (var idx = 0; idx <= options.services; ++idx) {
      g = game.nextGen(g)
      boards.push(g)
    }
  }


  function dump () {
    var out = ''
    for (var idx = 0; idx <= options.services; ++idx) {
      out += grid.writeGrid(boards[idx])
    }
    return out
  }


  function sumMod (inService) {
    var board = boards[inService]
    var next = game.count(board)
    return next % options.services
  }


  function sumAdv (inService) {
    var board = boards[inService]
    var count = game.count(board, inService)
    var next = inService + count
    if (next > options.services - 1) {
      next = next % options.services
    }
    return next
  }


  init()
  return {
    dump,
    sumMod,
    sumAdv
  }
}

