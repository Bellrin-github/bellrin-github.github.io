cActionArea = function() {
	this.backGround;
	this.init();
};
inherits(cActionArea, cTask);

cActionArea.prototype.init = function() {
	this.point = new cPoint(0, 0, SPRITE_MW * 6, SPRITE_MH * 5);

	this.getGroup().x = this.point.x;
	this.getGroup().y = this.point.y;

	// 背景
	this.backGround = new cBackGround();
	this.getGroup().addChild(this.backGround.getGroup());

	// クマ作成
	kuma = new cKuma();
	this.getGroup().addChild(kuma.getGroup());

	// 属性の強さエリア
	elementCountArea = new cElementCountArea();
	elementCountArea.getGroup().x = 2;
	elementCountArea.getGroup().y = 2;
	this.getGroup().addChild(elementCountArea.getGroup());

	// ドロップの操作時間
	moveTimeLimit = new cMoveTimeLimit();
	moveTimeLimit.getGroup().x = 1;
	moveTimeLimit.getGroup().y = SPRITE_MW * 4 + SPRITE_MW - 11;
	this.getGroup().addChild(moveTimeLimit.getGroup());
};

cActionArea.prototype.action = function() {
	this.backGround.action();
	kuma.action();
};

cActionArea.prototype.draw = function() {
	this.backGround.draw();
	kuma.draw();
};
