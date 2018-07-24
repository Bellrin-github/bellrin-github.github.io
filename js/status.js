cStatus = function() {
	this.hp;
	this.maxHp;
	this.element;
	this.str;
	this.def;
	this.speed;
	this.init();
};

cStatus.prototype.init = function() {
	this.hp = 0;
	this.maxHp = 0;
	this.element = ELEMENT_NONE;
};
