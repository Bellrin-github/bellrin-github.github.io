cBoard = function() {
	this.drops;
	this.liftDrop;
	this.dropColors;
	this.deleteGroupId;
	this.frame;
	this.comboCount;
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
	let dropMove = false;

	for (let i=0; i<this.drops.length; ++i) {
		if (this.drops[i].action()) {
			dropMove = true;
		}
	}

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
				this.comboCount = 0;
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
					mainTask = MAIN_TASK_REFLESH;
				}
			}

			if (this.frame++ >= 5) {
				this.frame = 0;
			}

			break;
		case MAIN_TASK_REFLESH: // ドロップを補充
			this.dropReflesh();
			mainTask = MAIN_TASK_FALL;
			break;
		case MAIN_TASK_FALL: // ドロップ落下
			if (dropMove) {
				break;
			}

			mainTask = MAIN_TASK_CHECK;
			break;
		case MAIN_TASK_POWER_UP: // パワーアップ演出
			break;
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

			// 隣接個数チェック
			this.checkRecursive(_x, _y, checkCell, this.dropColors[_y][_x].color);

			// 隣接が上下左右いずれかに3個以上になっていないものは未連結に変更
			const res = this.checkThreeUp(_x, _y, checkCell, this.dropColors[_y][_x].color);

			if (!res) {
				continue;
			}

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

	this.checkRecursive(x    , y - 1, checkCell, color); //上
	this.checkRecursive(x + 1, y    , checkCell, color); //右
	this.checkRecursive(x    , y + 1, checkCell, color); //下
	this.checkRecursive(x - 1, y    , checkCell, color); //左
	return;
};

cBoard.prototype.checkThreeUp = function(x, y, checkCell, color) {
	let count = 1;
	// 左
	if (x - 1 >= 0) {
		if (checkCell[y][x-1] == 1) {
			++count;
			if (x - 2 >= 0) {
				if (checkCell[y][x-2] == 1) {
					++count;
				}
			}
		}
	}

	// 左方向に3個以上連結してるなら
	if (count >= 3) {
		return true;
	}

	// 右
	if (x + 1 < BOARD_CELL_WIDTH_COUNT) {
		if (checkCell[y][x+1] == 1) {
			++count;
			if (x + 2 < BOARD_CELL_WIDTH_COUNT) {
				if (checkCell[y][x+2] == 1) {
					++count;
				}
			}
		}
	}

	// 右方向もしくは、左右合わせて3個以上連結してるなら
	if (count >= 3) {
		return true;
	}

	count = 1;
	// 上
	if (y - 1 >= 0) {
		if (checkCell[y-1][x] == 1) {
			++count;
			if (y - 2 >= 0) {
				if (checkCell[y-2][x] == 1) {
					++count;
				}
			}
		}
	}

	// 上方向に3個以上連結してるなら
	if (count >= 3) {
		return true;
	}

	// 下
	if (y + 1 < BOARD_CELL_HEIGHT_COUNT) {
		if (checkCell[y+1][x] == 1) {
			++count;
			if (y + 2 < BOARD_CELL_HEIGHT_COUNT) {
				if (checkCell[y+2][x] == 1) {
					++count;
				}
			}
		}
	}

	// 下方向もしくは、上下合わせて3個以上連結してるなら
	if (count >= 3) {
		return true;
	}

	return false;
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
		} else {
			++this.comboCount;
			// コンボ数
		}
	}

	++this.deleteGroupId;

	return true;
};

cBoard.prototype.dropReflesh = function() {
	// 新しい色を決めて未配置にする
	for (let y=0; y<BOARD_CELL_HEIGHT_COUNT; ++y) {
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			if (this.drops[this.dropColors[y][x].id].sprite.opacity < 1.0) {
				this.drops[this.dropColors[y][x].id].sprite.frame = 10 + Math.floor(Math.random() * 6);
				this.dropColors[y][x].id = null;
			}
		}
	}

	// 残ったドロップを下に詰める
	for (let y=BOARD_CELL_HEIGHT_COUNT-1; y>=0; --y) {
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			// 空きマスか判別
			if (this.dropColors[y][x].id == null) {
				// 空きマスなら、上にドロップがあるかチェックしあれば、配置
				for (let uy=y-1; uy>=0; --uy) {
					if (this.dropColors[uy][x].id != null) {
						if (this.drops[this.dropColors[uy][x].id].sprite.opacity >= 1.0) {
							this.drops[this.dropColors[uy][x].id].x = x;
							this.drops[this.dropColors[uy][x].id].y = y;
							this.dropColors[y][x].id = this.drops[this.dropColors[uy][x].id].id;
							this.dropColors[uy][x].id = null;
							break;
						}
					}
				}
			}
		}
	}

	// 詰め終わって空になったマス用に、未配置ドロップを割り当てる
	for (let y=BOARD_CELL_HEIGHT_COUNT-1; y>=0; --y) {
		for (let x=0; x<BOARD_CELL_WIDTH_COUNT; ++x) {
			// 空きマスか判別
			if (this.dropColors[y][x].id == null) {
				for (let n=0; n<this.drops.length; ++n) {
					if (this.drops[n].sprite.opacity < 1.0) {
						this.dropColors[y][x].id = this.drops[n].id;
						this.drops[n].sprite.opacity = 1.0;
						this.drops[n].x = x;
						this.drops[n].point.x = x * SPRITE_MW;
						this.drops[n].y = y;
						this.drops[n].point.y = 0 - ((BOARD_CELL_HEIGHT_COUNT - y) * SPRITE_MH);
						break;
					}
				}
			}
		}
	}

};