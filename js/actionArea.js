cActionArea = function() {
	this.point;

	this.init();
};
inherits(cActionArea, cTask);

cActionArea.prototype.init = function() {
	this.point = new cPoint(0, 0, SPRITE_MW * 6, SPRITE_MH * 5);

	this.getGroup().x = this.point.x;
	this.getGroup().y = this.point.y;

	let cube = new cCube(new cPoint(50, 50));
	this.getGroup().addChild(cube.getSprite());
};

cActionArea.prototype.action = function() {
	if (false) {
		// ゲームオーバー
		return false;
	}

	return true;;
};

cActionArea.prototype.draw = function() {
};
