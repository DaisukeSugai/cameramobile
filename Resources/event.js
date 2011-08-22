var startApp = function() {
	Titanium.App.tabGroup.activeTab = Titanium.App.tabGroup.tabs[2];		
}

var clearText = function() {
	lblUserName.text = '';
}

var executeTrans = function() {
	var txtLogin = Titanium.App.Properties.getString(KEY_CODE_SELECTUSER) ;
	if (txtLogin == null) {
		var dialog = Titanium.UI.createAlertDialog();
		dialog.title =  Titanium.Locale.getString("event_title");
		dialog.message = Titanium.Locale.getString("event_message");
		dialog.show();
		return;
	}
	send(txtLogin);
}

var send = function(params) {
	var client = Titanium.Network.createHTTPClient({timeout : 100000});
	var paramater = '&intaliouser=' + params + '&parameter=name:' + params + ',';
	var url = LOGIN_URL + paramater;
	
	if (Titanium.Network.online != false) {
		client.open(GET_REC, url);
		client.onload = function() {
			try {
				var resData = eval("("+this.responseText+")");
				if (resData[0].error == 'Yes') {
					var dialog = Titanium.UI.createAlertDialog({});
					dialog.title =  Titanium.Locale.getString("event_yes_title");
					dialog.message = resData[0].contents;
					dialog.show();
					return;
				} else {
					var record = resData[0].count;
					for (var i = 0; i < resData[0].records.length; i++) {
						var xid = resData[0].records[i].xid;
						var name = resData[0].records[i].name;
						var lastname = resData[0].records[i].lastname;
						var firstname = resData[0].records[i].firstname;
						Titanium.App.Properties.setString(KEY_CODE_USERXID, xid);
						Titanium.App.Properties.setString(KEY_CODE_USERNAME, name);
						var selectData = [];
						selectData[0] = resData[0].records[i].lastname;
						selectData[1] = resData[0].records[i].firstname;
						Titanium.App.Properties.setList(KEY_CODE_FULLNAME, selectData);
						break;
					}
					var win = Titanium.UI.createWindow({url:LIST_FILE});
					Titanium.UI.currentTab.open(win, {animated:true});		
				}
			} catch (e) {
				Titanium.API.error(e);
				var dialog = Titanium.UI.createAlertDialog({});
				dialog.title =  Titanium.Locale.getString("event_catch_title");
				dialog.message = Titanium.Locale.getString("event_catch_message");
				dialog.show();
				return;
			}
		};
		client.onerror = function() {
			if (client.status == 401) {
				var dialog = Titanium.UI.createAlertDialog({});
				dialog.title =  Titanium.Locale.getString("event_connect_title");
				dialog.message = Titanium.Locale.getString("event_connect_message");
				dialog.show();
				return;
			}
			var dialog = Titanium.UI.createAlertDialog({});
			dialog.title =  Titanium.Locale.getString("event_network_title");
			dialog.message = Titanium.Locale.getString("event_network_message");
			dialog.show();
			return;
		};
		client.send();
	} else {
		var dialog = Titanium.UI.createAlertDialog({});
		dialog.title =  Titanium.Locale.getString("event_catch_title");
		dialog.message = Titanium.Locale.getString("event_catch_message");
		dialog.show();
		return;
	}
	
};
