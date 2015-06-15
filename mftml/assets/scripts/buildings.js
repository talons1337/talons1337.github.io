function generator(id,name,count,genRate,active,multiplier,price){
	this.id = id;
	this.name = name;
	this.count = count;
	this.genRate = genRate;
	this.active = active;
	this.multiplier = multiplier;
	this.price = price;
	this.output = 
		function(){
			return game.funcs.getOutput(this.id);
		};
	this.canBeBought =
		function(){
			if(game.vals.funds - this.price >= 0){
				return true;
			}
			else{
				return false;
			}
		};
}
var solarGen = new generator("solarGen","Solar Generator",0,25,1,1,400);
var riteg = new generator("riteg","RITEG",0,20,1,1,760);
var nuke = new generator("nuke","Nuclear Reactor",0,2500000,1,1,400);