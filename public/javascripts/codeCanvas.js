/**
 * @author      Kyle Vermeer
 * @date        1/10/2015
 * @description This object represents a canvas that will have code drawn over time
 */
var CodeCanvas = function(canvasId, options) {
    var me = this;
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.ctx = this.canvas.getContext('2d');
    this.intervalReference = null;

    var DEFAULT_FONT_SIZE = 15;
    var DEFAULT_FONT_WEIGHT = 300;
    var DEFAULT_FONT_COLOR = '#FFFFFF';
    var DEFAULT_FONT_FAMILY = "sans-serif";
    var DEFAULT_DRAWING_INTERVAL = 100;

    /*
     * This function initializes parameters either from an options dict or with defaults
     *
     * @param  Object   basic object with optional settings keys
     *
     * @return none
     */
    var initOptions = function(options) {
        if (options == null) {
            return;
        }
        // Font size
        if (options["font-size"] != undefined && options["font-size"] != null) {
            me.fontSize = options["font-size"];
        }
        else {
            me.fontSize = DEFAULT_FONT_SIZE;
        }
        // Font weight
        if (options["font-weight"] != undefined && options["font-weight"] != null) {
            me.fontWeight = options["font-weight"];
        }
        else {
            me.fontWeight = DEFAULT_FONT_WEIGHT;
        }
        // Font color
        if (options["font-color"] != undefined && options["font-color"] != null) {
            me.fontColor = options["font-color"];
        }
        else {
            me.fontColor = DEFAULT_FONT_COLOR;
        }
        // Font family
        if (options["font-family"] != undefined && options["font-family"] != null) {
            me.fontFamily = options["font-family"];
        }
        else {
            me.fontFamily = DEFAULT_FONT_FAMILY;
        }
        // Drawing interval
        if (options["drawing-interval"] != undefined && options["drawing-interval"] != null) {
            me.drawingInterval = options["drawing-interval"];
        }
        else {
            me.drawingInterval = DEFAULT_DRAWING_INTERVAL;
        }
    }

    initOptions(options);
};

/**
 * Draws text onto the canvas
 *
 * Use '\n' to draw new lines
 *
 * @param  String   text to write to the canvas
 *
 * @return none
 */
CodeCanvas.prototype.draw = function(textToWrite) {
    console.log(this);
    var self = this;
    // Clear any existing drawing interval
    if (this.intervalReference != undefined && this.intervalReference != null) {
        clearInterval(self.intervalReference);
        self.intervalReference = null;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.textToWrite = textToWrite;
    this.textLength = this.textToWrite.length;
    this.currentCharacterIndex = 0;
    this.currentDrawPositionX = 0;
    this.currentDrawPositionY = 0;

    this.intervalReference = setInterval(function() {
        drawCharacter();
    }, this.drawingInterval);

    /*
     * Draws one character to screen
     *
     * If the current character is space, draws the next non-whitespace character
     *
     * @return none
     */
    var drawCharacter = function() {
        var characterToDraw = self.textToWrite[self.currentCharacterIndex];
        if (characterToDraw == '\n') {
            self.currentDrawPositionY += self.fontSize;
            self.currentDrawPositionX = 0;
            self.currentCharacterIndex++;
        }
        else {
            self.ctx.save();
            var font = self.fontWeight + " " + self.fontSize + "px " + self.fontFamily;
            self.ctx.font = font;
            self.ctx.fillStyle = self.fontColor;
            while (characterToDraw == ' ') {
                var textMeasurement = self.ctx.measureText(characterToDraw);
                self.currentDrawPositionX = self.currentDrawPositionX + textMeasurement.width + 1;
                self.currentCharacterIndex++;
                characterToDraw = self.textToWrite[self.currentCharacterIndex];
            }
            var textMeasurement = self.ctx.measureText(characterToDraw);
            self.ctx.fillText(characterToDraw, self.currentDrawPositionX, self.currentDrawPositionY + self.fontSize);
            self.currentCharacterIndex = self.currentCharacterIndex + 1;
            self.currentDrawPositionX = self.currentDrawPositionX + textMeasurement.width + 1;
            self.ctx.restore();
        }
        // Check for end of string
        if (self.currentCharacterIndex == self.textLength) {
            clearInterval(self.intervalReference);
            self.intervalReference = null;
        }
    }
}
