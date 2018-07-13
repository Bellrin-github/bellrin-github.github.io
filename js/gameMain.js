cGameMain = function() {
	this.scene;
	this.kuma;
	this.actionArea;
	this.board;
};
inherits(cGameMain, cTask);

cGameMain.prototype.init = function() {
	this.scene = new Scene();
	this.scene.addChild(this.getGroup());
	this.scene.addEventListener('enterframe', () => {
		this.action();
		this.draw();
	});

	touch = new cTouch();

	this.scene.addEventListener(Event.TOUCH_START, (e) => {
		touch.isTouch = true;
		touch.point.setX(e.x);
		touch.point.setY(e.y);
	});

	this.scene.addEventListener(Event.TOUCH_MOVE, (e) => {
		touch.point.setX(e.x);
		touch.point.setY(e.y);
	});

	this.scene.addEventListener(Event.TOUCH_END, (e) => {
		touch.isTouch = false;
		touch.point.setX(e.x);
		touch.point.setY(e.y);
	});

	// パズルエリア作成
	this.board = new cBoard();
	this.getGroup().addChild(this.board.getGroup());

	// アクションエリア
	this.actionArea = new cActionArea();
	this.getGroup().addChild(this.actionArea.getGroup());
};

cGameMain.prototype.action = function() {
	this.board.action();
	this.actionArea.action();
};

cGameMain.prototype.draw = function() {
	this.board.draw();
	this.actionArea.draw();
};

cGameMain.prototype.getScene = function() {
	return this.scene;
};
