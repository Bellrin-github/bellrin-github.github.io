/**
 * マップ
 */
cMap = function() {
	this.point;
	this.map;
	this.character;
	this.moveCubePoint;
	this.moveCubeDirection;
	this.moveCubeFrame;
	this.moveCubePoints;
	this.moveCubeEndCharacterPoint;
	this.fallCubeFrame;
	this.fallCubePoints;
	this.fallCharacterFrame;
	this.characterFallCount; // キャラクターが何ブロック落下したか

	this.init();
};
inherits(cMap, cTask);

cMap.prototype.init = function() {
	this.task = MAP_TASK_INPUT_INIT;

	this.moveCubePoint = null;
	this.moveCubeDirection = null;
	this.moveCubeFrame = 0;
	this.moveCubePoints = [];

	this.point = new cPoint(0, 0, WINDOW_SIZE_W, WINDOW_SIZE_H);
	this.getGroup().x = 0;
	this.getGroup().y = 0;

	this.map = new Array(MAP_Z_MAX);
	for (let z = 0; z < MAP_Z_MAX ; ++z) {
		this.map[z] = new Array(MAP_Y_MAX);
		for (let y = 0; y < MAP_Y_MAX; ++y) {
			this.map[z][y] = new Array(MAP_X_MAX);
			for (let x = 0; x < MAP_X_MAX; ++x) {
				this.map[z][y][x] = new cMapData(new cPoint(x, y, z));
				this.map[z][y][x].createCube();
				if (testMapData[z][y][x]) {
					this.map[z][y][x].show();
				}
			}
		}
	}

	mapShowSort.map((sorts) => {
		sorts.map((point) => {
			this.getGroup().addChild(this.map[point.getZ()][point.getY()][point.getX()].getCubeSprite());
		});
	});

	this.character = null;
};

cMap.prototype.action = function() {
	switch (this.task) {
		case MAP_TASK_INPUT_INIT:
			if (this.character == null) {
				this.character = new cCharacter(0, 8, 2);
				this.getGroup().addChild(this.character.getGroup());
			}
			this.updateCubeImgFrameAll();
			this.task = MAP_TASK_INPUT_WAIT;

			break;
		case MAP_TASK_INPUT_WAIT:
			this.task = this.character.action();

			break;
		case MAP_TASK_CUBE_MOVE:
			if (!this.moveCube()) {
				this.task = MAP_TASK_CUBE_FALL_CHECK;
			}

			break;
		case MAP_TASK_CUBE_FALL_CHECK:
			if (this.cubeFallCheck()) {
				// 落下するキューブがあれば、落下処理へ
				this.task = MAP_TASK_CUBE_FALL;
			} else {
				// なければキャラクター落下チェックへ
				this.characterFallCount = 0;
				this.task = MAP_TASK_CHARACTER_FALL_CHECK;
			}

			break;
		case MAP_TASK_CUBE_FALL:
			if (this.cubeFall()) {
				this.task = MAP_TASK_CUBE_FALL_CHECK;
			}

			break;
		case MAP_TASK_CHARACTER_FALL_CHECK:
			if (this.characterFallCheck()) {
				// 落下するなら、落下処理へ
				this.task = MAP_TASK_CHARACTER_FALL;
			} else {
				// 落下しなければ入力待機へ
				this.task = MAP_TASK_INPUT_WAIT;
			}

			break;
		case MAP_TASK_CHARACTER_FALL:
			if (this.characterFall()) {
				this.task = MAP_TASK_CHARACTER_FALL_CHECK;
			}

			break;
	}

	return true;
};

cMap.prototype.draw = function() {
	this.character.draw();
};

cMap.prototype.setMoveCubeInfo = function(moveCubePoint, moveCubeDirection) {
	this.moveCubePoint = moveCubePoint;
	this.moveCubeDirection = moveCubeDirection;
	this.moveCubeFrame = 0;
};

cMap.prototype.updateCharacterZindex = function() {
	this.getGroup().removeChild(this.character.getGroup());

	// a を b の前に追加
	// キャラクターと同じ場所のブロックの一個前にキャラクタースプライトを移動する。
	const p = this.character.getPosition();
	this.getGroup().insertBefore(this.character.getGroup(), this.map[p.getZ()][p.getY()][p.getX()].getCubeSprite());
};

/**
  * すべてのキューブのスプライトのフレームを更新する
  * @param: x 
  *         y 
  *         z 
  */
cMap.prototype.updateCubeImgFrameAll = function() {
	for (let z = 0; z < MAP_Z_MAX ; ++z) {
		for (let y = 0; y < MAP_Y_MAX; ++y) {
			for (let x = 0; x < MAP_X_MAX; ++x) {
				this.updateCubeImgFrame(x, y, z);
			}
		}
	}
};

/**
  * 指定した座標にあるキューブのスプライトのフレームを更新する
  * @param: x 
  *         y 
  *         z 
  */
cMap.prototype.updateCubeImgFrame = function(x, y, z) {
	let isHanging = false;

	if (this.character.isStatusHanging()) {
		const position = this.character.getPosition();

		switch (this.character.getDirection()) {
			case D_RIGHT:
				if (position.isNotMaxX() &&  z == position.getZ() && y == position.getY() && x == position.getX()+1) {
					isHanging = true;
				}
				break;
			case D_DOWN:
				if (position.isNotMinZ() &&  z == position.getZ()-1 && y == position.getY() && x == position.getX()) {
					isHanging = true;
				}
				break;
			case D_LEFT:
				if (position.isNotMinX() &&  z == position.getZ() && y == position.getY() && x == position.getX()-1) {
					isHanging = true;
				}
				break;
			case D_TOP:
				if (position.isNotMaxZ() &&  z == position.getZ()+1 && y == position.getY() && x == position.getX()) {
					isHanging = true;
				}
				break;
		}
	}

	if (isHanging) {
		this.map[z][y][x].getCube().setHanging();
	} else {
		this.map[z][y][x].getCube().setNormal();
	}

	// 一番上は常に普通
	if (y==0) {
		return;
	}

	// 一つ上が空欄であるかチェック
	if (this.map[z][y-1][x].isHidden()) {
		// その上のほうにキューブがあるなら、上面はそれの影になる。
		for (let n = y-2; n >= 0; --n) {
			if (this.map[z][n][x].isShow()) {
				if (isHanging) {
					this.map[z][y][x].getCube().setHangingShadow();
				} else {
					this.map[z][y][x].getCube().setNormalShadow();
				}
				return;
			}
		}
	}
};

/**
  * 指定した座標に移動しようとした時の結果を返す
  * @param: beforPoint 現在のpoint
  *         afterPoint 移動先のpoint
  * @return 移動出来ない場合：false
  *         移動出来る場合  ：移動後のposition (移動は出来るが、ブロックに乗る必要がある場合があるため)
  */
cMap.prototype.checkMove = function(beforPoint, afterPoint) {
	// 範囲外チェック
	if (afterPoint.getX() < 0 || afterPoint.getY() < 0 || afterPoint.getZ() < 0
	||  afterPoint.getX() >= MAP_X_MAX || afterPoint.getY() >= MAP_Y_MAX || afterPoint.getZ() >= MAP_Z_MAX) {
		return false;
	}

	// 移動先にブロックが無い時
	if (this.map[afterPoint.getZ()][afterPoint.getY()][afterPoint.getX()].isHidden()) {
		// 直下にブロックがあるかをチェックし、あれば一番上の座標に移動
		for (let y = afterPoint.getY() + 1; y < MAP_Y_MAX; ++y) {
			if (this.map[afterPoint.getZ()][y][afterPoint.getX()].isShow()) {
				return new cPoint(afterPoint.getX(), y - 1, afterPoint.getZ());
			}
		}

		// 直下にブロックが無いなら一番下の座標を返す
		return new cPoint(afterPoint.getX(), MAP_Y_MAX-1, afterPoint.getZ());
	}

	// 移動先にブロックがある時
	// 一番上にいる、もしくは自分の頭上にブロックがあるなら移動できない
	if (afterPoint.isMinY()
	||  this.map[beforPoint.getZ()][beforPoint.getY()-1][beforPoint.getX()].isShow()) {
		return false;
	}

	// 一番上より2個以上 下にいる、かつ移動先の上にブロックがあるなら移動できない
	if (afterPoint.getY() >= 2
	&&  this.map[afterPoint.getZ()][afterPoint.getY()-1][afterPoint.getX()].isShow()) {
		return false;
	}

	// 移動先のブロックの上に移動できる
	return new cPoint(afterPoint.getX(), afterPoint.getY()-1, afterPoint.getZ());
};

/**
  * 指定した座標にブロックがあるかを返す
  * @param: point チェックするpoint
  * @return ブロックが無い：false
  *         ブロックが有る：true
  */
cMap.prototype.checkBlock = function(point) {
	// 範囲外には常に無い
	if (point.getX() < 0 || point.getY() < 0 || point.getZ() < 0
	||  point.getX() >= MAP_X_MAX || point.getY() >= MAP_Y_MAX || point.getZ() >= MAP_Z_MAX) {
		return false;
	}

	// ブロックが存在するか返す
	return this.map[point.getZ()][point.getY()][point.getX()].isShow();
};

/**
  * 指定したブロックを指定した方向に押せるかを返す
  * 押す方向に空きがあれば押せる。
  * @param: point 動かすブロックのpoint
  * @return 動かせない：false
  *         動かせる：true
  */
cMap.prototype.checkBlockPush = function(point, direction) {
	switch (direction) {
		case D_TOP:
			for (let z = point.getZ()+1; z < MAP_Z_MAX; ++z) {
				if (this.map[z][point.getY()][point.getX()].isHidden()) {
					return true;
				}
			}
			break;

		case D_DOWN:
			for (let z = point.getZ()-1; z >= 0; --z) {
				if (this.map[z][point.getY()][point.getX()].isHidden()) {
					return true;
				}
			}
			break;

		case D_LEFT:
			for (let x = point.getX()-1; x >= 0; --x) {
				if (this.map[point.getZ()][point.getY()][x].isHidden()) {
					return true;
				}
			}
			break;

		case D_RIGHT:
			for (let x = point.getX()+1; x < MAP_X_MAX; ++x) {
				if (this.map[point.getZ()][point.getY()][x].isHidden()) {
					return true;
				}
			}
			break;
	}

	return false;
};

/**
  * 指定したブロックを指定した方向に引けるかを返す
  * キャラクターが下がる場所が空きであれば引ける。
  * ただし、キャラクターの移動先が画面外なら移動できない。
  * @param: point キャラクターのpoint
  * @return 動かせない：false
  *         動かせる：true
  */
cMap.prototype.checkBlockPull = function(point, direction) {
	switch (direction) {
		case D_TOP:
			if (point.getZ()+1 >= MAP_Z_MAX) {
				return false;
			}
			return this.map[point.getZ()+1][point.getY()][point.getX()].isHidden();

		case D_DOWN:
			if (point.getZ()-1 < 0) {
				return false;
			}
			return this.map[point.getZ()-1][point.getY()][point.getX()].isHidden();

		case D_LEFT:
			if (point.getX()-1 < 0) {
				return false;
			}
			return this.map[point.getZ()][point.getY()][point.getX()-1].isHidden();

		case D_RIGHT:
			if (point.getX()+1 >= MAP_X_MAX) {
				return false;
			}
			return this.map[point.getZ()][point.getY()][point.getX()+1].isHidden();
	}

	return false;
};

cMap.prototype.moveCube = function() {
	if (this.moveCubeFrame == 0) {
		this.moveCubeEndCharacterPoint = null;
		this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][this.moveCubePoint.getX()].hidden();
		this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][this.moveCubePoint.getX()].resetPoint();
	}

	let xv = 0;
	let yv = 0;

	switch (this.moveCubeDirection) {
		case D_TOP:
			xv = 2;
			yv = -1;
			this.character.moveTop();
			if (this.moveCubeFrame == 0) {
				if (this.character.getDirection() == D_TOP) {
					this.moveCubeEndCharacterPoint = this.moveCubePoint;
				} else {
					this.moveCubeEndCharacterPoint = new cPoint(this.character.getPosition().getX(), this.character.getPosition().getY(), this.character.getPosition().getZ()+1)
				}

				this.moveCubePoints = [];
				for (let z = this.moveCubePoint.getZ()+1; z < MAP_Z_MAX; ++z) {
					this.moveCubePoints.push(new cPoint(this.moveCubePoint.getX(), this.moveCubePoint.getY(), z));
					let sprite = this.map[z][this.moveCubePoint.getY()][this.moveCubePoint.getX()].getCubeSprite();
					sprite.x -= 2*8;
					sprite.y += 1*8;

					if (this.map[z][this.moveCubePoint.getY()][this.moveCubePoint.getX()].isHidden()) {
						this.map[z][this.moveCubePoint.getY()][this.moveCubePoint.getX()].show();
						break;
					}
				}
			}
			break;

		case D_DOWN:
			xv = -2;
			yv = 1;
			this.character.moveDown();
			if (this.moveCubeFrame == 0) {
				if (this.character.getDirection() == D_DOWN) {
					this.moveCubeEndCharacterPoint = this.moveCubePoint;
				} else {
					this.moveCubeEndCharacterPoint = new cPoint(this.character.getPosition().getX(), this.character.getPosition().getY(), this.character.getPosition().getZ()-1)
				}

				this.moveCubePoints = [];
				for (let z = this.moveCubePoint.getZ()-1; z >= 0; --z) {
					this.moveCubePoints.push(new cPoint(this.moveCubePoint.getX(), this.moveCubePoint.getY(), z));
					let sprite = this.map[z][this.moveCubePoint.getY()][this.moveCubePoint.getX()].getCubeSprite();
					sprite.x += 2*8;
					sprite.y -= 1*8;

					if (this.map[z][this.moveCubePoint.getY()][this.moveCubePoint.getX()].isHidden()) {
						this.map[z][this.moveCubePoint.getY()][this.moveCubePoint.getX()].show();
						break;
					}
				}
			}
			break;

		case D_LEFT:
			xv = -2;
			yv = -1;
			this.character.moveLeft();
			if (this.moveCubeFrame == 0) {
				if (this.character.getDirection() == D_LEFT) {
					this.moveCubeEndCharacterPoint = this.moveCubePoint;
				} else {
					this.moveCubeEndCharacterPoint = new cPoint(this.character.getPosition().getX()-1, this.character.getPosition().getY(), this.character.getPosition().getZ());
				}

				this.moveCubePoints = [];
				for (let x = this.moveCubePoint.getX()-1; x >= 0; --x) {
					this.moveCubePoints.push(new cPoint(x, this.moveCubePoint.getY(), this.moveCubePoint.getZ()));
					let sprite = this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][x].getCubeSprite();
					sprite.x += 2*8;
					sprite.y += 1*8;

					if (this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][x].isHidden()) {
						this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][x].show();
						break;
					}
				}
			}
			break;

		case D_RIGHT:
			xv = 2;
			yv = 1;
			this.character.moveRight();
			if (this.moveCubeFrame == 0) {
				if (this.character.getDirection() == D_RIGHT) {
					this.moveCubeEndCharacterPoint = this.moveCubePoint;
				} else {
					this.moveCubeEndCharacterPoint = new cPoint(this.character.getPosition().getX()+1, this.character.getPosition().getY(), this.character.getPosition().getZ())
				}

				this.moveCubePoints = [];
				for (let x = this.moveCubePoint.getX()+1; x < MAP_X_MAX; ++x) {
					this.moveCubePoints.push(new cPoint(x, this.moveCubePoint.getY(), this.moveCubePoint.getZ()));
					let sprite = this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][x].getCubeSprite();
					sprite.x -= 2*8;
					sprite.y -= 1*8;

					if (this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][x].isHidden()) {
						this.map[this.moveCubePoint.getZ()][this.moveCubePoint.getY()][x].show();
						break;
					}
				}
			}
			break;
	}

	this.moveCubePoints.map((point) => {
		let sprite = this.map[point.getZ()][point.getY()][point.getX()].getCubeSprite();
		sprite.x += xv;
		sprite.y += yv;
	});

	if (this.moveCubeFrame+1 >= 8) {
		this.moveCubePoints.map((point) => {
			this.map[point.getZ()][point.getY()][point.getX()].resetPoint();
		});

		if (this.moveCubeEndCharacterPoint) {
			this.character.setPosition(this.moveCubeEndCharacterPoint);
		}

		this.updateCubeImgFrameAll();
	}

	return ++this.moveCubeFrame < 8;
};

/**
  * 落下するキューブがあるかチェック
  * @param: 無し
  * @return ある：true
  *         ない：false
  */
cMap.prototype.cubeFallCheck = function() {
	let isFall = false;
	this.fallCubeFrame = 0;
	this.fallCubePoints = [];

	for (let z = 0; z < MAP_Z_MAX ; ++z) {
		// 一番下は落下しない
		for (let y = 0; y < MAP_Y_MAX-1; ++y) {
			for (let x = 0; x < MAP_X_MAX; ++x) {
				// 自分自身が表示されている
				if (this.map[z][y][x].isHidden()) {
					continue;
				}

				// 真下のブロックが表示されていたら落下しない。
				if (this.map[z][y+1][x].isShow()) {
					continue;
				}

				// 右下にブロックがあれば辺接地で落下無し
				if (x < MAP_X_MAX - 1 && this.map[z][y+1][x+1].isShow()) {
					continue;
				}
				// 左下にブロックがあれば辺接地で落下無し
				if (x > 0 && this.map[z][y+1][x-1].isShow()) {
					continue;
				}

				// 奥下にブロックがあれば辺接地で落下無し
				if (z < MAP_Z_MAX - 1 && this.map[z+1][y+1][x].isShow()) {
					continue;
				}
				// 手前下にブロックがあれば辺接地で落下無し
				if (z > 0 && this.map[z-1][y+1][x].isShow()) {
					continue;
				}

				// 落下
				this.fallCubePoints.push(new cPoint(x, y, z));
				isFall = true;
			}
		}
	}

	return isFall;
};

/**
  * キューブ落下処理
  * @param: 無し
  * @return 完了：true
  *         継続：false
  */
cMap.prototype.cubeFall = function() {
	this.fallCubePoints.map((point) => {
		let sprite = this.map[point.getZ()][point.getY()][point.getX()].getCubeSprite();
		sprite.y += 2;
	});

	if (++this.fallCubeFrame >= 8) {
		this.fallCubePoints.map((point) => {
			this.map[point.getZ()][point.getY()][point.getX()].hidden();
			this.map[point.getZ()][point.getY()][point.getX()].resetPoint();
			this.updateCubeImgFrame(point.getX(), point.getY(), point.getZ());

			this.map[point.getZ()][point.getY()+1][point.getX()].show();
			this.updateCubeImgFrame(point.getX(), point.getY()+1, point.getZ());
		});
		return true;
	}

	return false;
};

/**
  * キャラクターが落下するかチェック
  * @param: 無し
  * @return 落下：true
  *         そのまま：false
  */
cMap.prototype.characterFallCheck = function() {
	const position = this.character.getPosition();

	this.fallCharacterFrame = 0;

	// 一番下にいるなら落下できない
	if (position.getY() >= MAP_Y_MAX-1) {
		return false;
	}

	// 着地判定
	if (this.map[position.getZ()][position.getY()+1][position.getX()].isShow()) {
		return false
	}

	// キャラクターがブロックを引いた後に１ブロック以上落下してたら、ぶら下がり判定も行う。
	if (this.character.lastActionIsPull() && this.characterFallCount > 0) {
		switch (this.character.getDirection()) {
			case D_RIGHT:
				if (position.isNotMaxX() &&  this.map[position.getZ()][position.getY()][position.getX()+1].isShow()) {
					this.character.setStatusHanging();
				}
				break;
			case D_DOWN:
				if (position.isNotMinZ() &&  this.map[position.getZ()-1][position.getY()][position.getX()].isShow()) {
					this.character.setStatusHanging();
				}
				break;
			case D_LEFT:
				if (position.isNotMinX &&  this.map[position.getZ()][position.getY()][position.getX()-1].isShow()) {
					this.character.setStatusHanging();
				}
				break;
			case D_TOP:
				if (position.isNotMaxZ() &&  this.map[position.getZ()+1][position.getY()][position.getX()].isShow()) {
					this.character.setStatusHanging();
				}
				break;
		}

		if (this.character.isStatusHanging()) {
			this.character.update();
			this.updateCubeImgFrameAll();
			return false;
		}
	}

	return true;
};

/**
  * キャラクターが落下処理
  * @param: 無し
  * @return 完了：true
  *         継続：false
  */
cMap.prototype.characterFall = function() {
	// 落下
	this.character.moveFall();

	// 落下終了判定
	if (++this.fallCharacterFrame >= 8) {
		const position = this.character.getPosition();
		this.character.setPosition(new cPoint(position.getX(), position.getY()+1, position.getZ()));

		++this.characterFallCount;
		return true;
	}

	return false;
};

/**
  * ぶら下がり中に指定した方向に移動しようとした時の結果を返す
  * @param: point キャラクターの移動前のpoint
  *         characterDirection 移動前のキャラクターの向き
  *         moveDirection 移動する向き
  * @return 移動出来ない場合：false
  *         移動出来る場合  ：array
  *             [
  *                 position: 移動後のposition
  *                 direction: 移動後のキャラクターの向き
  *             ]
  */
cMap.prototype.checkHangingMove = function(point, characterDirection, moveDirection) {
	let returnValue = false;

	if (moveDirection == D_DOWN) {
		return {
			position:  point,
			direction: characterDirection
		};
	}

	switch (characterDirection) {
		case D_TOP:
			// 上向いているときに
			switch (moveDirection) {
				case D_TOP:
					// ぶら下がってるブロックに登れるかチェックし登れないならそのまま
					if (this.map[point.getZ()+1][point.getY()-1][point.getX()].isHidden()) {
						returnValue = {
							position:  new cPoint(point.getX(), point.getY()-1, point.getZ()+1),
							direction: D_TOP
						};
						break;
					}
					break;

				case D_DOWN:
					
					break;

				case D_LEFT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMinX() && this.map[point.getZ()][point.getY()][point.getX()-1].isShow()) {
						returnValue = {
							position:  point,
							direction: D_LEFT
						};
						break;
					}
					// 左斜め奥にブロックがあるならそれにぶら下がる
					if (point.isNotMinX() && point.isNotMaxZ() && this.map[point.getZ()+1][point.getY()][point.getX()-1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY(), point.getZ()),
							direction: D_TOP
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの左に回り込む
					if (point.isNotMinX() && point.isNotMaxZ()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY(), point.getZ()+1),
							direction: D_RIGHT
						};
					}
					break;

				case D_RIGHT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMaxX() && this.map[point.getZ()][point.getY()][point.getX()+1].isShow()) {
						returnValue = {
							position:  point,
							direction: D_RIGHT
						};
						break;
					}
					// 右斜め奥にブロックがあるならそれにぶら下がる
					if (point.isNotMaxX() && point.isNotMaxZ() && this.map[point.getZ()+1][point.getY()][point.getX()+1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY(), point.getZ()),
							direction: D_TOP
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの右に回り込む
					if (point.isNotMaxX() && point.isNotMaxZ()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY(), point.getZ()+1),
							direction: D_LEFT
						};
					}
					break;
			}
			break;

		case D_DOWN:
			// 下向いているときに
			switch (moveDirection) {
				case D_TOP:
					// ぶら下がってるブロックに登れるかチェックし登れないならそのまま
					if (this.map[point.getZ()-1][point.getY()-1][point.getX()].isHidden()) {
						returnValue = {
							position:  new cPoint(point.getX(), point.getY()-1, point.getZ()-1),
							direction: D_DOWN
						};
						break;
					}
					break;

				case D_DOWN:
					
					break;

				case D_LEFT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMaxX() && this.map[point.getZ()][point.getY()][point.getX()+1].isShow()) {
						returnValue = {
							position:  point,
							direction: D_RIGHT
						};
						break;
					}
					// 右斜め手前にブロックがあるならそれにぶら下がる
					if (point.isNotMaxX() && point.isNotMinZ() && this.map[point.getZ()-1][point.getY()][point.getX()+1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY(), point.getZ()),
							direction: D_DOWN
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの右に回り込む
					if (point.isNotMaxX() && point.isNotMinZ()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY(), point.getZ()-1),
							direction: D_LEFT
						};
					}
					break;

				case D_RIGHT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMinX() && this.map[point.getZ()][point.getY()][point.getX()-1].isShow()) {
						returnValue = {
							position:  point,
							direction: D_LEFT
						};
						break;
					}
					// 左斜め手前にブロックがあるならそれにぶら下がる
					if (point.isNotMinX() && point.isNotMinZ() && this.map[point.getZ()-1][point.getY()][point.getX()-1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY(), point.getZ()),
							direction: D_DOWN
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの左に回り込む
					if (point.isNotMinX() && point.isNotMinZ()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY(), point.getZ()-1),
							direction: D_RIGHT
						};
					}
					break;
			}
			break;

		case D_LEFT:
			// 左向いているときに
			switch (moveDirection) {
				case D_TOP:
					// ぶら下がってるブロックに登れるかチェックし登れないならそのまま
					if (this.map[point.getZ()][point.getY()-1][point.getX()-1].isHidden()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY()-1, point.getZ()),
							direction: D_LEFT
						};
						break;
					}
					break;

				case D_DOWN:
					
					break;

				case D_LEFT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMinZ() && this.map[point.getZ()-1][point.getY()][point.getX()].isShow()) {
						returnValue = {
							position:  point,
							direction: D_DOWN
						};
						break;
					}
					// 左斜め手前にブロックがあるならそれにぶら下がる
					if (point.isNotMinZ() && this.map[point.getZ()-1][point.getY()][point.getX()-1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX(), point.getY(), point.getZ()-1),
							direction: D_LEFT
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの左に回り込む
					if (point.isNotMinX() && point.isNotMaxZ()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY(), point.getZ()-1),
							direction: D_TOP
						};
					}
					break;

				case D_RIGHT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMaxZ() && this.map[point.getZ()+1][point.getY()][point.getX()].isShow()) {
						returnValue = {
							position:  point,
							direction: D_TOP
						};
						break;
					}
					// 右斜め奥にブロックがあるならそれにぶら下がる
					if (point.isNotMaxZ() && this.map[point.getZ()+1][point.getY()][point.getX()-1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX(), point.getY(), point.getZ()+1),
							direction: D_LEFT
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの右に回り込む
					if (point.isNotMinX() && point.isNotMaxZ()) {
						returnValue = {
							position:  new cPoint(point.getX()-1, point.getY(), point.getZ()+1),
							direction: D_DOWN
						};
					}
					break;
			}
			break;

		case D_RIGHT:
			// 右向いているときに
			switch (moveDirection) {
				case D_TOP:
					// ぶら下がってるブロックに登れるかチェックし登れないならそのまま
					if (this.map[point.getZ()][point.getY()-1][point.getX()+1].isHidden()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY()-1, point.getZ()),
							direction: D_RIGHT
						};
						break;
					}
					break;

				case D_DOWN:
					
					break;

				case D_LEFT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMaxZ() && this.map[point.getZ()+1][point.getY()][point.getX()].isShow()) {
						returnValue = {
							position:  point,
							direction: D_TOP
						};
						break;
					}
					// 右斜め奥にブロックがあるならそれにぶら下がる
					if (point.isNotMaxZ() && point.isNotMaxX() && this.map[point.getZ()+1][point.getY()][point.getX()+1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX(), point.getY(), point.getZ()+1),
							direction: D_RIGHT
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの左に回り込む
					if (point.isNotMaxX() && point.isNotMaxZ()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY(), point.getZ()+1),
							direction: D_DOWN
						};
					}
					break;

				case D_RIGHT:
					// 横にブロックがあるならそれにぶら下がる
					if (point.isNotMinZ() && this.map[point.getZ()-1][point.getY()][point.getX()].isShow()) {
						returnValue = {
							position:  point,
							direction: D_DOWN
						};
						break;
					}
					// 右斜め手前にブロックがあるならそれにぶら下がる
					if (point.isNotMaxZ() && point.isNotMaxX() && this.map[point.getZ()-1][point.getY()][point.getX()+1].isShow()) {
						returnValue = {
							position:  new cPoint(point.getX(), point.getY(), point.getZ()-1),
							direction: D_RIGHT
						};
						break;
					}
					// それ以外なら、今ぶら下がっているブロックの右に回り込む
					if (point.isNotMaxX() && point.isNotMinZ()) {
						returnValue = {
							position:  new cPoint(point.getX()+1, point.getY(), point.getZ()-1),
							direction: D_TOP
						};
					}
					break;
			}
			break;
	}

	return returnValue;
};
