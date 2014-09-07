﻿#pragma strict
import System.IO;

public var levels : Array = [];
var scrollPosition : Vector2;
public var loader : levelLoadController;
function Start () {
	var info = new DirectoryInfo(Application.dataPath + "/Levels");
	var fileInfo = info.GetFiles();
	for (file in fileInfo) {
		if (file.Name.EndsWith(".txt")) {
			levels.push(file.Name);
		}
	}
}

function Update () {

}

function OnGUI() {
	scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Width(500), GUILayout.Height(500));
	for (var i : String in levels){
		if(GUILayout.Button(i.Replace(".txt",""))) {
			print(i);
			loader.fileName = i;
			Application.LoadLevel(1);
		}
	}
	GUILayout.EndScrollView();
}