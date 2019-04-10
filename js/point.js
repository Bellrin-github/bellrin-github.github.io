/**
 * 座標
 */
let cPoint = function(x, y, z) {
	this.x;
	this.y;
	this.z;

	this.init(x, y, z);
};

cPoint.prototype.init = function(x, y, z) {
	this.x = x?x:0;
	this.y = y?y:0;
	this.z = z?z:0;
};

cPoint.prototype.getX = function() {
	return this.x
};

cPoint.prototype.setX = function(x) {
	this.x = Math.floor(x);
};

cPoint.prototype.addX = function(n) {
	this.x += n;
	this.x = Math.min(MAP_X_MAX-1, this.x);
};

cPoint.prototype.reduceX = function(n) {
	this.x -= n;
	this.x = Math.max(0, this.x);
};

cPoint.prototype.getY = function() {
	return this.y;
};

cPoint.prototype.setY = function(y) {
	this.y = Math.floor(y);
};

cPoint.prototype.addY = function(n) {
	this.y += n;
	this.y = Math.min(MAP_Y_MAX-1, this.y);
};

cPoint.prototype.reduceY = function(n) {
	this.y -= n;
	this.y = Math.max(0, this.y);
};

cPoint.prototype.getZ = function() {
	return this.z;
};

cPoint.prototype.setZ = function(z) {
	this.z = Math.floor(z);
};

cPoint.prototype.addZ = function(n) {
	this.z += n;
	this.z = Math.min(MAP_Z_MAX-1, this.z);
};

cPoint.prototype.reduceZ = function(n) {
	this.z -= n;
	this.z = Math.max(0, this.z);
};

cPoint.prototype.isMaxX = function() {
	return this.x == MAP_X_MAX - 1;
};

cPoint.prototype.isNotMaxX = function() {
	return this.x < MAP_X_MAX - 1;
};

cPoint.prototype.isMaxY = function() {
	return this.y == MAP_Y_MAX - 1;
};

cPoint.prototype.isNotMaxY = function() {
	return this.y < MAP_Y_MAX - 1;
};

cPoint.prototype.isMaxZ = function() {
	return this.z == MAP_Z_MAX - 1;
};

cPoint.prototype.isNotMaxZ = function() {
	return this.z < MAP_Z_MAX - 1;
};

cPoint.prototype.isMinX = function() {
	return this.x == 0;
};

cPoint.prototype.isNotMinX = function() {
	return this.x > 0;
};

cPoint.prototype.isMinY = function() {
	return this.y == 0;
};

cPoint.prototype.isNotMinY = function() {
	return this.y > 0;
};

cPoint.prototype.isMinZ = function() {
	return this.z == 0;
};

cPoint.prototype.isNotMinZ = function() {
	return this.z > 0;
};