/**
 * キャラクター
 */
cCharacter = function(x, y, z) {
	this.position;
	this.point;
	this.sprite;
	this.status;
	this.direction; // 向き

	this.lastAction; // 最後に取った行動

	this.init(x, y, z);
};
inherits(cCharacter, cTask);

cCharacter.prototype.init = function(x, y, z) {
	this.direction = D_RIGHT;

	this.lastAction = CHARACTER_ACTION_WAIT;

	this.sprite = new Sprite(32, 32);
	this.sprite.image = game.assets[IMG_CHARACTER];
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.frame = this.direction;

	this.status = CHARACTER_STATUS_NORMAL;

	this.getGroup().addChild(this.sprite);

	this.position = new cPoint(x, y, z);
	this.point = positionToPoint(this.position);
	this.getGroup().x = this.point.getX();
	this.getGroup().y = this.point.getY()+4;
};

cCharacter.prototype.action = function() {
	let returnValue = false;
	switch (this.status) {
		case CHARACTER_STATUS_NORMAL:
			returnValue = this.actionNormal();
			break;
		case CHARACTER_STATUS_HANGING:
			returnValue = this.actionHanging();
			break;
	}

	return returnValue;
};

cCharacter.prototype.actionNormal = function() {
	let newPosition = false;

	// Z押しながらでブロック移動になる
	if (keyInput.isZ()) {
		const point = new cPoint(this.position.getX(), this.position.getY(), this.position.getZ());
		const xPlusPoint = new cPoint(this.position.getX()+1, this.position.getY(), this.position.getZ());
		const xMinusPoint = new cPoint(this.position.getX()-1, this.position.getY(), this.position.getZ());
		const zPlusPoint = new cPoint(this.position.getX(), this.position.getY(), this.position.getZ()+1);
		const zMinusPoint = new cPoint(this.position.getX(), this.position.getY(), this.position.getZ()-1);

		// ブロック移動はキャラの向きで処理が変わる
		// 向きと同じ方向は押す、逆の方向は引く
		switch (this.direction) {
			case D_TOP:
				if (map.checkBlock(zPlusPoint)) {
					if (keyInput.isUp()) {
						if (map.checkBlockPush(zPlusPoint, D_TOP)) {
							map.setMoveCubeInfo(zPlusPoint, D_TOP);
							this.lastAction = CHARACTER_ACTION_PUSH;
							return MAP_TASK_CUBE_MOVE;
						}
					} else
					if (keyInput.isDown()) {
						if (map.checkBlockPull(point, D_DOWN)) {
							map.setMoveCubeInfo(zPlusPoint, D_DOWN);
							this.lastAction = CHARACTER_ACTION_PULL;
							return MAP_TASK_CUBE_MOVE;
						}
					}
				}
				break;

			case D_DOWN:
				if (map.checkBlock(zMinusPoint)) {
					if (keyInput.isDown()) {
						if (map.checkBlockPush(zMinusPoint, D_DOWN)) {
							map.setMoveCubeInfo(zMinusPoint, D_DOWN);
							this.lastAction = CHARACTER_ACTION_PUSH;
							return MAP_TASK_CUBE_MOVE;
						}
					} else
					if (keyInput.isUp()) {
						if (map.checkBlockPull(point, D_TOP)) {
							map.setMoveCubeInfo(zMinusPoint, D_TOP);
							this.lastAction = CHARACTER_ACTION_PULL;
							return MAP_TASK_CUBE_MOVE;
						}
					}
				}
				break;

			case D_LEFT:
				if (map.checkBlock(xMinusPoint)) {
					if (keyInput.isLeft()) {
						if (map.checkBlockPush(xMinusPoint, D_LEFT)) {
							map.setMoveCubeInfo(xMinusPoint, D_LEFT);
							this.lastAction = CHARACTER_ACTION_PUSH;
							return MAP_TASK_CUBE_MOVE;
						}
					} else
					if (keyInput.isRight()) {
						if (map.checkBlockPull(point, D_RIGHT)) {
							map.setMoveCubeInfo(xMinusPoint, D_RIGHT);
							this.lastAction = CHARACTER_ACTION_PULL;
							return MAP_TASK_CUBE_MOVE;
						}
					}
				}
				break;

			case D_RIGHT:
				if (map.checkBlock(xPlusPoint)) {
					if (keyInput.isRight()) {
						if (map.checkBlockPush(xPlusPoint, D_RIGHT)) {
							map.setMoveCubeInfo(xPlusPoint, D_RIGHT);
							this.lastAction = CHARACTER_ACTION_PUSH;
							return MAP_TASK_CUBE_MOVE;
						}
					} else
					if (keyInput.isLeft()) {
						if (map.checkBlockPull(point, D_LEFT)) {
							map.setMoveCubeInfo(xPlusPoint, D_LEFT);
							this.lastAction = CHARACTER_ACTION_PULL;
							return MAP_TASK_CUBE_MOVE;
						}
					}
				}
				break;
		}
	} else {
		// キャラクター移動
		if (keyInput.isUp()) {
			this.changeDirection(D_TOP);
			this.lastAction = CHARACTER_ACTION_ROTATE;
			// X キー押しながらで向きだけ変わる
			if (!keyInput.isX()) {
				this.lastAction = CHARACTER_ACTION_MOVE;
				newPosition = map.checkMove(this.position, new cPoint(this.position.getX(), this.position.getY(), this.position.getZ()+1));
			}
		} else
		if (keyInput.isRight()) {
			this.changeDirection(D_RIGHT);
			this.lastAction = CHARACTER_ACTION_ROTATE;
			if (!keyInput.isX()) {
				this.lastAction = CHARACTER_ACTION_MOVE;
				newPosition = map.checkMove(this.position, new cPoint(this.position.getX()+1, this.position.getY(), this.position.getZ()));
			}
		} else
		if (keyInput.isDown()) {
			this.changeDirection(D_DOWN);
			this.lastAction = CHARACTER_ACTION_ROTATE;
			if (!keyInput.isX()) {
				this.lastAction = CHARACTER_ACTION_MOVE;
				newPosition = map.checkMove(this.position, new cPoint(this.position.getX(), this.position.getY(), this.position.getZ()-1));
			}
		} else
		if (keyInput.isLeft()) {
			this.changeDirection(D_LEFT);
			this.lastAction = CHARACTER_ACTION_ROTATE;
			if (!keyInput.isX()) {
				this.lastAction = CHARACTER_ACTION_MOVE;
				newPosition = map.checkMove(this.position, new cPoint(this.position.getX()-1, this.position.getY(), this.position.getZ()));
			}
		}
	}

	if (newPosition) {
		this.setPosition(newPosition);
	}

	return MAP_TASK_INPUT_WAIT;
};

cCharacter.prototype.setPosition = function(position) {
	this.position = position;
	this.update();
};

cCharacter.prototype.actionHanging = function() {
	let moveResult = false;

	const oldAction = CHARACTER_ACTION_HANGING_MOVE;

	// ぶら下がり中はブロック移動判定を行わない。
	// キャラクター移動
	if (keyInput.isUp()) {
		// 掴んでるブロックに登れるなら上る
		moveResult = map.checkHangingMove(this.position, this.direction, D_TOP);
		this.lastAction = CHARACTER_ACTION_HANGING_UP;

	} else
	if (keyInput.isDown()) {
		// 手を放して落下する
		moveResult = map.checkHangingMove(this.position, this.direction, D_DOWN);
		this.lastAction = CHARACTER_ACTION_HANGING_FALL;

	} else
	if (keyInput.isRight()) {
		// 右移動
		moveResult = map.checkHangingMove(this.position, this.direction, D_RIGHT);
		this.lastAction = CHARACTER_ACTION_HANGING_MOVE;

	} else
	if (keyInput.isLeft()) {
		// 左移動
		moveResult = map.checkHangingMove(this.position, this.direction, D_LEFT);
		this.lastAction = CHARACTER_ACTION_HANGING_MOVE;

	}

	if (moveResult) {
	 	if (keyInput.isUp() || keyInput.isDown()) {
			this.setStatusNormal();
	 	}

		this.setPosition(moveResult.position);
		this.changeDirection(moveResult.direction);
		this.update();
		map.updateCubeImgFrameAll();

		if (keyInput.isDown()) {
			return MAP_TASK_CUBE_FALL_CHECK;
		}
	}

	// 行動出来てないなら戻す
	this.lastAction = oldAction;

	return MAP_TASK_INPUT_WAIT;
};

cCharacter.prototype.draw = function() {

};

cCharacter.prototype.getPosition = function() {
	return this.position;
};

cCharacter.prototype.update = function() {
	this.point = positionToPoint(this.position);

	if (this.isStatusNormal()) {
		this.getGroup().x = this.point.getX();
		this.getGroup().y = this.point.getY()+4;
	} else
	if (this.isStatusHanging()) {
		switch (this.direction) {
			case D_TOP:
				this.getGroup().x = this.point.getX()+4;
				this.getGroup().y = this.point.getY()-6;
				break;

			case D_DOWN:
				this.getGroup().x = this.point.getX()-4;
				this.getGroup().y = this.point.getY()-3;
				break;

			case D_LEFT:
				this.getGroup().x = this.point.getX()-4;
				this.getGroup().y = this.point.getY()-6;
				break;

			case D_RIGHT:
				this.getGroup().x = this.point.getX()+4;
				this.getGroup().y = this.point.getY()-4;
				break;
		}
	}

	map.updateCharacterZindex();
};

cCharacter.prototype.getDirection = function() {
	return this.direction;
};

cCharacter.prototype.changeDirection = function(direction) {
	this.direction = direction;
	this.sprite.frame = this.direction;
};

cCharacter.prototype.moveRight = function() {
	this.getGroup().x += 2;
	++this.getGroup().y;
};

cCharacter.prototype.moveLeft = function() {
	this.getGroup().x -= 2;
	--this.getGroup().y;
};

cCharacter.prototype.moveDown = function() {
	this.getGroup().x -= 2;
	this.getGroup().y += 1;
};

cCharacter.prototype.moveTop = function() {
	this.getGroup().x += 2;
	this.getGroup().y -= 1;
};

cCharacter.prototype.moveFall = function() {
	this.getGroup().y += 2;
};

cCharacter.prototype.setStatusNormal = function() {
	this.status = CHARACTER_STATUS_NORMAL;
};

cCharacter.prototype.setStatusHanging = function() {
	this.status = CHARACTER_STATUS_HANGING;
};

cCharacter.prototype.isStatusNormal = function() {
	return this.status == CHARACTER_STATUS_NORMAL;
};

cCharacter.prototype.isStatusHanging = function() {
	return this.status == CHARACTER_STATUS_HANGING;
};

cCharacter.prototype.getLastAction = function() {
	return this.lastAction;
};

cCharacter.prototype.lastActionIsWait = function() {
	return this.lastAction == CHARACTER_ACTION_WAIT;
};

cCharacter.prototype.lastActionIsMove = function() {
	return this.lastAction == CHARACTER_ACTION_MOVE;
};

cCharacter.prototype.lastActionIsRotate = function() {
	return this.lastAction == CHARACTER_ACTION_ROTATE;
};

cCharacter.prototype.lastActionIsPush = function() {
	return this.lastAction == CHARACTER_ACTION_PUSH;
};

cCharacter.prototype.lastActionIsPull = function() {
	return this.lastAction == CHARACTER_ACTION_PULL;
};

cCharacter.prototype.lastActionIsHangingMove = function() {
	return this.lastAction == CHARACTER_ACTION_HANGING_MOVE;
};

cCharacter.prototype.lastActionIsHangingFall = function() {
	return this.lastAction == CHARACTER_ACTION_HANGING_FALL;
};

cCharacter.prototype.lastActionIsHangingUp = function() {
	return this.lastAction == CHARACTER_ACTION_HANGING_UP;
};
