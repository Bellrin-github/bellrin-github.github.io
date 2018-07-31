cDrop = function(id, x, y) {
	this.id;
	this.point;
	this.frame;
	this.speed;
	this.sprite;
	this.x;
	this.y;
	this.deleteId;
	this.init(id, x, y);
};
inherits(cDrop, cTask);

cDrop.prototype.init = function(id, x, y) {
	this.id = id;
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.point = new cPoint(this.x * SPRITE_MW, this.y * SPRITE_MH, SPRITE_MW, SPRITE_MH);
	this.deleteId = null;

	this.sprite = createSprite(IMG_BOARD, 10+Math.floor(Math.random() * 6), this.point);
	this.sprite.ontouchstart = (e) => {
		if (mainTask != MAIN_TASK_WAIT) {
			return;
		}
		touch.point.setX(Math.floor(e.x));
		touch.point.setY(Math.floor(e.y - 160));
		touch.setCellPoint(Math.floor(touch.point.x / SPRITE_MW), Math.floor(touch.point.y / SPRITE_MH));
		touch.setCellPoint(Math.floor(touch.point.x / SPRITE_MW), Math.floor(touch.point.y / SPRITE_MH));
		touch.isTouch = true;
		touch.pickDropId = this.id;
		touch.isChange = false;
		this.sprite.opacity = 0;
		touch.count = 0;
		liftDrop.frame = this.sprite.frame;
		liftDrop.x = touch.point.x - 16;
		liftDrop.y = touch.point.y - 16;
		moveTimeLimit.reset();
		mainTask = MAIN_TASK_LIFT;
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

	let isMove = false;

	if (this.point.x > this.x * SPRITE_MW) {
		isMove = true;
		this.point.x -= 10;
		if (this.point.x <= this.x * SPRITE_MW) {
			this.point.x = this.x * SPRITE_MW;
		}
	} else
	if (this.point.x < this.x * SPRITE_MW) {
		isMove = true;
		this.point.x += 10;
		if (this.point.x >= this.x * SPRITE_MW) {
			this.point.x = this.x * SPRITE_MW;
		}
	}

	if (this.point.y > this.y * SPRITE_MH) {
		isMove = true;
		this.point.y -= 10;
		if (this.point.y <= this.y * SPRITE_MH) {
			this.point.y = this.y * SPRITE_MH;
		}
	} else
	if (this.point.y < this.y * SPRITE_MH) {
		isMove = true;
		this.point.y += 10;
		if (this.point.y >= this.y * SPRITE_MH) {
			this.point.y = this.y * SPRITE_MH;
		}
	}

	return isMove;
};

cDrop.prototype.draw = function() {
	this.sprite.x = this.point.x;
	this.sprite.y = this.point.y;
};
