### squareGame
方块游戏

### 

将游戏区域设置成一个矩阵，通过设置矩阵来设置游戏方块，游戏功能有左移，右移，到达底部固定，积分，随机生成下一个以及消行和生成干扰以增加难度

square.js是方块的数据，包含各个方块的属性和方法，是一个父类，每种方块通过继承父类的方法实现方块的功能

squareFactory.js保存的是每种方块的数据，其中的公共方法如旋转、下落、左右移动等通过原型链继承父类方法

game.js是游戏核心，实现游戏主要功能，如消行、积分，底部固定，随机生成下一个等

local.js保存的是游戏对象的一些事件如键盘事件，游戏开始和结束控制等

script.js游戏初始化

### 游戏部分代码

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

//方块数据

var Square = function(){
	
	this.data = [

		[0,0,0,0],

		[0,0,0,0],

		[0,0,0,0],

		[0,0,0,0]
	];

	//原点

	this.origin = {

		x:0,

		y:0

	}
	
	//旋转方向

	this.dir = 0;
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

