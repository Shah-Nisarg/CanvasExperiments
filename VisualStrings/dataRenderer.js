var DataRenderer = (function() {
  "use strict";
  
  
  // ---- Properties ---- //
  var isHorizontal = false;
  var height = 0;
  var width = 0;
  var cellHeight = 0;
  var cellWidth = 0;
  
  // Allowing for 26 alphabets, 1 character for space, 1 character for period (.) - we require 28 cells.
  // The cells can be created in a 4x7 grid.
  // TODO: Handle numbers.
  var longDim_cells = 7;
  var shortDim_cells = 4;
  var totalCells = longDim_cells * shortDim_cells;
  
  // ---- Functions ---- //
  
  // Returns the dimensions of the canvas.
  var getDimensions = function () {
    
    // Utilize the full height and width of the screen.
    height = window.innerHeight;
    width = window.innerWidth;
    
    isHorizontal = height < width;
    
    return {
      height: height,
      width: width
    };
  };
  
  // Returns the width and height of individual cell in the grid.
  var getCellDimensions = function () {
    
    if (isHorizontal) {
      cellWidth = width / longDim_cells;
      cellHeight = height / shortDim_cells;
    } else {
      cellWidth = width / shortDim_cells;
      cellHeight = height / longDim_cells;
    }
    
    return {
      height: cellHeight,
      width: cellWidth
    };
  };
  
  // Returns the XY coordinates of the cell on the grid.
  // Ex.: Starts from 0,0 to 3,6 in case of a 4x7 grid.
  // TODO: Write test cases.
  var getCellCoordinates = function (cellIndex) {
    
    // cellIndex could be larger than the supported count of cells.
    // To prevent issues, take the modulo for now.
    // TODO: Use scaling to indicate the multiplier.
    var effectiveCellIndex = cellIndex % totalCells;
    
    var longDim_index = 0;
    var shortDim_index = 0;
    
    if (isHorizontal) {
      longDim_index = Math.floor(effectiveCellIndex / longDim_cells);
      shortDim_index = Math.floor(effectiveCellIndex % longDim_cells);
      
      return {
        X: longDim_index,
        Y: shortDim_index
      };
    } else {
      longDim_index = Math.floor(effectiveCellIndex % shortDim_cells);
      shortDim_index = Math.floor(effectiveCellIndex / shortDim_cells);
      
      return {
        X: shortDim_index,
        Y: longDim_index
      };
    }
  }
  
  // Converts the cell index to location on canvas - height and width.
  var getCellOffsets = function (cellIndex) {
    var top, left;
    var coordinates = getCellCoordinates(cellIndex);
    console.log("XY", coordinates)
    
    return {
      top: coordinates.X * cellHeight,
      left: coordinates.Y * cellWidth
    };
  };
  
  return {
    getDimensions: getDimensions,
    isHorizontal: isHorizontal,
    getCellDimensions: getCellDimensions,
    getCellOffsets: getCellOffsets
  };
})();