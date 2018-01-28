var shape = "rect";
var fillColor = "yellow";
var background = "#eee";
var canvasID = "display-canvas";
var displayInterval = 300;
var inputString = "the quick brown fox jumped over the lazy dogs.";
var scaleDownFactor = 0.3;
var opacityReduction = 1;
var animationDuration = 1000;
var delayBetweenConsecutiveRenders = 1000;

// The character is used to visually indicate that given input string has terminated, and a new string may begin soon after.
var stringTerminationIndicator = ". ";

function resetCanvas (canvas) {
  canvas.clear();
  canvas.setBackgroundColor(background);

  // Set the dimensions of the canvas.
  var dimensions = DataRenderer.getDimensions();
  canvas.setHeight(dimensions.height);
  canvas.setWidth(dimensions.width);
}

function displayString(inputString, canvas) {  
  console.log("Showing: " + inputString);
  
  // Append string terminator.
  inputString += stringTerminationIndicator;
  
  var numberArray = TextTranslator.translateToNumberArr(inputString);
  
  return new Promise(function(resolve, reject){
    
    // TODO: Refactor into a function that can render any text.
    numberArray.forEach(function(item, index) {

      // Display the data items one-by-one at some interval.
      setTimeout(function(item) {

        var offset = DataRenderer.getCellOffsets(item);    
        var shapeObj = ShapeCreator.new(shape, shapeConfig, fillColor);

        shapeObj.set(offset);

        // Animations.
        shapeObj.animate("scaleX", "-=" + scaleDownFactor);
        shapeObj.animate("scaleY", "-=" + scaleDownFactor);
        shapeObj.animate("left", "+=" + index);

        shapeObj.animate("opacity", "-=" + opacityReduction, { 
          onChange: canvas.renderAll.bind(canvas),
          duration: animationDuration
        });

        canvas.add(shapeObj);
        
        // When the last item is rendered, resolve the promise.
        if (index == (numberArray.length - 1)) {
          setTimeout(function() {
            resolve();  
            
            // Clear out the canvas.
            resetCanvas(canvas);
          }, delayBetweenConsecutiveRenders);
        }

      }, index * displayInterval, item);
    });
  });
}

var canvas = new fabric.StaticCanvas(canvasID);
resetCanvas(canvas);

// Identify cell dimensions.
var cellDimensions = DataRenderer.getCellDimensions();

var shapeConfig = ShapeCreator.getConfigurations(shape, cellDimensions);

displayString("Hello", canvas)
  .then(function(t) {
    displayString("Hi", canvas);  
});
