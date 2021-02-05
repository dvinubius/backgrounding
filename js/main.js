/* 0. Setup Global Variables - for multiple uses */

var imageContainers = document.getElementsByClassName('image-container');


var containerBGImage = document.querySelector("#container-BGImage");
var containerBGImageBGColor = document.querySelector('#container-BGImageBGColor');
var containerBGImageBGGradient = document.querySelector('#container-BGImageBGGradient');

var imageUrl; // default hardcoded in markup

/* color picker for setting the background color*/
var colorWell = document.getElementById("colorWell");
var defaultColor; // default hardcoded in markup, hex format
var defaultOpacity; // default hardcoded in markup, integer format 0 < i < 100
var defaultBlend1; // default for BGImageBGColor Blending. hardcoded in markup. string values

/* opacity slider and label */
var slider1 = document.getElementById('slider1');
var slider1Label = document.getElementById('slider1Label');
/* blend mode select menu for BGImageBGColor container*/
var blendSelector1 = document.getElementById('blendSelector1');

/* --- End Global Variables --- */



/* --- MAIN SCRIPT FLOW - execute on loading the window --- */
window.addEventListener("load", startup, false);
function startup() {    
	
	setupDisplayed();
	
	setupControls();
	
	setupEventHandling();	
}



/* 1. Initialize Default Values for displayed elements */
function setupDisplayed() {
	/* for the BGColor and opacity, get hardcoded values from markup*/
	defaultColor = colorWell.value;		
	defaultOpacity = slider1.value/100;	
	/*initialize associated image container*/
	var rgbaDefault = "rgba("+
										hexToR(defaultColor)+ ","+
										hexToG(defaultColor)+ ","+
										hexToB(defaultColor)+ ","+
										defaultOpacity+ ")";
	
	containerBGImageBGColor.style.backgroundColor=rgbaDefault;		
	/* for the BlendMode, get hardcoded value from markup*/	
	defaultBlend1 = blendSelector1.options[blendSelector1.selectedIndex].text;	
	/* initialize associated image container*/
	containerBGImageBGColor.style.backgroundBlendMode = defaultBlend1;
	
	/* set images inside the imageContainers according to default value for image URL*/
	refreshImages();
}

/* 2. Initialize Default Values/States for Control/Setup elements */
function setupControls() {
	slider1Label.innerHTML = (slider1.value/100).toFixed(2);
}

/* 3. Event handling for control elements*/
function setupEventHandling() {
	colorWell.addEventListener("input", updateColor, false);
  colorWell.addEventListener("change", updateColor, false);
  colorWell.select();
	
	slider1.addEventListener("input", updateColor, false);
	slider1.addEventListener("change", updateColor, false);
	
	blendSelector1.addEventListener("input", updateBlendMode, false);
	blendSelector1.addEventListener("change", updateBlendMode, false);	
}


/* Event handling for the color picker and opacity slider*/
function updateColor() {	
  var pickedCol = colorWell.value;
	var chosenOpacity = slider1.value/100;
	var newCol = "rgba("+hexToR(pickedCol)+","+hexToG(pickedCol)+","+hexToB(pickedCol)+","+chosenOpacity+")";
	
	containerBGImageBGColor.style.backgroundColor = newCol;	
		
	/*update slider label*/
	slider1Label.innerHTML = (slider1.value/100).toFixed(2);
}

/* Handles changes in background blend mode selection*/
function updateBlendMode() {
	var selectedMode = this.options[blendSelector1.selectedIndex].text;
	
	if (this.id == "blendSelector1") {
		containerBGImageBGColor.style.backgroundBlendMode = selectedMode;
	} else if (this.id == "blendSelector2") {
		/* accordingly*/
	}
}

/* Set backgroundimages according to the (user) input in the url-text-input*/
function refreshImages() {
	imageUrl = document.getElementById('image-url-input').value;
		
	containerBGImage.style.backgroundImage = "url(" + imageUrl + ")";	
	
	containerBGImageBGColor.style.backgroundImage = "url(" + imageUrl + ")";	
	
	containerBGImageBGGradient.style.backgroundImage = "linear-gradient(rgba(0, 147, 255, 0.17), rgba(255, 180, 180, 0.66)), " + "url(" + imageUrl + ")";
}


// In case user presses enter in the inputField
function lookForEnter(e) {
	if (e.keyCode == 13) {
		refreshImages();
		return false;
	}	
}



/* color format conversions */
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function rgbToHex(r,g,b) {
	var r1 = letterize(parseInt(Number(r) / 16));
	var r2 = letterize(Number(r) % 16);
	var g1 = letterize(parseInt(Number(g) / 16));
	var g2 = letterize(Number(g) % 16);
	var b1 = letterize(parseInt(Number(b) / 16));
	var b2 = letterize(Number(b) % 16);	
	return '#' +r1+r2+g1+g2+b1+b2;
	
}
function letterize (number) {
	switch (number) {
		case 0: return "0";
		case 1: return "1";
		case 2: return "2";
		case 3: return "3";
		case 4: return "4";
		case 5: return "5";
		case 6: return "6";
		case 7: return "7";
		case 8: return "8";
		case 9: return "9";				
		case 10: return "a";
		case 11: return "b";
		case 12: return "c";
		case 13: return "d";
		case 14: return "e";
		case 15: return "f";
	}
}


