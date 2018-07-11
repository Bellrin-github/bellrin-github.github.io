/**
 * 座標クラス
 */

// クラスの宣言とコンストラクタ宣言
let cPoint = function(x, y, w, h) {
	this.x;
	this.y;
	this.w;
	this.h;

	this.centerX;
	this.centerY;

	this.init(x, y, w, h);
};

cPoint.prototype.init = function(x, y, w, h) {
	this.x = x?x:0;
	this.y = y?y:0;
	this.w = w?w:0;
	this.h = h?h:0;

	this.updateCenter();
};

cPoint.prototype.updateCenter = function() {
	this.centerX = this.x + Math.floor(this.w / 2);
	this.centerY = this.y + Math.floor(this.h / 2);
};

cPoint.prototype.setX = function(x) {
	this.x = Math.floor(x);
	this.updateCenter();
};

cPoint.prototype.setY = function(y) {
	this.y = Math.floor(y);
	this.updateCenter();
};
