enchant(); // initialize

window.focus();

window.onload = function() {
	game = new Core(WINDOW_SIZE_W, WINDOW_SIZE_H); // game stage
	game.fps = FPS;

	// 必要な画像を読みこみ
	for(let i=0; i<IMG_LIST.length; ++i) {
		game.preload(IMG_LIST[i]);
	}

	game.onload = function() {
		gameTitle = new cGameTitle();
		gameTitle.init();

		game.pushScene(gameTitle.getScene());
	};

	game.start(); // start your game!
}