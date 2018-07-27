cAttackWaitBar = function(point, time) {
	this.time;
	this.maxTime;
	this.timeBar;
	this,point;
	this.init(point, time);
};
inherits(cAttackWaitBar, cTask);

cAttackWaitBar.prototype.init = function(point, time) {
	this,point = point;
	this.maxTime = this.time = time;

	let backGroud = new Sprite(point.w, point.h);
	let surface = new Surface(point.w, point.h);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
	surface.context.fillRect(0, 0, point.w, point.h);
	backGroud.image = surface;
	this.getGroup().addChild(backGroud);

	backGroud = new Sprite(point.w-2, point.h - 2);
	surface = new Surface(point.w-2, point.h - 2);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(0, 150, 150, 1.0)';
	surface.context.fillRect(1, 1, point.w-1, point.h - 1);
	backGroud.image = surface;
	this.getGroup().addChild(backGroud);

	this.timeBar = new Sprite(point.w-2, point.h - 2);
	surface = new Surface(point.w-2, point.h - 2);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(255, 100, 100, 1.0)';
	surface.context.fillRect(1, 1, point.w-1, point.h - 1);
	this.timeBar.image = surface;
	this.timeBar.originX = 1;
	this.getGroup().addChild(this.timeBar);
};

cAttackWaitBar.prototype.action = function() {
	const percent = Math.floor((100 / this.maxTime) * this.time);
	this.timeBar.scaleX = (percent * 0.01);

	if (--this.time <= 0) {
		this.time = this.maxTime;
		return false;
	}

	return true;
};

cAttackWaitBar.prototype.draw = function() {

};

cAttackWaitBar.prototype.remove = function() {
	removeAllChild(this.getGroup());
};