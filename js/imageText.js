cImageText = function(text) {
	this.sprites;
	this.init(String(text));
};
inherits(cImageText, cTask);

cImageText.prototype.init = function(text) {
	this.sprites = [];

	for (let i=0; i<text.length; ++i) {
		const t = text.slice(i, i+1);
		this.sprites.push(createSprite(IMG_NUMBER, TEXT_TEXTURE_FRAME_LIST[t], new cPoint(i * (SPRITE_SSW-1), 0, SPRITE_SSW, SPRITE_SSH)));

		this.getGroup().addChild(this.sprites[i]);
	}
};

cImageText.prototype.action = function() {

};

cImageText.prototype.draw = function() {

};
