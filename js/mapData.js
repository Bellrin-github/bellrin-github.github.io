/**
 * マップデータ
 */
let cMapData = function(point) {
	this.cube;
	this.position;
	this.point;

	this.init(point);
};

cMapData.prototype.init = function(point) {
	this.cube = null;
	this.position = point;
	this.resetPoint();
};

cMapData.prototype.createCube = function() {
	this.cube = new cCube(this.point);
	this.hidden();
};

cMapData.prototype.resetPoint = function() {
	this.point = positionToPoint(this.position);
	if (this.cube) {
		this.cube.setPoint(this.point);
	}
};

cMapData.prototype.getCube = function() {
	if (this.cube) {
		return this.cube;
	}
};

cMapData.prototype.getPoint = function() {
	return this.point;
};

cMapData.prototype.getPosition = function() {
	return this.position;
};

cMapData.prototype.getCubeSprite = function() {
	return this.cube.getSprite();
};

cMapData.prototype.hidden = function() {
	this.cube.getSprite().visible = false;
};

cMapData.prototype.show = function() {
	this.cube.getSprite().visible = true;
};

cMapData.prototype.isHidden = function() {
	return this.cube.getSprite().visible == false;
};

cMapData.prototype.isShow = function() {
	return this.cube.getSprite().visible == true;
};