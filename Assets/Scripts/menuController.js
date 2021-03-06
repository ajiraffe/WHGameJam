﻿import System.IO;

public var levels : Array = [];
private var buttonCount : int = 0;
private var buttonNames : Array = [];
private var buttonPress : boolean = false;
private var lastTime : float = 0;
private var lastAxisVal : float = 0;

private var xOffset : float;
private var yOffset : float;

var scrollPosition : Vector2;
public var loader : levelLoadController;
function Start () {
	var info = new DirectoryInfo(Application.dataPath + "/Levels");
	var fileInfo = info.GetFiles();
	for (file in fileInfo) {
		if (file.Name.EndsWith(".txt")) {
			levels.push(file.Name);
			buttonNames.push(file.Name.Replace(".txt","").Replace("+","★"));
		}
	}
	buttonNames.push("Real Life ★★★★★");
	levels.length++;
	scrollPosition = new Vector2(0, 100);
	
	xOffset = Screen.width * 0.5;
	yOffset = Screen.height;
}

function Update () {
	var a = Input.GetAxis("Vertical");
	
	if (Time.time - lastTime > 0.3 || lastAxisVal == 0){
		lastTime = Time.time;
		lastAxisVal = a;
		if ( a < 0 ) {
			buttonCount++;
			if ( buttonCount >= levels.length ){
				buttonCount = 0;
			}			
		} else if ( a > 0 ) {
			buttonCount--;
			if ( buttonCount <= 0 ) {
				buttonCount = levels.length - 1;
			}
		}
	}
	
	if (Input.GetButtonDown("Fire1")){
		if (buttonNames[buttonCount] == "Real Life ★★★★★"){
			Application.Quit();
		} else{
			loader.fileName = levels[ buttonCount ];
			Application.LoadLevel( 1 );
		}
	}
}

function OnGUI() {
	if ( buttonCount < levels.length ) {
		GUI.FocusControl(buttonNames[ buttonCount ]);
	}
	
	//scrollPosition = GUI.BeginScrollView(new Rect(50,50,100,100), scrollPosition, new Rect(50,50,500,500));
	
	for (var j=0; j<buttonNames.length; j++){
		GUI.SetNextControlName(buttonNames[j]);
		if (GUI.Button(new Rect(100 + xOffset - 120, (50 + j*24), 120, 24), buttonNames[j])){
			buttonPress = true;
		}
	}
				
	//GUI.EndScrollView();
	
}