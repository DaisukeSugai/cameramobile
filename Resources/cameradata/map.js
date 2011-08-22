Titanium.include('../common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');

var window = Titanium.UI.currentWindow;
window.backgroundColor = '#C0C0C0';

var selectData = [];
selectData = Titanium.App.Properties.getList(KEY_CODE_SELECTUSER);

var locationPin = Titanium.Map.createAnnotation({
		latitude:selectData[1],
		longitude:selectData[2],
		title:selectData[3],
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		animate:true
});

var locationView = Titanium.Map.createView({
    	region:{
    		latitude:selectData[1], 
    		longitude:selectData[2], 
    		latitudeDelta:0.01, 
    		longitudeDelta:0.01
		},
        regionFit:true,
		width: 320,
        height: 480,
        left: 0,
        top:0
});
locationView.addAnnotation(locationPin);
window.add(locationView);

var btnClose = Titanium.UI.createButton(styles["btnClose"]);
btnClose.title = Titanium.Locale.getString("register_btnClose");
btnClose.addEventListener(EVT_CLICK,closeMap);
window.add(btnClose);

window.open();
