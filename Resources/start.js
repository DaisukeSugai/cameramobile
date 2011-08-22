Titanium.include('/common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');

var win = Titanium.UI.currentWindow;

var lblTitleMain = Titanium.UI.createLabel(styles["lblTitleMain"]);
lblTitleMain.text = Titanium.Locale.getString("start_titlemain");
win.add(lblTitleMain);

var lblTitleSub = Titanium.UI.createLabel(styles["lblTitleSub"]);
lblTitleSub.text = Titanium.Locale.getString("start_titlesub");
win.add(lblTitleSub);

var imageView = Titanium.UI.createImageView(styles["imageView"]);
win.add(imageView);

var btnStart = Titanium.UI.createButton(styles["btnStart"]);
btnStart.title = Titanium.Locale.getString("start_btnstart");
btnStart.addEventListener(EVT_CLICK,startApp);
win.add(btnStart);

win.open();