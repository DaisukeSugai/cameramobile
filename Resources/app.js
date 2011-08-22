Titanium.include('/common/constant.js');
Titanium.UI.setBackgroundColor('#FFF');

Titanium.Gesture.addEventListener('orientationchange',function(e) {
	var o = e.orientation;
	var o2 = Titanium.Gesture.orientation;
	Titanium.UI.orientation = Titanium.UI.PORTRAIT;
});

Titanium.App.idleTimerDisabled = true;

Titanium.Locale.setLanguage("ja");
//Titanium.Locale.setLanguage("en");

var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({url:REGISTR_FILE});
var tab1 = Titanium.UI.createTab({window:win1});

var win2 = Titanium.UI.createWindow({url:LIST_FILE});
var tab2 = Titanium.UI.createTab({window:win2});

var win3 = Titanium.UI.createWindow({url:LOGIN_FILE});
var tab3 = Titanium.UI.createTab({window:win3});

var win4 = Titanium.UI.createWindow({url:START_FILE});
var tab4 = Titanium.UI.createTab({window:win4});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.tabBarVisible = false;
Titanium.App.tabGroup = tabGroup;

win1.hideNavBar();
win1.hideTabBar();
win2.hideNavBar();
win2.hideTabBar();
win3.hideNavBar();
win3.hideTabBar();
win4.hideNavBar();
win4.hideTabBar();

Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK
tabGroup.open();
tabGroup.activeTab = tabGroup.tabs[3];