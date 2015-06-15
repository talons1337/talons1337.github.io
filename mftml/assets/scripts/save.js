function save(){
	if(typeof(Storage) !== "undefined"){
		localStorage.hasSaved = "true";
		localStorage.solarGenCount = solarGen.count;
		localStorage.ritegCount = riteg.count;
		localStorage.funds = gameVals.funds;
		localStorage.totalpower = gameVals.totalpower;
		
		document.getElementById("loadgame").disabled = false;
	}
	else{
		alert("Sorry, but your browser is too old to save.");
	}
}
function load(){
	if(typeof(Storage) !== "undefined"){
		solarGen.count = parseInt(localStorage.solarGenCount);
		riteg.count = parseInt(localStorage.ritegCount);
		gameVals.funds = parseInt(localStorage.funds);
		gameVals.totalpower = parseInt(localStorage.totalpower);
		
		var countup = ["solarcount","rtgcount"]
		var countupType = ["solarGen","riteg"]
		for(var i=0;i<countup.length;i++){
			document.getElementById(countup[i]).innerHTML = window[countupType[i]].count;
		}
	}
	else{
		alert("Sorry, but your browser is too old to load.");
	}
}
function wipesave(){
	var wipeprompt = prompt("Are you SURE you want to delete your save? Type 'DELETE' to confirm.");
	if (wipeprompt === "DELETE"){
		localStorage.hasSaved = "false";
		document.getElementById("loadgame").disabled = true;
		alert("Save was successfully wiped!");
	}
	else{
		alert("Save was not wiped");
	}
}