var TextTranslator = (function() {
  
  // ---- Functions ----
  // Translates given character to its ASCII code.
  var translateToNumber = function (letter) {
    // TODO: Handle uppercase characters.
    if (letter == ' ') {
      return 26;
    } else if(letter == '.') {
      return 27;
    } else {
      return letter.toLowerCase()
        .charCodeAt(0)
        - 97;
    }
  };
  
  var translateToNumberArr = function (str) {
    return str.split("").map(function(t) {
      return translateToNumber(t);
    });
  };
  
  return {
    translateToNumber: translateToNumber,
    translateToNumberArr: translateToNumberArr
  };
})();