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
	smallIcon = new cSmallIcon();
	smallIcon.getGroup().x = 2;
	smallIcon.getGroup().y = 2;
	this.getGroup().addChild(smallIcon.getGroup());
};

cActionArea.prototype.action = function() {
	this.backGround.action();
	kuma.action();
};

cActionArea.prototype.draw = function() {
	this.backGround.draw();
	kuma.draw();
};
