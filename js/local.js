var Local = function(){
	//游戏对象
	var game;
	var INTERVAL = 200;
	var timer = null;
	var time = 0;
	//绑定键盘事件
	var bindKeyEvent = function(){
		document.onkeydown = function(e){
			if(e.keyCode == 38){
				//up
				game.rotate();
			}
			if(e.keyCode == 39){
				//right
				game.right();
			}
			if(e.keyCode == 40){
				//down
				game.down();
			}
			if(e.keyCode == 37){
				//left
				game.left();
			}
			if(e.keyCode == 32){
				//space
				game.fall();
			}
		}
	}
	var move = function(){
		time ++;
		if(time >= 50){
			//每过10s底部增加一行
			game.addTailLines(genarataBottomLine(1));
			time = 0;
		}
		if(!game.down()){
			game.fixed();
			var line = game.canceldiv();
			if(line){
				game.addScroe(line);
			}
			if(game.checkGameOver()){
				stop();
			}else{
				game.performNext(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
			}
			
		}

		
	}
	//开始方法
	var start = function(){
		var doms = {
			gameDiv : document.getElementById('game'),
			nextDiv : document.getElementById('next'),
			scoreDiv : document.getElementById('score')
		}
		game = new Game();

		game.init(doms,Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
		game.performNext(Math.ceil(Math.random()*7-1),Math.ceil(Math.random()*4-1));
		bindKeyEvent();
		timer = setInterval(move,INTERVAL);
	}
	//结束方法
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
	}
	//随机生成干扰行
	var genarataBottomLine = function(num){
		var lines = [];
		for(var i=0;i<num;i++){
			var line = [];
			for(j=0;j<10;j++){
				line.push(Math.ceil(Math.random()*2)-1);
			}
			lines.push(line);
		}
		return lines;
	}
	//导出API
	this.start = start;
}