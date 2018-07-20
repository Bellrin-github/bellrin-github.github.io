let cTouch = function() {
	this.isTouch;
	this.point;
	this.cellPoint;
	this.cellPointOld;
	this.count;
	this.pickDropId;
	this.isChange;
	this.init();
};

cTouch.prototype.init = function() {
	this.isTouch = false;
	this.point = new cPoint(0, 0, 1, 1);
	this.cellPoint = new cPoint(-1, -1, 1, 1);
	this.cellPointOld = new cPoint(-1, -1, 1, 1);
	this.count = 0;
	this.pickDropId = null;
	this.isChange = false;
};

cTouch.prototype.setCellPoint = function(x, y) {
	touch.cellPointOld.x = touch.cellPoint.x;
	touch.cellPointOld.y = touch.cellPoint.y;
	touch.cellPoint.x = x;
	touch.cellPoint.y = y;
};

cTouch.prototype.isChangeCellPoint = function() {
	const change = touch.cellPointOld.x != touch.cellPoint.x || touch.cellPointOld.y != touch.cellPoint.y

	if (change) {
		this.isChange = true;
	}

	return change;
};

cTouch.prototype.hitCheck = function(x, y) {
	if (x == touch.cellPoint.x && y == touch.cellPoint.y) {
		return 1;
	}
	if (x == touch.cellPointOld.x && y == touch.cellPointOld.y) {
		return 2;
	}

	return 0;
};