cKumaAttackNormal = function() {
	this.frame;
	this.init();
};
inherits(cKumaAttackNormal, cTask);

cKumaAttackNormal.prototype.init = function() {
	this.frame = 0;
};

cKumaAttackNormal.prototype.action = function() {
	++this.frame;
};

cKumaAttackNormal.prototype.draw = function() {

};
