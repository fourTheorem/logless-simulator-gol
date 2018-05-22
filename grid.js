'use strict'

var fs = require('fs')


module.exports = function () {

  function parseGrid (grid) {
    var result = {grid: []}
    var lines = grid.split('\n')
    var dims = lines[1].split(' ')

    result.generation = parseInt(/Generation ([0-9]+):/g.exec(lines[0])[1], 10)
    result.rows = parseInt(dims[0], 10)
    result.columns = parseInt(dims[1], 10)
    for (var row = 0; row < result.rows; row++) {
      result.grid.push([])
      var cells = lines[2 + row].split('')
      for (var column = 0; column < result.columns; column++) {
        result.grid[row].push(cells[column] === '.' ? 0 : 1)
      }
    }
    return result
  }


  function parseGridFile (path) {
    var grid = fs.readFileSync(path, 'utf8')
    return parseGrid(grid)
  }


  function writeGrid (grid) {
    var output = ''
    var gout = ''

    output += 'Generation ' + grid.generation + ':\n'
    output += '' + grid.rows + ' ' + grid.columns + '\n'
    for (var row = 0; row < grid.rows; row++) {
      gout = ''
      for (var column = 0; column < grid.columns; column++) {
        if (grid.grid[row][column] === 1) {
          gout += '*'
        } else {
          gout += '.'
        }
      }
      output += gout + '\n'
    }
    return output
  }


  function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


  function generateRandom (params) {
    var result = {grid: [],
      generation: 1,
      rows: params.dims.rows,
      columns: params.dims.columns
    }

    for (var row = 0; row < result.rows; row++) {
      result.grid.push([])
      for (var column = 0; column < result.columns; column++) {
        result.grid[row].push(0)
      }
    }

    for (var idx = 0; idx < params.fill; idx++) {
      var c = randomInt(0, params.dims.columns - 1)
      var r = randomInt(0, params.dims.rows - 1)
      result.grid[r][c] = 1
    }

    return result
  }


  return {
    parseGridFile,
    parseGrid,
    writeGrid,
    generateRandom
  }
}

