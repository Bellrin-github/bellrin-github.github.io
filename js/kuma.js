cKuma = function() {
	this.point;
	this.init();
	this.frame;
};
inherits(cKuma, cTask);

cKuma.prototype.init = function() {
	this.frame = 0;
	this.point = new cPoint(0, 0, SPRITE_MW, SPRITE_MH);

	this.sprite = createSprite(IMG_KUMA, 0, this.point);
	this.sprite.frames = [
		this.sprite.frame,
		this.sprite.frame + 1,
		this.sprite.frame,
		this.sprite.frame + 2,
	];

	this.getGroup().addChild(this.sprite);
};

cKuma.prototype.action = function() {
	if (touch.isTouch) {
		console.log(touch.point);
	}

	++this.frame;
};

cKuma.prototype.draw = function() {
	if (this.frame % 4 == 0) {
		this.sprite.frame = this.sprite.frames[this.sprite.frameCount++];
		if (this.sprite.frameCount >= this.sprite.frames.length) {
			this.sprite.frameCount = 0;
		}
	}
};
