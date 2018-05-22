'use strict'


module.exports = function () {

  function scan (row, column, grid) {
    var count = 0
    if (column - 1 >= 0) {
      count += grid[row][column - 1]
    }
    count += grid[row][column]
    if (column + 1 < grid[0].length) {
      count += grid[row][column + 1]
    }
    return count
  }


  function computeNeighborCount (row, column, grid) {
    var count = 0

    if (row - 1 >= 0) {
      count += scan(row - 1, column, grid)
    }
    count += scan(row, column, grid)
    if (row + 1 < grid.length) {
      count += scan(row + 1, column, grid)
    }
    return count
  }


  function nextGen (start) {
    var count
    var counts
    var end = { generation: start.generation + 1,
      rows: start.rows,
      columns: start.columns,
      grid: [] }

    for (var row = 0; row < start.rows; row++) {
      counts = []
      end.grid.push([])
      for (var column = 0; column < start.columns; column++) {
        count = computeNeighborCount(row, column, start.grid)
        counts.push(count)
        if (start.grid[row][column] === 1) {
          if (count < 2) {
            end.grid[row].push(0)
          }
          if (count === 2 || count === 3) {
            end.grid[row].push(1)
          }
          if (count > 3) {
            end.grid[row].push(0)
          }
        } else {
          if (count === 3) {
            end.grid[row].push(1)
          } else {
            end.grid[row].push(0)
          }
        }
      }
    }
    return end
  }


  function isSterile (grid) {
    var sterile = true

    for (var row = 0; row < grid.rows; row++) {
      for (var column = 0; column < grid.columns; column++) {
        if (grid.grid[row][column] === 1) {
          sterile = false
          break
        }
      }
      if (!sterile) {
        break
      }
    }
    return sterile
  }


  function compare (grid1, grid2) {
    var match = grid1.rows === grid2.rows

    if (match) {
      match = grid1.columns === grid2.columns
    }

    if (match) {
      for (var row = 0; row < grid1.rows; row++) {
        for (var column = 0; column < grid1.columns; column++) {
          match = grid1.grid[row][column] === grid2.grid[row][column]
          if (!match) {
            break
          }
        }
        if (!match) {
          break
        }
      }
    }
    return match
  }


  function count (grid) {
    var count = 0

    for (var row = 0; row < grid.rows; row++) {
      for (var column = 0; column < grid.columns; column++) {
        if (grid.grid[row][column]) {
          count++
        }
      }
    }
    return count
  }


  return {
    nextGen,
    isSterile,
    compare,
    count
  }
}

