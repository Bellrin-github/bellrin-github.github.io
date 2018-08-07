cDamageText = function(point, text, color, magnification) {
	this.sprites;
	this.frame;
	this.init(point, String(text), color, magnification);
};
inherits(cDamageText, cTask);

cDamageText.prototype.init = function(point, text, color, magnification) {
	this.sprites = [];
	this.frame = 0;

	for (let i=0; i<text.length; ++i) {
		const t = text.slice(i, i+1);
		this.sprites.push(createSprite(IMG_NUMBER_16, DAMAGE_TEXT_TEXTURE_FRAME_LIST[t] + color * 10, new cPoint(i * (SPRITE_SW-5), 0, SPRITE_SW, SPRITE_SH)));
		if (magnification < 1.0) {
			this.sprites[i].scaleX = this.sprites[i].scaleY = 0.7;
		} else if (magnification = 1.0) {
			this.sprites[i].scaleX = this.sprites[i].scaleY = 0.9;
		} else {
			this.sprites[i].scaleX = this.sprites[i].scaleY = 1.2;
		}
		this.getGroup().addChild(this.sprites[i]);
	}

	if (point.x < WINDOW_SIZE_W / 2) {
		this.getGroup().x = point.x - SPRITE_SW;
	} else {
		this.getGroup().x = point.x - SPRITE_SW * text.length / 2;
	}

	this.getGroup().y = point.y;
};

cDamageText.prototype.action = function() {
	if (++this.frame > 15) {
		return false;
	}

	this.getGroup().y -= 2;

	return true;
};

cDamageText.prototype.draw = function() {

};
