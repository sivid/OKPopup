var buttons = require('sdk/ui/button/toggle');
// var tabs = require("sdk/tabs");
var { ToggleButton } = require("sdk/ui/button/toggle");
const {Cc,Ci} = require("chrome");
var prefs = require("sdk/simple-prefs").prefs;
var checkedInit;

// console.log(prefs.okpopup);
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
	// console.log(state.label + "checked state: " + state.checked);
	if(state.checked == true) 			// press button, we want to suppress popups
	{
		console.log(state.label + " state is true"); 
		var pae2 = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("dom.");
		pae2.setCharPref("popup_allowed_events", "");
		prefs.okpopup = true;			// button has been pressed
	}
	else if (state.checked == false) 	// release button, we want to go back to default
	{
		console.log(state.label + " state is false");
		var pae1 = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("dom.");
		pae1.setCharPref("popup_allowed_events", "change click dblclick mouseup reset submit touchend");
		prefs.okpopup = false;			// button has been released
	}
}



/*
var button1 = buttons.ActionButton({
	id: "enable-normal-popups",
	label: "enable normal popups",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick: handleClick1
});

var button2 = buttons.ActionButton({
	id: "disable-popups",
	label: "Disable popups",
	icon: "./myicon-16.png",
	onClick: handleClick2
});
*/
/*
function handleClick1(state) {
	// tabs.open("http://www.mozilla.org/");
	var pae1 = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("dom.");
	pae1.setCharPref("popup_allowed_events", "change click dblclick mouseup reset submit touchend"); // set a pref (dom.popup_allowed_events)
}
function handleClick2(state) {
	// Get the "dom." branch
	var pae2 = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("dom.");

	// dom is an nsIPrefBranch.
	// var value = prefs.getCharPref("popup_allowed_events"); // get a pref (dom.popup_allowed_events)
	pae2.setCharPref("popup_allowed_events", ""); // set a pref (dom.popup_allowed_events)
}
*/


/*	below code copied from the addon YesPopup by patheticcockroach
//***** Sets to No popups state
function set_to_no()
{
	setCharPref2("dom.popup_allowed_events",getCharPref2("yespopup_dom-PAE_no"));
	setIntPref2("privacy.popups.disable_from_plugins",getIntPref2("yespopup_pripop_no")); // 3
	setIntPref2("yespopup_state",1);
}

//***** Sets to Yes popups state
function set_to_yes()
{
	setCharPref2("dom.popup_allowed_events",getCharPref2("yespopup_dom-PAE_yes"));
	setIntPref2("privacy.popups.disable_from_plugins",getIntPref2("yespopup_pripop_yes")); // 0
	setIntPref2("yespopup_state",2);
}
*/
