var game = {
	vals:{
		funds:1000000000000000000,
		totalpower:0
	},
	states:{
		day:true
	},
	lists:{
		listAllGen:[solarGen.id,riteg.id,nuke.id],
		listAllNeedSun:[solarGen.id]
	},
	funcs:{
		getOutput:
			function(sourceGen){
				return window[sourceGen].count*window[sourceGen].genRate*window[sourceGen].multiplier*window[sourceGen].active;
			},
		getTotalPower: /*Per second*/
			function(){
				var out = 0;
				for(var i = 0;i<game.lists.listAllGen.length;i++){
					out += window[game.lists.listAllGen[i]].output();
				}
				return out;
			},
		cycleDay:
			function(){
				if(game.states.day === true){
					game.states.day = false;
					var day = document.getElementsByTagName("*"), i;
					for (i in day) {
						if((" " + day[i].className + " ").indexOf(" " + "inneritem state day" + " ") > -1) {
							day[i].className = "inneritem state day-off";
						}
					}
					for(var j = 0;j<game.lists.listAllNeedSun.length;j++){
						window[game.lists.listAllNeedSun[j]].active = 0;
					}
				}
				else if(game.states.day === false){
					game.states.day = true;
					var day = document.getElementsByTagName("*"), i;
					for (i in day) {
						if((" " + day[i].className + " ").indexOf(" " + "inneritem state day-off" + " ") > -1) {
							day[i].className = "inneritem state day";
						}
					}
					for(var j = 0;j<game.lists.listAllNeedSun.length;j++){
						window[game.lists.listAllNeedSun[j]].active = 1;
					}
				}
				else{
					console.log('Failed to cycle day.');
				}
			}
	},
	loop:{
		power:
			function(){
				game.vals.totalpower += game.funcs.getTotalPower();
				document.getElementById('totalpower').innerHTML = game.vals.totalpower;
			}
	}
};

/*var gameVals = {
	funds:10000,
	totalpower:0,
	day:true
};
var gameLists = {
	listAllGen:[solarGen.id,riteg.id],
	listAllNeedSun:[solarGen.id]
};
var gameFuncs = {
	getOutput:
		function(sourceGen){
			return window[sourceGen].count*window[sourceGen].genRate*window[sourceGen].multiplier*window[sourceGen].active;
		},
	getTotalPower: 
		function(){
			var out = 0;
			for(var i = 0;i<gameLists.listAllGen.length;i++){
				out += window[gameLists.listAllGen[i]].output();
			}
			return out;
		},
	cycleDay:
		function(){
			if(gameVals.day === true){
				gameVals.day = false;
				var day = document.getElementsByTagName("*"), i;
				for (i in day) {
					if((" " + day[i].className + " ").indexOf(" " + "inneritem state day" + " ") > -1) {
						day[i].className = "inneritem state day-off";
					}
				}
				for(var j = 0;j<gameLists.listAllNeedSun.length;j++){
					window[gameLists.listAllNeedSun[j]].active = 0;
				}
			}
			else if(gameVals.day === false){
				gameVals.day = true;
				var day = document.getElementsByTagName("*"), i;
				for (i in day) {
					if((" " + day[i].className + " ").indexOf(" " + "inneritem state day-off" + " ") > -1) {
						day[i].className = "inneritem state day";
					}
				}
				for(var j = 0;j<gameLists.listAllNeedSun.length;j++){
					window[gameLists.listAllNeedSun[j]].active = 1;
				}
			}
			else{
				alert('wot');
			}
		}
}
*/

function gameloop(){
	setInterval(function(){
		document.getElementById('funds').innerHTML = game.vals.funds;
		document.getElementById('genrate').innerHTML = game.funcs.getTotalPower();
		game.loop.power();
		
	},(1000));
	setInterval(function(){
		game.funcs.cycleDay();
	},(120000));
}

function buyGen(genType,countUpdate){
	if(window[genType].canBeBought()){
		game.vals.funds = game.vals.funds - window[genType].price;
		window[genType].count += 1;
		document.getElementById(countUpdate).innerHTML = window[genType].count;
	}
	else{
		//insufficient funds
	}
}

function gameInit(){
	if(localStorage.hasSaved == "true"){
		document.getElementById("loadgame").disabled = false;
	}
	
}