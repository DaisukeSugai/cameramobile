Titanium.include('../common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');

var window = Titanium.UI.currentWindow;
window.backgroundColor = '#C0C0C0';

var btnClose = Titanium.UI.createButton(styles["btnClose"]);
btnClose.title = Titanium.Locale.getString("register_btnClose");
btnClose.addEventListener(EVT_CLICK,closeMap);
window.add(btnClose);

window.open();
