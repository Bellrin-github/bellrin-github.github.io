cDrop = function(id, x, y) {
	this.id;
	this.point;
	this.frame;
	this.speed;
	this.x;
	this.y;
	this.init(id, x, y);
};
inherits(cDrop, cTask);

cDrop.prototype.init = function(id, x, y) {
	this.id = id;
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.point = new cPoint(this.x * SPRITE_MW, this.y * SPRITE_MH, SPRITE_MW, SPRITE_MH);

	this.sprite = createSprite(IMG_BOARD, 10+Math.floor(Math.random() * 6), this.point);
	this.sprite.ontouchstart = (e) => {
		touch.point.setX(Math.floor(e.x));
		touch.point.setY(Math.floor(e.y - 160));
		touch.isTouch = true;
		touch.pickDropId = this.id;
		this.sprite.opacity = 0.5;
		touch.count = 0;
		liftDrop.frame = this.sprite.frame;
		liftDrop.x = touch.point.x - 16;
		liftDrop.y = touch.point.y - 16;
	};
	this.sprite.ontouchend = (e) => {
		touch.point.setX(Math.floor(e.x));
		touch.point.setY(Math.floor(e.y));
		touch.isTouch = false;
		touch.pickDropId = null;
		this.sprite.opacity = 1.0;
		touch.count = 0;
		liftDrop.frame = 0;
		liftDrop.x = -255;
		liftDrop.y = -255;
	};

	this.getGroup().addChild(this.sprite);
};

cDrop.prototype.action = function() {
	++this.frame;
};

cDrop.prototype.draw = function() {
	this.sprite.x = this.point.x;
	this.sprite.y = this.point.y;
};
