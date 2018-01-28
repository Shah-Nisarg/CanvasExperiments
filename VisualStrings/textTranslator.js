var TextTranslator = (function() {
  // ---- Constructors ---- //
  var Character = function(letter, code) {
    this.label = letter;
    this.code = code;
  };
  
  // ---- Functions ---- //
  // Translates given character to its ASCII code.
  var translateToNumber = function (letter) {
    // TODO: Handle uppercase characters.
    if (letter == ' ') {
      return new Character(letter, 26);
    } else if(letter == '.') {
      return new Character(letter, 27);
    } else {
      var code = letter.toLowerCase()
        .charCodeAt(0)
        - 97;
      
      return new Character(letter, code);
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