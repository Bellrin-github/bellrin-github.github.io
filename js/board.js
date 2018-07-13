cBoard = function() {
	this.init();
};
inherits(cBoard, cTask);

cBoard.prototype.init = function() {
	this.point = new cPoint(0, 160, SPRITE_MW * 6, SPRITE_MH * 5);

	this.getGroup().x = this.point.x;
	this.getGroup().y = this.point.y;

	for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			let sprite;
			if ((x%2==0 && y%2==0) || (x%2==1 && y%2==1)) {
				sprite = createSprite(IMG_BOARD, IMAGE_FRAME_BOARD_BG_1, new cPoint(x*SPRITE_MW, y*SPRITE_MH, SPRITE_MW, SPRITE_MH));
			} else {
				sprite = createSprite(IMG_BOARD, IMAGE_FRAME_BOARD_BG_2, new cPoint(x*SPRITE_MW, y*SPRITE_MH, SPRITE_MW, SPRITE_MH));
			}

			this.getGroup().addChild(sprite);
		}
	}
};

cBoard.prototype.action = function() {
	
};

cBoard.prototype.draw = function() {
	
};
