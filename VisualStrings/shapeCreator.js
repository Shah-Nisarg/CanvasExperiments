var ShapeCreator = (function (){
  "use strict";
  
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
        
      case "rect":
        shapeConfig["width"] = cellWidth;
        shapeConfig["height"] = cellHeight;
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
        circle.set({ stroke: "black" });
        return circle;
        break;

      case "rect":
        let rect = new fabric.Rect(config);
        rect.set("fill", color);
        rect.set({ stroke: "black" });
        return rect;
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