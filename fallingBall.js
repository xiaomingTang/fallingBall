window.onload=function(){
 	
	function $(id){
		return document.getElementById(id);
	}
 	
 	function Canvas(elem,strokeStyle,fillStyle){
		if(!!elem){
			this.strokeStyle=strokeStyle;
			this.fillStyle=fillStyle;
			this.elem=elem;
		}
		else{			
			this.strokeStyle="red";
			this.fillStyle="#666";
			this.elem=$("drawing");
		}
		this.width=500;
		this.height=500;
		if(this.elem.getContext){
			this.ctx=this.elem.getContext("2d");
			this.ctx.strokeStyle=this.strokeStyle;
			this.ctx.fillStyle=this.fillStyle;
		}
	}
	Canvas.prototype={
		constructor:Canvas,
		//画球,参数依次是 圆心x坐标  圆心y坐标  半径  0描边/1填充/2描边+填充
		ball: function(x,y,r,n){
			this.ctx.beginPath();
			this.ctx.moveTo(x+r,y);
			this.ctx.arc(x,y,r,0,2*Math.PI,true);
			switch(n){
				case 0:
					this.ctx.stroke();
					break;
				case 1:
					this.ctx.fill();
					break;
				case 2:
					this.ctx.stroke();
					this.ctx.fill();
					break;
				default:
					break;
			}
			return this;
		},
		clear: function(x,y,r){
			this.ctx.clearRect(x-r,y-r,2*r,2*r);
		}
	}
	
	function Ball(){
		this.radius=10;
		this.position={
			x: 50,
			y: 50
		};
		this.speed={
			x: 2000,
			y: 0
		};
		this.g=65000,		//重力加速度
		this.a=1300,		//摩擦力加速度
		this.canvas=new Canvas();
	}
	Ball.prototype={
		constructor: Ball,
		
		init: function(){
			this.canvas.ball(this.position.x,this.position.y,this.radius,1);
		},
		
		fall: function(dt){
			var that=this,
				r=that.radius,
				h_0=w_0=r+1,
				w=that.canvas.width-r-1,
				h=that.canvas.height-r-1;
				
				x=that.position.x,
				y=that.position.y,
				vx=that.speed.x,
				vy=that.speed.y,
			
			loop=setInterval(function(){
				that.canvas.clear(x,y,r+1);
				//检测碰撞
				if(x<w_0){
					x=w_0;
					vx=-0.9*vx;
				}
				else if(x>w){
					x=w;
					vx=-0.9*vx;
				}
				if(y<h_0){
					y=h_0;
					vy=-0.9*vy;
				}
				else if(y>h){
					y=h;
					vy=-0.9*vy;
				}
				if(y<h){
					vy+=that.g/(1000/dt);
				}
				if((y<h+10 && y>h-10) && (vy<10 && vy>-10)){
					y=h;
					vy=0;
					if(vx<0){
						vx+=that.a/(1000/dt);
					}
					else{
						vx-=that.a/(1000/dt);
					}
					if(vx<10 && vx>-10){
						clearInterval(loop);
					}
				}
				
				
				
				x+=vx/(1000/dt);
				y+=vy/(1000/dt);
				that.canvas.ball(x,y,r,1);
			},dt);
		},
	}
	var ball=new Ball();
	
	ball.init();
	ball.fall(1);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 	
 	
}
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
 	
