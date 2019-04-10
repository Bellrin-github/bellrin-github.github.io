/**
 * キューブ
 */
let cCube = function(point) {
	this.point;
	this.sprite;

	this.init(point);
};

cCube.prototype.init = function(point) {
	this.sprite = new Sprite(32, 32);
	this.sprite.image = game.assets[IMG_CUBE_NORMAL];
	this.setNormal();
	this.setPoint(point);
};

cCube.prototype.getSprite = function() {
	return this.sprite;
};

cCube.prototype.setPoint = function(point) {
	this.point = point;
	this.updateXY();
};

cCube.prototype.setX = function(x) {
	this.point.setX(x);
	this.updateXY();
};

cCube.prototype.setY = function(y) {
	this.point.setY(y);
	this.updateXY();
};

cCube.prototype.updateXY = function() {
	this.sprite.x = this.point.getX();
	this.sprite.y = this.point.getY();
};

cCube.prototype.setNormalShadow = function() {
	this.sprite.frame = CUBE_IMG_FRAME_NORMAL_SHADOW;
};

cCube.prototype.setNormal = function() {
	this.sprite.frame = CUBE_IMG_FRAME_NORMAL;
};

cCube.prototype.setHangingShadow = function() {
	this.sprite.frame = CUBE_IMG_FRAME_HANGING_SHADOW;
};

cCube.prototype.setHanging = function() {
	this.sprite.frame = CUBE_IMG_FRAME_HANGING;
};
