Titanium.include('../common/constant.js');

var backList = function () {
	var win = Titanium.UI.createWindow({url:LIST_FILE});
	Titanium.UI.currentTab.open(win, {animated:true});		
}

var sendData = function () {
	var reportValue;
	var value = rdoReport.value;
	if (value == false) {
			reportValue =  0;
	} else {
			reportValue =  1;
	}
	
	Titanium.Media.openPhotoGallery({
			success : function(event) {
					var image = event.media;
					if (event.mediaType == Titanium.Media.MEDIA_TYPE_PHOTO) {
							//HttpClientAccessToGoogle
							var selectData = [];
							selectData = Titanium.App.Properties.getList(KEY_CODE_FULLNAME);
							
							var client = Titanium.Network.createHTTPClient({timeout : 100000});
							client.open(POST_REC, GOOGLE_STORE_URL);
							Titanium.API.info(GOOGLE_STORE_URL);
							client.send({ media : image, contents :  Titanium.App.Properties.getString(KEY_CODE_MEMO), xid : Titanium.App.Properties.getString(KEY_CODE_USERXID), lastname : selectData[0], firstname : selectData[1], device : FILE_DEVICE});
							client.onload = function() {
									try {
										var resData = eval("("+this.responseText+")");
										if (resData[0].error == 'Yes') {
												var record = resData[0].count;
												if (record == 0) {
														return ;				
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
														return ;				
												}
												var googlekey = resData[0].records[0].googlekey;
												var googleversion = resData[0].records[0].googleversion;
												//ReceiveData and Send Intalio
												var selectData = [];
												selectData = Titanium.App.Properties.getList(KEY_CODE_SELECTUSER);
												var memo = Titanium.App.Properties.getString(KEY_CODE_MEMO);
												if (memo == null) {
													memo = BLANK;
												}
												
												var intalioclient = Titanium.Network.createHTTPClient({timeout : 100000});
												var parameter =  '&parameter=xid:' + selectData[0] + ',googleversion:' + googleversion + ',googlekey:' + googlekey + ',comment:' + memo +  ',completeflag:' + reportValue + ',owner:' + Titanium.App.Properties.getString(KEY_CODE_USERXID);
												var intaliourl = REGISTER_URL + '&countxid=' + selectData[0] + '&countseqno=' + selectData[4] + '&intaliouser=' + Titanium.App.Properties.getString(KEY_CODE_USERNAME) + parameter;
												intalioclient.open(GET_REC, intaliourl);
												Titanium.API.info(intaliourl);
												intalioclient.onload = function() {
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
																	Titanium.App.Properties.setString(KEY_CODE_MEMO, null);																	
																	setTimeout(function(){
																			var win = Titanium.UI.createWindow({url:LIST_FILE});
																			Titanium.UI.currentTab.open(win, {animated:true});		
																	}, 3000);
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
												intalioclient.onerror = function() {
														if (intalioclient.status == 401) {
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
												intalioclient.send();	

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
					}
			},
			cancel : function() {
					return;
			},
			error : function(error) {
					var dialog = Titanium.UI.createAlertDialog({});
					dialog.title =  Titanium.Locale.getString("event_gallary_title");
					dialog.message = Titanium.Locale.getString("event_gallary_message");
					dialog.show();
					return;
			},							
			saveToPhotoGallery : false,
			allowEditing : false,
			mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO]
	});
}

var showCamera =  function () {
	var imageView = Ti.UI.createImageView({
			width : 320,
			height : 480,
			top : 0
	});
	
	Titanium.Media.showCamera({
			success : function(event) {
					var rect    = event.cropRect;
					var image   = event.media;
					if (event.mediaType == Titanium.Media.MEDIA_TYPE_PHOTO) {
							imageView.image = image;
					}
					var window = Titanium.UI.createWindow({url:CAMERA_FILE});
					window.add(imageView);
					window.open({ modal　:　true});
			},
			cancel : function() {
					return;
			},
			error : function(error) {
					var dialog = Titanium.UI.createAlertDialog({});
					dialog.title =  Titanium.Locale.getString("event_camera_title");
					dialog.message = Titanium.Locale.getString("event_camera_message");
					dialog.show();
					return;
			},							
			saveToPhotoGallery : true,
			allowEditing : true,
			mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO]
	});
}

var showMap = function () {
		var window = Titanium.UI.createWindow({url:MAP_FILE});
		window.open({ modal　:　true})
}

var closeMap = function () {
		window.close();	
}
