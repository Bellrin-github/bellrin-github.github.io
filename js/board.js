cBoard = function() {
	this.drops;
	this.liftDrop;
	this.init();
};
inherits(cBoard, cTask);

cBoard.prototype.init = function() {
	this.point = new cPoint(0, 160, SPRITE_MW * 6, SPRITE_MH * 5);

	this.getGroup().x = this.point.x;
	this.getGroup().y = this.point.y;

	for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			let frame;
			if ((x%2==0 && y%2==0) || (x%2==1 && y%2==1)) {
				frame = IMAGE_FRAME_BOARD_BG_1;
			} else {
				frame = IMAGE_FRAME_BOARD_BG_2;
			}

			const sprite = createSprite(IMG_BOARD, frame, new cPoint(x*SPRITE_MW, y*SPRITE_MH, SPRITE_MW, SPRITE_MH));
			this.getGroup().addChild(sprite);
		}
	}

	touch = new cTouch();

	this.drops = [];
	for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			this.drops[this.drops.length] = new cDrop(this.drops.length, x, y);
			this.getGroup().addChild(this.drops[this.drops.length-1].getGroup());
		}
	}

	liftDrop = createSprite(IMG_BOARD, 10, new cPoint(-255, -255, SPRITE_MW, SPRITE_MH));
	this.getGroup().addChild(liftDrop);

	this.getGroup().addEventListener(Event.TOUCH_MOVE, (e) => {
		this.touchMove(e);
	});
};

cBoard.prototype.action = function() {
	if (touch.isTouch) {
		++touch.count;
	}

	for (let i=0; i<this.drops.length; ++i) {
		this.drops[i].action();
	}
};

cBoard.prototype.draw = function() {
	for (let i=0; i<this.drops.length; ++i) {
		this.drops[i].draw();
	}
};

cBoard.prototype.touchMove = function(e) {
	touch.point.setX(Math.floor(e.x));
	touch.point.setY(Math.floor(e.y - 160));
	liftDrop.x = touch.point.x - 16;
	liftDrop.y = touch.point.y - 16;

	touch.setCellPoint(Math.floor(touch.point.x / SPRITE_MW), Math.floor(touch.point.y / SPRITE_MH));

	if (touch.isChangeCellPoint()) {
		let oldCellDropId = null;
		let newCellDropId = null;
		for (let i=0; i<this.drops.length; ++i) {
			// 新しセルにあるドロップID設定
			if (touch.hitCheck(this.drops[i].x, this.drops[i].y) == 1) {
				newCellDropId = i;
			} else
			// 古いセルにあるドロップID設定
			if (touch.hitCheck(this.drops[i].x, this.drops[i].y) == 2) {
				oldCellDropId = i;
			}
			// 両方設定されたら終了
			if (newCellDropId != null && oldCellDropId != null) {
				break;
			}
		}

		// 予期せぬ動作にならない限りここはtrueにならないはず
		if (newCellDropId == null || oldCellDropId == null) {
			return;
		}

		let x = this.drops[oldCellDropId].x;
		let y = this.drops[oldCellDropId].y;
		this.drops[oldCellDropId].x = this.drops[newCellDropId].x;
		this.drops[oldCellDropId].y = this.drops[newCellDropId].y;
		this.drops[newCellDropId].x = x;
		this.drops[newCellDropId].y = y;
	}
};