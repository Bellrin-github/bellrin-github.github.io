cEnemy = function() {
	this.point;
	this.frame;
	this.status;
	this.attackWaitBar;
	this.attackFrame;
	this.damageFrame;
	this.damageTexts;
	this._stop;
	this.init();
};
inherits(cEnemy, cTask);

cEnemy.prototype.init = function() {
	this.frame = 0;
	this.task = ENEMY_TASK_INIT;

	// 画面の右寄り奥に表示してはじめは見えない
	this.point = new cPoint(WINDOW_SIZE_W, SPRITE_MH*2 + 5, 48, 48);

	this.status = new cStatus();
	this.status.hp = 100;
	this.status.maxHp = 100;
	this.status.str = 5;
	this.status.def = 5;
	this.status.speed = 5;

	this.sprite = createSprite(IMG_MONSTER_BUT, 2, this.point);
	this.sprite.frames = [
		this.sprite.frame,
		this.sprite.frame + 1,
		this.sprite.frame + 2,
		this.sprite.frame + 1,
	];

	this.getGroup().addChild(this.sprite);

	this.attackWaitBar = new cAttackWaitBar(new cPoint(this.point.x, this.point.y, 48, 6), 100);
	this.attackWaitBar.getGroup().x = this.sprite.x;
	this.attackWaitBar.getGroup().y = -50;
	this.getGroup().addChild(this.attackWaitBar.getGroup());

	this.damageTexts = [];
};

cEnemy.prototype.action = function() {
	++this.frame;

	switch (this.task) {
		case ENEMY_TASK_INIT:
			this.task = ENEMY_TASK_MOVE;
			break;
		case ENEMY_TASK_MOVE:
			if (this.sprite.x > SPRITE_MW * 4) {
				this.sprite.x -= 2;
			} else {
				this.task = ENEMY_TASK_WAIT;
				this.sprite.x = SPRITE_MW * 4;
				this.attackWaitBar.getGroup().x = this.sprite.x;
				this.attackWaitBar.getGroup().y = this.sprite.y - 10;
				kuma.wait();
			}
			break;
		case ENEMY_TASK_WAIT:
			if (!this.attackWaitBar.action()) {
				this.task = ENEMY_TASK_ATTACK;
				this.attackFrame = 0;
			}
			break;
		case ENEMY_TASK_ATTACK:
			if (this.attackFrame < 3) {
				this.sprite.x += 10;
			} else
			if (this.attackFrame < 30) {
				this.sprite.x -= 15;
				if (this.sprite.x <= 32) {
					this.attackFrame = 30;
					this.sprite.x = 32;
					kuma.damage(10);
				}
			} else {
				if (this.sprite.x < SPRITE_MW * 4) {
					this.sprite.x += 10;
				} else {
					this.sprite.x = SPRITE_MW * 4;
					isAttackAnimation = false;
					this.task = ENEMY_TASK_WAIT;
				}
			}
			++this.attackFrame;
			break;
		case ENEMY_TASK_DAMAGE_INIT:
			this.damageFrame = 0
			// this.sprite.frame = 3;
			this.task = ENEMY_TASK_DAMAGE;
			break;
		case ENEMY_TASK_DAMAGE:
			if (this.damageFrame % 3 == 0) {
				this.sprite.opacity = this.sprite.opacity==0?1.0:0.0;
			}
			if (this.damageFrame >= 18) {
				this.sprite.opacity = 1.0;
				this.sprite.frame = 0;
				this.task = ENEMY_TASK_WAIT;
			}
			++this.damageFrame;
			break;
	}

	this.damageTexts.forEach((damageText, index) => {
		if (!damageText.action()) {
			removeAllChild(damageText.getGroup());
			this.getGroup().removeChild(damageText.getGroup());
			this.damageTexts.pop(index)
		}
	});

	this.point.x = this.sprite.x;
	this.point.y = this.sprite.y;
};

cEnemy.prototype.draw = function() {
	if (this.frame % 3 == 0) {
		this.sprite.frame = this.sprite.frames[this.sprite.frameCount++];
		if (this.sprite.frameCount >= this.sprite.frames.length) {
			this.sprite.frameCount = 0;
		}
	}
};

cEnemy.prototype.damage = function(n) {
	this.task = ENEMY_TASK_DAMAGE_INIT;

	const x = this.point.x + this.point.w / 2 - 16;
	const damageText = new cDamageText(new cPoint(x, this.point.y, this.point.w, this.point.h), n, DAMAGE_TEXT_COLOR_RED);

	this.damageTexts.push(damageText);
	this.getGroup().addChild(damageText.getGroup());
};
