cGameMain = function() {
	this.scene;
	this.kuma;
};
inherits(cGameMain, cTask);

cGameMain.prototype.init = function() {
	this.scene = new Scene();
	this.scene.backgroundColor = "#99FF99";
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

	// クマ作成
	this.kuma = new cKuma();
	this.getGroup().addChild(this.kuma.getGroup());
};

cGameMain.prototype.action = function() {
	this.kuma.action();
};

cGameMain.prototype.draw = function() {
	this.kuma.draw();
};

cGameMain.prototype.getScene = function() {
	return this.scene;
};
