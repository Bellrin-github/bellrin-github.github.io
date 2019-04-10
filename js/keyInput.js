/**
 * キー入力
 */
let cKeyInput = function() {
	this.up;
	this.right;
	this.down;
	this.left;
	this.z;
	this.x;

	this.init();
};

cKeyInput.prototype.init = function() {
	this.up = 0;
	this.right = 0;
	this.down = 0;
	this.left = 0;
	this.z = 0;
	this.x = 0;
};

cKeyInput.prototype.action = function() {
	let input = game.input;
    if (input.up) {
		++this.up;
    } else {
		this.up = 0;
	}

    if (input.right) {
		++this.right;
    } else {
		this.right = 0;
	}

    if (input.down) {
		++this.down;
    } else {
		this.down = 0;
	}

    if (input.left) {
		++this.left;
    } else {
		this.left = 0;
	}

    if (input.z) {
		++this.z;
    } else {
		this.z = 0;
	}

    if (input.x) {
		++this.x;
    } else {
		this.x = 0;
	}
};

cKeyInput.prototype.isUp = function() {
	return this.up == 1;
};

cKeyInput.prototype.isRight = function() {
	return this.right == 1;
};

cKeyInput.prototype.isDown = function() {
	return this.down == 1;
};

cKeyInput.prototype.isLeft = function() {
	return this.left == 1;
};

cKeyInput.prototype.isZ = function() {
	return this.z > 0;
};

cKeyInput.prototype.isX = function() {
	return this.x > 0;
};