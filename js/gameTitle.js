cGameTitle = function() {
    this.scene;
};

inherits(cGameTitle, cTask);

cGameTitle.prototype.init = function() {
	this.scene = new Scene();
	this.scene.backgroundColor = "#FF9999";

	var titleText = new Label("Hello, TITLE");
	titleText.x = 10;
	titleText.y = 10;
	this.scene.addChild(titleText);

	this.scene.addEventListener('enterframe', () => {
		this.action();
		this.draw();
	});

	this.scene.addEventListener(Event.TOUCH_START, function(e) {
		this.scene.removeEventListener('enterframe');
		this.scene.removeEventListener(Event.TOUCH_START);

		let gameMain = new cGameMain();
		gameMain.init();

		game.replaceScene(gameMain.getScene());
	});
};

cGameTitle.prototype.action = function() {
	
};

cGameTitle.prototype.draw = function() {
	
};

cGameTitle.prototype.getScene = function() {
	return this.scene;
};
