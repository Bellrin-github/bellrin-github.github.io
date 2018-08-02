cMoveTimeLimit = function() {
	this.time;
	this.timeBar;
	this.init();
};
inherits(cMoveTimeLimit, cTask);

cMoveTimeLimit.prototype.init = function() {
	this.time = MOVE_TIME_MAX;

	let backGroud = new Sprite(WINDOW_SIZE_W-2, 5);
	let surface = new Surface(WINDOW_SIZE_W-2, 5);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
	surface.context.fillRect(0, 0, WINDOW_SIZE_W-2, 5);
	backGroud.image = surface;
	this.getGroup().addChild(backGroud);

	backGroud = new Sprite(WINDOW_SIZE_W-4, 4);
	surface = new Surface(WINDOW_SIZE_W-4, 4);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(150, 150, 150, 1.0)';
	surface.context.fillRect(1, 1, WINDOW_SIZE_W-4, 4);
	backGroud.image = surface;
	this.getGroup().addChild(backGroud);

	this.timeBar = new Sprite(WINDOW_SIZE_W-4, 4);
	surface = new Surface(WINDOW_SIZE_W-4, 4);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(200, 200, 255, 1.0)';
	surface.context.fillRect(1, 1, WINDOW_SIZE_W-4, 4);
	this.timeBar.image = surface;
	this.timeBar.originX = 1;
	this.getGroup().addChild(this.timeBar);
};

cMoveTimeLimit.prototype.action = function() {
	const percent = Math.floor((100 / MOVE_TIME_MAX) * this.time);
	this.timeBar.scaleX = (percent * 0.01);

	if (--this.time <= 0) {
		this.reset();
		return false;
	}

	return true;
};

cMoveTimeLimit.prototype.draw = function() {

};

cMoveTimeLimit.prototype.reset = function() {
	this.time = MOVE_TIME_MAX;
};
