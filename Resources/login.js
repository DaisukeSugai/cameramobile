Titanium.include('/common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');

var data = [];
var names = [];
var lastnames = [];
var xids = [];

var win;
var client = Titanium.Network.createHTTPClient({timeout : 100000});
Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, null);

var url = USER_LIST_URL;

client.open(GET_REC, url);
client.onload = function() {
	try {
		var resData = eval("("+this.responseText+")");
		if (resData[0].error == 'Yes') {
			var dialog = Titanium.UI.createAlertDialog({});
			dialog.title =  Titanium.Locale.getString("event_yes_title");
			dialog.message = resData[0].contents;
			dialog.show();
			var win = Titanium.UI.createWindow({url:LOGIN_FILE2});
			Titanium.UI.currentTab.open(win, {animated:true});		
			return;
		} else {
			var record = resData[0].count;
			for (var i = 0; i < resData[0].records.length; i++) {
				names[i] = resData[0].records[i].name;
				lastnames[i] = resData[0].records[i].lastname;
				xids[i] = resData[0].records[i].xid;
			}
			
			win = Titanium.UI.currentWindow;
			
			var lblTitle = Titanium.UI.createLabel(styles["lblTitle"]);
			lblTitle.text = Titanium.Locale.getString("login_title");
			win.add(lblTitle);

			var lblLoginTitle = Titanium.UI.createLabel(styles["lblLoginTitle"]);
			lblLoginTitle.text = Titanium.Locale.getString("login_titlesub");
			win.add(lblLoginTitle);

			var lblUserName = Titanium.UI.createLabel(styles["lblUserName"]);
			lblUserName.text = '';
			win.add(lblUserName);

			var dialog = Titanium.UI.createOptionDialog();
			dialog.setTitle(Titanium.Locale.getString("login_register_dialog_title"));

			Titanium.API.info(lastnames);
			dialog.setOptions(lastnames);
			dialog.addEventListener(EVT_CLICK,function(e) {
				Titanium.API.info(e.index +  lastnames[e.index] + e.value);
				lblUserName.text = lastnames[e.index];
				Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, names[e.index]);
			});
			
			var btnUserName = Ti.UI.createButton(styles["btnUserName"]);
			btnUserName.title = Titanium.Locale.getString("login_btnUserName");
			btnUserName.addEventListener(EVT_CLICK,function() {
				dialog.show();
			});
			win.add(btnUserName);
			
			var btnLogin = Titanium.UI.createButton(styles["btnLogin"]);
			btnLogin.title = Titanium.Locale.getString("login_btnlogin");
			btnLogin.addEventListener(EVT_CLICK,executeTrans);
			win.add(btnLogin);
			
			win.open();
		}
	} catch (e) {
		Titanium.API.error(e);
		var dialog = Titanium.UI.createAlertDialog({});
		dialog.title =  Titanium.Locale.getString("event_catch_title");
		dialog.message = Titanium.Locale.getString("event_catch_message");
		dialog.show();
		var win = Titanium.UI.createWindow({url:LOGIN_FILE2});
		Titanium.UI.currentTab.open(win, {animated:true});		
		return;
	}
};

client.onerror = function() {
	if (client.status == 401) {
		var dialog = Titanium.UI.createAlertDialog({});
		dialog.title =  Titanium.Locale.getString("event_connect_title");
		dialog.message = Titanium.Locale.getString("event_connect_message");
		dialog.show();
		var win = Titanium.UI.createWindow({url:LOGIN_FILE2});
		Titanium.UI.currentTab.open(win, {animated:true});		
		return;
	}
	var dialog = Titanium.UI.createAlertDialog({});
	dialog.title =  Titanium.Locale.getString("event_network_title");
	dialog.message = Titanium.Locale.getString("event_network_message");
	dialog.show();
	var win = Titanium.UI.createWindow({url:LOGIN_FILE2});
	Titanium.UI.currentTab.open(win, {animated:true});		
	return;
};
client.send();
