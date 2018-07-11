let cTouch = function() {
	this.isTouch;
	this.point;
	this.init();
};

cTouch.prototype.init = function() {
	this.isTouch = false;
	this.point = new cPoint(0, 0, 1, 1);
};
