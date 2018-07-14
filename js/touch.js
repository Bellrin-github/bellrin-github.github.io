let cTouch = function() {
	this.isTouch;
	this.point;
	this.cellPoint;
	this.count;
	this.pickDropId;
	this.init();
};

cTouch.prototype.init = function() {
	this.isTouch = false;
	this.point = new cPoint(0, 0, 1, 1);
	this.cellPoint = new cPoint(-1, -1, 1, 1);
	this.count = 0;
	this.pickDropId = null;
};
