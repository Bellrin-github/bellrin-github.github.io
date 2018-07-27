cBackGround = function() {
	this.bgSprits;
	this.frame;
	this.init();
};
inherits(cBackGround, cTask);

cBackGround.prototype.init = function() {
	this.frame = 0;

	this.bgSprits = [];
	for(let y=0; y<BG_ARRAY.length; ++y) {
		this.bgSprits[y] = [];
		for(let x=0; x<BG_ARRAY[y].length; ++x) {
			this.bgSprits[y][x] = createSprite(IMG_MAP, BG_ARRAY[y][x], new cPoint(x*SPRITE_MW, y*SPRITE_MH, SPRITE_MW, SPRITE_MH));
			this.getGroup().addChild(this.bgSprits[y][x]);
		}
	}
};

cBackGround.prototype.action = function() {
	++this.frame;
};

cBackGround.prototype.draw = function() {
	if (kuma.isMove()) {
		for(let y=0; y<this.bgSprits.length; ++y) {
			for(let x=0; x<this.bgSprits[y].length; ++x) {
				this.bgSprits[y][x].x -= kuma.speed;
				if (this.bgSprits[y][x].x <= -SPRITE_MW) {
					this.bgSprits[y][x].x += SPRITE_MW * this.bgSprits[y].length;
				}
			}
		}
	}
};
