cGameMain = function() {
	this.scene;
	this.kuma;
	this.actionArea;
	this.board;
	this.gameOverBg;
};
inherits(cGameMain, cTask);

cGameMain.prototype.init = function() {
	isAttackAnimation = false;
	this.task = GAME_MAIN_TASK_ACTION;
	this.scene = new Scene();
	this.scene.addChild(this.getGroup());
	this.scene.addEventListener('enterframe', () => {
		this.action();
		this.draw();
	});

	// パズルエリア作成
	this.board = new cBoard();
	this.getGroup().addChild(this.board.getGroup());

	// アクションエリア
	this.actionArea = new cActionArea();
	this.getGroup().addChild(this.actionArea.getGroup());
};

cGameMain.prototype.action = function() {
	switch (this.task) {
		case GAME_MAIN_TASK_ACTION:
			if (!this.actionArea.action()) {
				// ゲームオーバー
				this.showGameOver();
				// this.scene.clearEventListener('enterframe');
				this.task = GAME_MAIN_TASK_GAMEOVER;
				return false;
			}

			this.board.action();
			break;
		case GAME_MAIN_TASK_GAMEOVER:
			if (this.gameOverBg.opacity < 0.5) {
				this.gameOverBg.opacity += 0.1;
			} else {
				this.task = GAME_MAIN_TASK_MOVE_TITLE_WAIT;
				let text = new Label("おつかれさまでした。");
				text.x = 10;
				text.y = 10;
				text.color = 'white';
				this.scene.addChild(text);

				text = new Label("タップでタイトル画面へ");
				text.x = 10;
				text.y = 30;
				text.color = 'white';
				this.scene.addChild(text);

				text = new Label("戻ります。");
				text.x = 10;
				text.y = 50;
				text.color = 'white';
				this.scene.addChild(text);

				this.scene.addEventListener(Event.TOUCH_START, (e) => {
					this.scene.clearEventListener(Event.TOUCH_START);

					removeAllChild(this.getGroup());

					gameTitle = new cGameTitle();
					gameTitle.init();

					game.replaceScene(gameTitle.getScene());
				});
			}

			break;
		case GAME_MAIN_TASK_MOVE_TITLE_WAIT:
			
			break;
	}

	return true;
};

cGameMain.prototype.draw = function() {
	switch (this.task) {
		case GAME_MAIN_TASK_ACTION:
			this.board.draw();
			this.actionArea.draw();
			break;
		case GAME_MAIN_TASK_GAMEOVER:
			break;
	}
};

cGameMain.prototype.getScene = function() {
	return this.scene;
};

cGameMain.prototype.showGameOver = function() {
	this.gameOverBg = new Sprite(WINDOW_SIZE_W, WINDOW_SIZE_H);
	let surface = new Surface(WINDOW_SIZE_W, WINDOW_SIZE_H);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
	surface.context.fillRect(0, 0, WINDOW_SIZE_W, WINDOW_SIZE_H);
	this.gameOverBg.image = surface;
	this.gameOverBg.opacity = 0.0;
	this.getGroup().addChild(this.gameOverBg);
};
