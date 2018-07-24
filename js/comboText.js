cComboText = function(text, point) {
	this.point;
	this.imageText;
	this.init(String(text), point);
};
inherits(cComboText, cTask);

cComboText.prototype.init = function(text, point) {
	this.point = point;
	this.imageText = new cImageText(text);
	this.getGroup().x = this.point.x;
	this.getGroup().y = this.point.y;
	this.getGroup().originX = text.length * SPRITE_SSW / 2;
	this.getGroup().originY = text.length * SPRITE_SSH / 2;
	this.getGroup().addChild(this.imageText.getGroup());
};

cComboText.prototype.action = function() {
	this.getGroup().scaleX += 0.1;
	this.getGroup().scaleY += 0.1;
	if (this.getGroup().scaleX >= 3) {
		return false;
	}

	return true;
};

cComboText.prototype.draw = function() {

};
