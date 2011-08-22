Titanium.include('../common/constant.js');
Titanium.include('style.js');

var win = Titanium.UI.currentWindow;

var btnLatest = Titanium.UI.createButton(styles["btnLatest"]);
btnLatest.title = Titanium.Locale.getString("list_btnLatest");
win.add(btnLatest);
btnLatest.addEventListener(EVT_CLICK, function() {
	var win = Titanium.UI.createWindow({url:LIST_FILE});
	Titanium.UI.currentTab.open(win, {animated:true});		
});

var btnBack = Titanium.UI.createButton(styles["btnBack"]);
btnBack.title = Titanium.Locale.getString("list_btnBack");
win.add(btnBack);
btnBack.addEventListener(EVT_CLICK, function() {
	Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, null);
	Titanium.App.Properties.setString(KEY_CODE_USERXID, null);
	Titanium.App.Properties.setString(KEY_CODE_USERNAME, null);
	Titanium.App.Properties.setString(KEY_CODE_FULLNAME, null);
	Titanium.App.Properties.setString(KEY_CODE_MEMO, null);
	var win = Titanium.UI.createWindow({url:LOGIN_FILE2});
	Titanium.UI.currentTab.open(win, {animated:true});		
});

var tabtitle = Titanium.UI.createTabbedBar({
		labels : ['本日のリスト', 'やり直しリスト'],
		backgroundColor : '#336699',
		top : 70,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height : 40,
		width : 220,
		index : 0
});

win.add(tabtitle);

tabtitle.addEventListener(EVT_CLICK, function(e) {
		Titanium.API.info(e.index);
		if (e.index == 0) {
			loadTodayView();
			win.open();
		} else {
			loadAgainView();
			win.open();
		}
});

win.addEventListener(EVT_OPEN, function(e) {
		loadTodayView();
		win.open();
});

function loadTodayView() {
		var rowData = [];
		var selectData = [];
		var xids = [];
		var names = [];
		var latitudes = [];
		var longitudes = [];
		var addresses = [];
		var seqnos = [];
		
		var client = Titanium.Network.createHTTPClient({timeout : 100000});
		var url = LIST_URL + '&intaliouser=' + Titanium.App.Properties.getString(KEY_CODE_USERNAME) + '&parameter=owner:' + Titanium.App.Properties.getString(KEY_CODE_USERXID);
		Titanium.API.info(url);
		
		client.open(GET_REC, url);
		client.onload = function() {
			try {
				var resData = eval("("+this.responseText+")");
				if (resData[0].error == 'Yes') {
					var record = resData[0].count;
					if (record == 0) {
					} else {
						var dialog = Titanium.UI.createAlertDialog({});
						dialog.title =  Titanium.Locale.getString("event_yes_title");
						dialog.message = resData[0].contents;
						dialog.show();
						return;
					}
				} else {
					var record = resData[0].count;
					if (record == 0) {
					}
					for (var i = 0; i < resData[0].records.length; i++) {
						if (resData[0].records[i].xid == null) {
						} else {
							xids[i] = resData[0].records[i].xid;
							names[i] = resData[0].records[i].name;
							latitudes[i] = resData[0].records[i].latitude;
							longitudes[i] = resData[0].records[i].longitude;
							addresses[i] = resData[0].records[i].address;
							seqnos[i] = resData[0].records[i].seqno;
							
							if (i == 0) {
								selectData[0] = resData[0].records[i].xid;
								selectData[1] = resData[0].records[i].latitude;
								selectData[2] = resData[0].records[i].longitude;
								selectData[3] = resData[0].records[i].address;
								selectData[4] = resData[0].records[i].seqno;
								selectData[5] = resData[0].records[i].name;
								// Reuse
								Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, null);
								Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, selectData);
							}
							row = Titanium.UI.createTableViewRow(styles["rows"]);
							rowTitle = Titanium.UI.createLabel(styles["rowTitle"]);
							rowTitle.text = Titanium.Locale.getString("list_rowcontentstitle")  + resData[0].records[i].name;
							row.add(rowTitle);
							
							contentsTitle = Titanium.UI.createLabel(styles["contentsTitle"]);
							contentsTitle.text = resData[0].records[i].address;
							row.add(contentsTitle);
							rowData.push(row);
							row = [];
						}
					}
				}
				
				tableview = Titanium.UI.createTableView(styles["tableRows"]);
				tableview.data = rowData;
				tableview.addEventListener(EVT_CHANGE, function(e){
					var index = e.index;
					callNext(index);
				});
				
				tableview.addEventListener(EVT_SINGLETAP, function(e){
					var index = e.index;
					callNext(index);
				});
				
				function callNext(index) {
					selectData = [];
					selectData.push(xids[index]);
					selectData.push(latitudes[index]);
					selectData.push(longitudes[index]);
					selectData.push(addresses[index]);
					selectData.push(seqnos[index]);
					selectData.push(names[index]);
					Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, selectData);			
					Titanium.API.info('Select View is ' + xids[index]);
					
					var win1 = Titanium.UI.createWindow({url:REGISTR_FILE});
					Titanium.UI.currentTab.open(win1, {animated:true});		
				}
				
				win.add(tableview);		
				
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
}

function loadAgainView() {
		var rowData = [];
		var selectData = [];
		var xids = [];
		var names = [];
		var latitudes = [];
		var longitudes = [];
		var addresses = [];
		var seqnos = [];
		var dates = [];
		
		var client = Titanium.Network.createHTTPClient({timeout : 100000});
		var url = AGAIN_LIST_URL + '&intaliouser=' + Titanium.App.Properties.getString(KEY_CODE_USERNAME) + '&parameter=owner:' + Titanium.App.Properties.getString(KEY_CODE_USERXID);
		Titanium.API.info(url);
		
		client.open(GET_REC, url);
		client.onload = function() {
			try {
				var resData = eval("("+this.responseText+")");
				if (resData[0].error == 'Yes') {
					var record = resData[0].count;
					if (record == 0) {
					} else {
						var dialog = Titanium.UI.createAlertDialog({});
						dialog.title =  Titanium.Locale.getString("event_yes_title");
						dialog.message = resData[0].contents;
						dialog.show();
						return;
					}
				} else {
					var record = resData[0].count;
					if (record == 0) {
					}
					for (var i = 0; i < resData[0].records.length; i++) {
						if (resData[0].records[i].xid == null) {
						} else {
							xids[i] = resData[0].records[i].xid;
							names[i] = resData[0].records[i].name;
							latitudes[i] = resData[0].records[i].latitude;
							longitudes[i] = resData[0].records[i].longitude;
							addresses[i] = resData[0].records[i].address;
							seqnos[i] = resData[0].records[i].seqno;
							dates[i] = resData[0].records[i].date;
								
							if (i == 0) {
								selectData[0] = resData[0].records[i].xid;
								selectData[1] = resData[0].records[i].latitude;
								selectData[2] = resData[0].records[i].longitude;
								selectData[3] = resData[0].records[i].address;
								selectData[4] = resData[0].records[i].seqno;
								selectData[5] = resData[0].records[i].name;
								Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, null);
								Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, selectData);
							}
							row = Titanium.UI.createTableViewRow(styles["againrows"]);
							rowTitle = Titanium.UI.createLabel(styles["rowTitle"]);
							rowTitle.text = Titanium.Locale.getString("list_rowcontentstitle")  + resData[0].records[i].name;
							row.add(rowTitle);
							
							contentsTitle = Titanium.UI.createLabel(styles["contentsTitle"]);
							contentsTitle.text = resData[0].records[i].address;
							row.add(contentsTitle);
							
							footTitle = Titanium.UI.createLabel(styles["footTitle"]);
							var visitdate = resData[0].records[i].date;
							visitdate = visitdate.replace('T15:00:00Z','');
							var splitdate = visitdate.split('-');
							footTitle.text = Titanium.Locale.getString("list_rowcontentstitle1") + splitdate[0] + Titanium.Locale.getString("date_year") + splitdate[1] 
							+ Titanium.Locale.getString("date_month") + splitdate[2] + Titanium.Locale.getString("date_day");
							row.add(footTitle);
							rowData.push(row);
							row = [];
						}
					}
				}
				
				tableview = Titanium.UI.createTableView(styles["tableRows"]);
				tableview.data = rowData;
				tableview.addEventListener(EVT_CHANGE, function(e){
					var index = e.index;
					callNext(index);
				});
				
				tableview.addEventListener(EVT_SINGLETAP, function(e){
					var index = e.index;
					callNext(index);
				});
				
				function callNext(index) {
					selectData = [];
					selectData.push(xids[index]);
					selectData.push(latitudes[index]);
					selectData.push(longitudes[index]);
					selectData.push(addresses[index]);
					selectData.push(seqnos[index]);
					selectData.push(names[index]);
					Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, selectData);			
					Titanium.API.info('AgainList is ' + xids[index]);
					
					var win1 = Titanium.UI.createWindow({url:REGISTR_FILE});
					Titanium.UI.currentTab.open(win1, {animated:true});		
				}
				
				win.add(tableview);	
				
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
}