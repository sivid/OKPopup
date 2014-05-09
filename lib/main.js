// var buttons = require('sdk/ui/button/toggle');
var { ToggleButton } = require("sdk/ui/button/toggle");
const {Cc,Ci} = require("chrome");
var prefs = require("sdk/simple-prefs").prefs;
var checkedInit;

if (prefs.okpopup == false){	// false means popups are not supressed, button is not pressed
	checkedInit = false;
}
else if (prefs.okpopup == true) {
	checkedInit = true;
}	

var button3 = ToggleButton({
	id: "toggle-enable-disable",
	label: "toggle-enable-disable",
	icon: "./okpopup-16.png",
	checked: checkedInit,
	onChange: handleClick3
});

function handleClick3(state){
	if(state.checked == true) 			// press button, we want to suppress popups
	{
		var pae2 = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("dom.");
		pae2.setCharPref("popup_allowed_events", "");
		prefs.okpopup = true;			// button has been pressed
	}
	else if (state.checked == false) 	// release button, we want to go back to default
	{
		var pae1 = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("dom.");
		pae1.setCharPref("popup_allowed_events", "change click dblclick mouseup reset submit touchend");
		prefs.okpopup = false;			// button has been released
	}
}
