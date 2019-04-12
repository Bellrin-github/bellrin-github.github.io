cGameMain = function() {
	this.scene;
	this.touchUp;
	this.touchUpFrame;
	this.touchRight;
	this.touchRightFrame;
	this.touchDown;
	this.touchDownFrame;
	this.touchLeft;
	this.touchLeftFrame;
};
inherits(cGameMain, cTask);

cGameMain.prototype.init = function() {
	this.touchUp = false;
	this.touchUpFrame = 0;
	this.touchRight = false;
	this.touchRightFrame = 0;
	this.touchDown = false;
	this.touchDownFrame = 0;
	this.touchLeft = false;
	this.touchLeftFrame = 0;

	this.task = GAME_MAIN_TASK_ACTION;
	this.scene = new Scene();
    this.scene.backgroundColor = "white";
	this.scene.addChild(this.getGroup());
	this.scene.addEventListener('enterframe', () => {
		this.action();
		this.draw();
	});

	keyInput = new cKeyInput();

	this.setTapEvent();

	map = new cMap();
	this.getGroup().addChild(map.getGroup());
};

cGameMain.prototype.action = function() {
	keyInput.action();

	if (this.touchUp) {
		keyInput.setUp(++this.touchUpFrame);
	}

	if (this.touchRight) {
		keyInput.setRight(++this.touchRightFrame);
	}

	if (this.touchDown) {
		keyInput.setDown(++this.touchDownFrame);
	}

	if (this.touchLeft) {
		keyInput.setLeft(++this.touchLeftFrame);
	}

	switch (this.task) {
		case GAME_MAIN_TASK_ACTION:
			map.action();
			break;
	}

	return true;
};

cGameMain.prototype.draw = function() {
	switch (this.task) {
		case GAME_MAIN_TASK_ACTION:
			map.draw();
			break;
		case GAME_MAIN_TASK_GAMEOVER:
			break;
	}
};

cGameMain.prototype.getScene = function() {
	return this.scene;
};

cGameMain.prototype.setTapEvent = function() {
	const getLabel = (text, x, y)=>{
		let label = new Label(text);
		label.font = '35px monospace';
		label.color = 'rgb(0, 0, 0)';
		label.x = x;
		label.y = y;

		return label;
	};

	let label = null;

	const centerX = WINDOW_SIZE_W - 70;
	const centerY = WINDOW_SIZE_H - 70;

	label = getLabel('☝', centerX, centerY-30);
	label.addEventListener(Event.TOUCH_START, (e)=>{
console.log("UP_TOUCH!!");
		this.touchUp = true;
		this.touchUpFrame = 0;
	});
	label.addEventListener(Event.TOUCH_END, (e)=>{
		this.touchUp = false;
		this.touchUpFrame = 0;
	});
	this.scene.addChild(label);

	label = getLabel('☞', centerX+30, centerY);
	label.addEventListener(Event.TOUCH_START, (e)=>{
		this.touchRight = true;
		this.touchRightFrame = 0;
	});
	label.addEventListener(Event.TOUCH_END, (e)=>{
		this.touchRight = false;
		this.touchRightFrame = 0;
	});
	this.scene.addChild(label);

	label = getLabel('☟', centerX, centerY+30);
	label.addEventListener(Event.TOUCH_START, (e)=>{
		this.touchDown = true;
		this.touchDownFrame = 0;
	});
	label.addEventListener(Event.TOUCH_END, (e)=>{
		this.touchDown = false;
		this.touchDownFrame = 0;
	});
	this.scene.addChild(label);

	label = getLabel('☜', centerX-30, centerY);
	label.addEventListener(Event.TOUCH_START, (e)=>{
		this.touchLeft = true;
		this.touchLeftFrame = 0;
	});
	label.addEventListener(Event.TOUCH_END, (e)=>{
		this.touchLeft = false;
		this.touchLeftFrame = 0;
	});
	this.scene.addChild(label);
};
