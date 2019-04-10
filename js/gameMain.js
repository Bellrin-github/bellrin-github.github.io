cGameMain = function() {
	this.scene;
};
inherits(cGameMain, cTask);

cGameMain.prototype.init = function() {
	this.task = GAME_MAIN_TASK_ACTION;
	this.scene = new Scene();
    this.scene.backgroundColor = "white";
	this.scene.addChild(this.getGroup());
	this.scene.addEventListener('enterframe', () => {
		this.action();
		this.draw();
	});

	keyInput = new cKeyInput();

	map = new cMap();
	this.getGroup().addChild(map.getGroup());
};

cGameMain.prototype.action = function() {
	keyInput.action();

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
