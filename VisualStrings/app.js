var shape = "rect";
var fillColor = "yellow";
var background = "#eee";
var canvasID = "display-canvas";
var displayInterval = 300;
var inputString = "...the quick brown fox jumped over the lazy dogs...";
var scaleDownFactor = 0.3;
var opacityReduction = 0.3;

var canvas = new fabric.StaticCanvas(canvasID);
canvas.setBackgroundColor(background);

// Set the dimensions of the canvas.
var dimensions = DataRenderer.getDimensions();
canvas.setHeight(dimensions.height);
canvas.setWidth(dimensions.width);

// Identify cell dimensions.
var cellDimensions = DataRenderer.getCellDimensions();

var shapeConfig = ShapeCreator.getConfigurations(shape, cellDimensions);

var data = TextTranslator.translateToNumberArr(inputString);
console.log("Printing data: ", data);

// TODO: Refactor into a function that can render any text.
data.forEach(function(item, index) {
  console.log("Scheduing item: " + index + " Data: " + item);
  
  // Display the data items one-by-one at some interval.
  setTimeout(function(item) {
    console.log("Drawing item: " + index + " Data: " + item);
    
    var offset = DataRenderer.getCellOffsets(item);    
    var shapeObj = ShapeCreator.new(shape, shapeConfig, fillColor);
    
    console.log("Offset: ", offset);
    shapeObj.set(offset);
    
    // Animations.
    shapeObj.animate("scaleX", "-=" + scaleDownFactor);
    shapeObj.animate("scaleY", "-=" + scaleDownFactor);
    shapeObj.animate("left", "+=" + index);
    
    shapeObj.animate("opacity", "-=" + opacityReduction, { 
      onChange: canvas.renderAll.bind(canvas) 
    });
    
    canvas.add(shapeObj);
    
  }, index * displayInterval, item);
});

var text = new fabric.Text(inputString, 
{ 
  left: 100, 
  top: 100,
  fontSize: 20
});
canvas.add(text);