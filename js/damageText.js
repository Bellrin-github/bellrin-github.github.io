cDamageText = function(point, text, color) {
	this.sprites;
	this.frame;
	this.init(point, String(text), color);
};
inherits(cDamageText, cTask);

cDamageText.prototype.init = function(point, text, color) {
	this.sprites = [];
	this.frame = 0;

	for (let i=0; i<text.length; ++i) {
		const t = text.slice(i, i+1);
		this.sprites.push(createSprite(IMG_FONT2, DAMAGE_TEXT_TEXTURE_FRAME_LIST[t] + color * 16, new cPoint(i * (SPRITE_SW-1), 0, SPRITE_SW, SPRITE_SH)));

		this.getGroup().addChild(this.sprites[i]);
	}

	this.getGroup().x = point.x;
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
