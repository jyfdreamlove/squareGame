var Game = function(){
	//dom元素
	var gameDiv;
	var nextDiv;
	var scoreDiv;
	var score = 0;
	//游戏矩阵
	var gameData = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	];
	//当前方块
	var cur;
	//下一个方块
	var next;
	//divs
	var gameDivs = [];
	var nextDivs = [];
	//初始化div
	var initDiv = function(container,data,divs){
		for(var i=0;i<data.length;i++){
			var div = [];
			for(var j=0;j<data[i].length;j++){
				var newnode = document.createElement('div');
				newnode.className = "none";
				newnode.style.top = i*20 + "px";
				newnode.style.left = j*20 +"px";
				container.appendChild(newnode);
				div.push(newnode);
			}
			divs.push(div);
		}
	}
	//刷新div
	var refreshDiv = function(data,divs){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				if(data[i][j] == 0){
					divs[i][j].className = "none";
				}
				if(data[i][j] == 1){
					divs[i][j].className = "done";
				}
				if(data[i][j] == 2){
					divs[i][j].className = "current";
				}
			}
		}
	}
	//检查点是否合法
	var check = function(pos,x,y){
		if(pos.x + x < 0){
			return false;
		}else if(pos.x + x >=gameData.length){
			return false;
		}else if(pos.y + y < 0){
			return false;
		}else if(pos.y + y >=gameData[0].length){
			return false;
		}else if(gameData[pos.x+x][pos.y+y] == 1){
			return false;
		}else{
			return true;
		}
	}
	//判断数据是否合法
	var isValid = function(pos,data){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				if(data[i][j] != 0){
					if(!check(pos,i,j)){
						return false;
					}
				}
			}
		}
		return true;
	}
	//设置数据
	var setData = function(){
		for(var i=0;i<cur.data.length;i++){
			for(j=0;j<cur.data[i].length;j++){
				if(check(cur.origin,i,j)){

					gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
				}
			}
		}
	}
	//清除数据
	var clearData = function(){
		for(var i=0;i<cur.data.length;i++){
			for(j=0;j<cur.data[i].length;j++){
				if(check(cur.origin,i,j)){
					gameData[cur.origin.x+i][cur.origin.y+j] = 0;
				}
				
			}
		}
	}
	//下移
	var down = function(){
		
		if(cur.canDown(isValid)){
			clearData();
			cur.down() ;
			setData();
			refreshDiv(gameData,gameDivs);
			return true;
		}
		else{
			return false;
		}
		
	}

	//右移
	var right = function(){
		if(cur.canRight(isValid)){
			clearData();
			cur.right();
			setData();
			refreshDiv(gameData,gameDivs);
		}
	}

	//左移
	var left = function(){
		
		if(cur.canLeft(isValid)){

			clearData();
			cur.left();
			setData();
			refreshDiv(gameData,gameDivs);
		}
	}

	//旋转
	var rotate = function(){
		if(cur.canRotate(isValid)){
			clearData();
			cur.rotate();
			setData();
			refreshDiv(gameData,gameDivs);
		}
	}

	//到达底部固定
	var fixed = function(){
		for(var i=0;i<cur.data.length;i++){
			for(var j=0;j<cur.data[i].length;j++){
				if(check(cur.origin,i,j)){
					if(gameData[cur.origin.x+i][cur.origin.y+j] == 2){
						gameData[cur.origin.x+i][cur.origin.y+j] =1;
					}
				}
			}
		}
		refreshDiv(gameData,gameDivs)
	}


	//随机生成下一个
	var performNext = function(type,dir){
		cur = next;
		setData();
		next = squareFactory.prototype.make(type,dir);
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}

	//消行
	var canceldiv = function(){
		var line = 0;
		for(var i=gameData.length-1;i>=0;i--){
			var clear = true;
			for(var j=0;j<gameData[i].length;j++){
				if(gameData[i][j] !== 1){
					clear = false;
					break;
				}
			}
			if(clear){
				line ++;
				for(var m=i;m>0;m--){
					for(var n=0;n<gameData[0].length;n++){
						gameData[m][n] = gameData[m-1][n];
					}
				}
				for(var n=0;n<gameData[0].length;n++){
					gameData[0][n] = 0;
				}
				i++;
			}
		}
		return line;
	}

	//积分
	var addScroe = function(line){
		var s = 0;
		switch (line) {
			case 1:
				s = 10;
				break;
			case 2:
				s = 20;
				break;
			case 3:
				s = 50;
				break;
			case 4:
				s = 100;
				break;
			default:
				// statements_def
				break;
		}
		score = score + s;
		scoreDiv.innerHTML = score;
	}

	//游戏结束
	var checkGameOver = function(){
		var gameover = false;
		for(var i=0;i<gameData[0].length;i++){
			if(gameData[1][i] == 1){
				gameover = true;
			}
		}
		return gameover;
	}


	//生成干扰，增加难度
	var addTailLines = function(lines){
		for(var i=0;i<gameData.length-lines.length;i++){
			gameData[i] = gameData[i+lines.length];
		}
		for(var i = 0;i<lines.length;i++){
			gameData[gameData.length - lines.length] = lines[i]
		}
		cur.origin.x = cur.origin.x - lines.length;
		if(cur.origin.x < 0){
			cur.origin.x = 0;
		}
		refreshDiv(gameData,gameDivs);
	}
	
	


	//初始化
	var init = function(doms,type,dir){
		gameDiv = doms.gameDiv;
		nextDiv = doms.nextDiv;
		scoreDiv = doms.scoreDiv;
		next = squareFactory.prototype.make(type,dir);
		
		initDiv(gameDiv,gameData,gameDivs)
		initDiv(nextDiv,next.data,nextDivs);
		
		refreshDiv(next.data,nextDivs);
	}
	//到处API
	this.init = init;
	this.down = down;
	this.right = right;
	this.left = left;
	this.fixed = fixed;
	this.rotate = rotate;
	this.canceldiv = canceldiv;
	this.performNext = performNext;
	this.checkGameOver = checkGameOver;
	this.addScroe = addScroe;
	this.addTailLines = addTailLines;
	this.fall = function(){
		while(down());
	}
}