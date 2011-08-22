Titanium.include('../common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');
 
var win = Titanium.UI.currentWindow;

var lblTitle = Titanium.UI.createLabel(styles["lblTitle"]);
lblTitle.text = Titanium.Locale.getString("register_title");
win.add(lblTitle);

var btnMap = Titanium.UI.createButton(styles["btnMap"]);
btnMap.title = Titanium.Locale.getString("register_btnMap");
btnMap.addEventListener(EVT_CLICK,showMap);
win.add(btnMap);

var rdoReport = Titanium.UI.createSwitch(styles["rdoReport"]);
win.add(rdoReport);

var txtReport = Titanium.UI.createTextField(styles["txtReport"]);
txtReport.value = ' ';
win.add(txtReport);
txtReport.addEventListener(EVT_BLUR,function(e){
	Titanium.App.Properties.setString(KEY_CODE_MEMO, e.value);
});

var btnCamera = Titanium.UI.createButton(styles["btnCamera"]);
btnCamera.title = Titanium.Locale.getString("register_btnCamera");
btnCamera.addEventListener(EVT_CLICK,showCamera);
win.add(btnCamera);

var btnGallary = Titanium.UI.createButton(styles["btnGallary"]);
btnGallary.title = Titanium.Locale.getString("register_btnGallary");
btnGallary.addEventListener(EVT_CLICK,sendData);
win.add(btnGallary);

var btnBack = Titanium.UI.createButton(styles["btnBack"]);
btnBack.title = Titanium.Locale.getString("register_btnBack");
btnBack.addEventListener(EVT_CLICK,backList);
win.add(btnBack);

win.open();
