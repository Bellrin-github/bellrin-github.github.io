cBoard = function() {
	this.drops;
	this.liftDrop;
	this.dropColors;
	this.deleteGroupId;
	this.frame;
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
	liftDrop.opacity = 0.7;
	this.getGroup().addChild(liftDrop);

	this.getGroup().addEventListener(Event.TOUCH_MOVE, (e) => {
		if (mainTask == MAIN_TASK_LIFT || mainTask == MAIN_TASK_MOVE) {
			this.touchMove(e);
		}
	});

	mainTask = MAIN_TASK_WAIT;
};

cBoard.prototype.action = function() {
	switch (mainTask) {
		case MAIN_TASK_WAIT: // ドロップ持ち上げ待ち
			break;
		case MAIN_TASK_LIFT: // ドロップ持ち上げ中
			// この時点で、指を放したら移動なしなので待機に戻す
			if (!touch.isTouch) {
				mainTask = MAIN_TASK_WAIT;
				break
			}
			break;
		case MAIN_TASK_MOVE: // ドロップ移動中
			// 指を放した時点で、1マスも移動してなかったら待機に戻す
			if (!touch.isTouch) {
				if (!touch.isChange) {
					mainTask = MAIN_TASK_WAIT;
					break
				}
				mainTask = MAIN_TASK_CHECK;
			}
			break;
		case MAIN_TASK_CHECK: // ドロップが消えるかチェック
			mainTask = MAIN_TASK_WAIT;
			if (this.deleteCheck()) {
				this.deleteGroupId = 0;
				this.frame = 0;
				mainTask = MAIN_TASK_COMBO;
			}
			break;
		case MAIN_TASK_COMBO: // ドロップを消す
			if (this.frame == 0) {
				if (!this.dropDeleteAnimation()) {
					mainTask = MAIN_TASK_FALL;
				}
			}

			if (this.frame++ >= 5) {
				this.frame = 0;
			}

			break;
		case MAIN_TASK_FALL: // ドロップを補充
			mainTask = MAIN_TASK_WAIT;
			break;
		case MAIN_TASK_POWER_UP: // パワーアップ演出
			break;
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
	mainTask = MAIN_TASK_MOVE;

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

cBoard.prototype.deleteCheck = function() {
	this.dropColors = [];
	for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
		this.dropColors[y] = [];
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			this.dropColors[y][x] = {};
		}
	}

	for (let i=0; i<this.drops.length; ++i) {
		this.dropColors[this.drops[i].y][this.drops[i].x] = {
			id: i,
			color: this.drops[i].sprite.frame,
			connectionCount: 0,
			group: -1,
		};
	}

	let isDelete = false;
	this.deleteId = 0;

	for (let _y=0; _y<BOARD_CELL_HEIGHT_COUNT; ++_y) {
		for (let _x=0; _x<BOARD_CELL_WIDTH_COUNT; ++_x) {
			let checkCell = [];
			for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
				checkCell[y] = [];
				for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
					checkCell[y][x] = -1;
				}
			}

			this.checkRecursive(_x, _y, checkCell, this.dropColors[_y][_x].color);

			this.dropColors[_y][_x].connectionCount = 0;
			for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
				for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
					if (checkCell[y][x] == 1) {
						++this.dropColors[_y][_x].connectionCount;
						if (this.dropColors[_y][_x].connectionCount >= 3) {
							isDelete = true;
						}
					}
				}
			}

			++this.deleteId;
		}
	}

	return isDelete;
};

cBoard.prototype.dropDeleteAnimation = function() {
	if (this.deleteGroupId >= this.deleteId) {
		return false;
	}

	let isDelete = false;
	while (!isDelete && this.deleteGroupId < this.deleteId) {
		for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
			for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
				if (this.dropColors[y][x].group == this.deleteGroupId) {
					if (this.dropColors[y][x].connectionCount >= 3) {
						this.drops[this.dropColors[y][x].id].sprite.opacity = 0.5;
						isDelete = true;
					}
				}
			}
		}

		if (!isDelete) {
			++this.deleteGroupId;
		}
	}

	++this.deleteGroupId;

	return true;
};

cBoard.prototype.checkRecursive = function(x, y, checkCell, color) {
	if (x < 0 || x >= BOARD_CELL_WIDTH_COUNT || y < 0 || y >= BOARD_CELL_HEIGHT_COUNT) return; // 範囲外

	if (0 < checkCell[y][x]) return; // 探索済み

	if (this.dropColors[y][x].color != color) { //ブロックの種類が違う
		checkCell[y][x] = 2;
		return;
	}

	//一致
	checkCell[y][x] = 1; //チェック

	// 初めての一致なら一致グループ指定
	if (this.dropColors[y][x].group < 0) {
		this.dropColors[y][x].group = this.deleteId;
	}

	this.checkRecursive(x + 1, y, checkCell, color); //右探索
	this.checkRecursive(x - 1, y, checkCell, color); //左
	this.checkRecursive(x, y + 1, checkCell, color); //下
	this.checkRecursive(x, y - 1, checkCell, color); //上
	return;
};