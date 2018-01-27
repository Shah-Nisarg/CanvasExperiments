var ShapeCreator = (function (){
  "use strict";
  
  // TODO: Support square.
  // ---- Functions ---- //
  let getShapeConfigurations = function(shape, cellDimensions) {
    let shapeConfig = {};
    let cellHeight = cellDimensions.height;
    let cellWidth = cellDimensions.width;

    switch (shape) {
      case "circle":
        let smallDimension = Math.min(cellWidth, cellHeight);
        shapeConfig["radius"] = smallDimension / 2;
        break;

      default:
        throw "Configurations for Shape: '" + shape + "' are not implemented.";
    }

    return shapeConfig;
  };

  let getNewShape = function(shape, config, color) {
    switch (shape) {
      case "circle":
        let circle = new fabric.Circle(config);
        circle.set("fill", color);
        return circle;
        break;

      default:
        throw "Generation logic for Shape: '" + shape + "' are not implemented.";
    }
  };

  return {
    getConfigurations: getShapeConfigurations,
    new: getNewShape
  };
})();