var styles = {
    lblTitle: {
    	textAlign:'center',
    	shadowColor:'#aaa',
    	shadowOffset:{x:5,y:5},
    	font:{fontSize: 30},
        height: 80,
        width:'auto',
        top: "vertical"
    },
   	rdoReport: {
   		value:true,
        left: 40,
        top:220
    },
    txtReport: {
        color:'#000000',
        top: 170,
        left: 40,
        width: 250,
        height: 40,
        hintText:'コメントを入力',
        //value: 'admin',
        textAlign: 'left',
        verticalAlign: 'middle',
        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        leftButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
        rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS
    },
    btnMap: {
        width: 250,
        height: 50,
        left: 40,
        top: 100,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    },
    btnClose: {
        width: 250,
        height: 50,
        left: 40,
        top: 400,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    },
    btnCamera: {
        width: 250,
        height: 50,
        left: 40,
        top: 260,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    },
    btnGallary: {
        width: 250,
        height: 50,
        left: 40,
        top: 330,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    },
    btnBack: {
        width: 250,
        height: 50,
        left: 40,
        top: 400,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    }
};