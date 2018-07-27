cDropPower = function() {
	this.myPoint;
	this.targetPoint;
	this.frame;
	this.rad;
	this.speed;
	this.moveingFrame;
	this.myCenterX;
	this.myCenterY;
	this.effect;
};
inherits(cDropPower, cTask);

cDropPower.prototype.init = function(myPoint, targetPoint) {
	this.myPoint = myPoint;
	this.targetPoint = targetPoint;

	this.sprite = new Sprite(32, 32);
	this.sprite.image = game.assets[IMG_MAGIC_01];
	this.sprite.x = this.myPoint.x;
	this.sprite.y = this.myPoint.y;
	this.sprite.frame = 0;

	this.rad = Math.atan2(this.targetPoint.centerY - this.myPoint.centerY, this.targetPoint.centerX - this.myPoint.centerX);
	this.speed = 8;

	this.getGroup().addChild(this.sprite);

	let mx = this.myPoint.x;
	let my = this.myPoint.y;
	this.frame = 0;
	this.moveingFrame = 0;
	for (; !this.isHit() ;) {
		this.myPoint.x += this.speed * Math.cos(this.rad);
		this.myPoint.y += this.speed * Math.sin(this.rad);
		this.myPoint.updateCenter();
		++this.moveingFrame;
	}

	this.myPoint.x = mx;
	this.myPoint.y = my;
	this.myPoint.updateCenter();

	this.myCenterX = this.myPoint.centerX;
	this.myCenterY = this.myPoint.centerY;
	this.effect = null;
};

cDropPower.prototype.action = function() {
	if (this.frame++ < this.moveingFrame) {
		const u = (1.0 / this.moveingFrame) * this.frame;

		const P01X = (1.0 - u) * this.myCenterX + u * (this.targetPoint.centerX - 100);
		const P01Y = (1.0 - u) * this.myCenterY + u * (this.targetPoint.centerY - 50);

		const P12X = (1.0 - u) * (this.targetPoint.centerX - 100) + u * (this.targetPoint.centerX - 16);
		const P12Y = (1.0 - u) * (this.targetPoint.centerY - 50) + u * (this.targetPoint.centerY - 16);

		const P02X = (1.0 - u) * P01X + u * P12X;
		const P02Y = (1.0 - u) * P01Y + u * P12Y;

		this.myPoint.x = Math.floor(P02X);
		this.myPoint.y = Math.floor(P02Y);

		this.myPoint.updateCenter();

		this.sprite.x = this.myPoint.x;
		this.sprite.y = this.myPoint.y;

		if (this.frame < this.moveingFrame * 0.3) {
			this.sprite.scaleY = this.sprite.scaleX += 0.7 / (this.moveingFrame * 0.3);
		} else {
			this.sprite.scaleY = this.sprite.scaleX -= 0.9 / (this.moveingFrame * 0.7);
		}

	} else {
		return false;
	}

	return true;
};

cDropPower.prototype.remove = function() {
	removeAllChild(this.getGroup());
};

cDropPower.prototype.isHit = function() {
	if (this.targetPoint.centerX - 5 <= this.myPoint.centerX && this.myPoint.centerX <= this.targetPoint.centerX + 5) {
		if (this.targetPoint.centerY - 5 <= this.myPoint.centerY && this.myPoint.centerY <= this.targetPoint.centerY + 5) {
			return true;
		}
	}

	return false;
};