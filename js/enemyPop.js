cEnemyPop = function() {
	this.frame;
	this.enemyPopFrame;
	this.init();
};
inherits(cEnemyPop, cTask);

cEnemyPop.prototype.init = function() {
	this.countReset();
};

cEnemyPop.prototype.action = function() {
	if (++this.frame >= this.enemyPopFrame && !enemy) {
		kuma.stop();
		enemy = new cEnemy();
		return true;
	}

	return false;
};

cEnemyPop.prototype.draw = function() {

};

cEnemyPop.prototype.countReset = function() {
	this.frame = 0;
	this.enemyPopFrame = 30 * 3;
};
