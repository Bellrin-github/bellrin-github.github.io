cKuma = function() {
	this.point;
	this.frame;
	this.speed;
	this.status;
	this.attackWaitBar;
	this.attackFrame;
	this.damageFrame;
	this._stop;
	this.init();
};
inherits(cKuma, cTask);

cKuma.prototype.init = function() {
	this.frame = 0;
	this._stop = false;
	this.point = new cPoint(5, SPRITE_MH*3-14, SPRITE_MW, SPRITE_MH);

	this.status = new cStatus();
	this.status.hp = 100;
	this.status.maxHp = 100;
	this.status.str = 5;
	this.status.def = 5;
	this.status.speed = 5;

	this.sprite = createSprite(IMG_KUMA, 0, this.point);
	this.sprite.frames = [
		this.sprite.frame,
		this.sprite.frame + 1,
		this.sprite.frame,
		this.sprite.frame + 2,
	];

	this.getGroup().addChild(this.sprite);

	this.speed = 2;

	this.attackFrame = null;
	this.attackWaitBar = null;
};

cKuma.prototype.action = function() {
	++this.frame;

	switch (this.task) {
		case KUMA_TASK_MOVE:
			if (this.attackWaitBar) {
				this.attackWaitBar.remove();
				this.getGroup().removeChild(this.attackWaitBar.getGroup());
				this.attackWaitBar = null;
			}
			break;
		case KUMA_TASK_STOP:
			this.attackFrame = null;
			this.attackWaitBar = null;
			break;
		case KUMA_TASK_WAIT:
			if (this.attackFrame == null && this.attackWaitBar == null) {
				this.attackFrame = 0;
				this.attackWaitBar = new cAttackWaitBar(new cPoint(this.point.x, this.point.y, 32, 6), 100);
				this.attackWaitBar.getGroup().x = this.point.x;
				this.attackWaitBar.getGroup().y = this.point.y - 5;
				this.getGroup().addChild(this.attackWaitBar.getGroup());
			}

			if (!this.attackWaitBar.action()) {
				this.task = KUMA_TASK_ATTACK;
				this.attackFrame = 0;
			}
			break;
		case KUMA_TASK_ATTACK:
			console.log('ATTACK!!');
			this.task = KUMA_TASK_WAIT;
			isAttackAnimation = false;
			++this.attackFrame;
			break;
		case KUMA_TASK_DAMAGE_INIT:
			this.damageFrame = 0
			this.sprite.frame = 3;
			this.task = KUMA_TASK_DAMAGE;
			break;
		case KUMA_TASK_DAMAGE:
			if (this.damageFrame % 3 == 0) {
				this.sprite.opacity = this.sprite.opacity==0?1.0:0.0;
			}
			if (this.damageFrame >= 18) {
				this.sprite.opacity = 1.0;
				this.sprite.frame = 0;
				this.task = KUMA_TASK_WAIT;
			}
			++this.damageFrame;
			break;
	}
};

cKuma.prototype.draw = function() {
	if (this.isMove() && this.frame % 3 == 0) {
		this.sprite.frame = this.sprite.frames[this.sprite.frameCount++];
		if (this.sprite.frameCount >= this.sprite.frames.length) {
			this.sprite.frameCount = 0;
		}
	}
};

cKuma.prototype.move = function() {
	this.task = KUMA_TASK_MOVE;
	this._stop = false;
};

cKuma.prototype.stop = function() {
	this.task = KUMA_TASK_STOP;
	this._stop = true;
};

cKuma.prototype.wait = function() {
	this.task = KUMA_TASK_WAIT;
};

cKuma.prototype.damage = function(n) {
	this.task = KUMA_TASK_DAMAGE_INIT;
};

cKuma.prototype.isMove = function() {
	return !this._stop;
};

cKuma.prototype.isStop = function() {
	return this._stop;
};