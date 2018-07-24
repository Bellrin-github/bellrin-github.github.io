cSmallIcon = function() {
	this.redSprite;
	this.redText;
	this.redCount;
	this.blueSprite;
	this.blueText;
	this.blueCount;
	this.greenSprite;
	this.greenText;
	this.greenCount;
	this.yellowSprite;
	this.yellowText;
	this.yellowCount;
	this.blackSprite;
	this.blackText;
	this.blackCount;
	this.pinkSprite;
	this.pinkText;
	this.pinkCount;

	this.init();
};
inherits(cSmallIcon, cTask);

cSmallIcon.prototype.init = function() {
	let y=0;

	this.redSprite = createSprite(IMG_SMALL_ICON, SMALL_IMAGE_FRAME_LIST.red_icon, new cPoint(0, (SPRITE_SSH+2)*y, SPRITE_SSW, SPRITE_SSH));
	this.getGroup().addChild(this.redSprite);
	this.redText = null;
	this.redCount = 0;
	this.refleshRedText();
	++y;

	this.blueSprite = createSprite(IMG_SMALL_ICON, SMALL_IMAGE_FRAME_LIST.blue_icon, new cPoint(0, (SPRITE_SSH+2)*y, SPRITE_SSW, SPRITE_SSH));
	this.getGroup().addChild(this.blueSprite);
	this.blueText = null;
	this.blueCount = 0;
	this.refleshBlueText();
	++y;

	this.greenSprite = createSprite(IMG_SMALL_ICON, SMALL_IMAGE_FRAME_LIST.green_icon, new cPoint(0, (SPRITE_SSH+2)*y, SPRITE_SSW, SPRITE_SSH));
	this.getGroup().addChild(this.greenSprite);
	this.greenText = null;
	this.greenCount = 0;
	this.refleshGreenText();
	++y;

	this.yellowSprite = createSprite(IMG_SMALL_ICON, SMALL_IMAGE_FRAME_LIST.yellow_icon, new cPoint(0, (SPRITE_SSH+2)*y, SPRITE_SSW, SPRITE_SSH));
	this.getGroup().addChild(this.yellowSprite);
	this.yellowText = null;
	this.yellowCount = 0;
	this.refleshYellowText();
	++y;

	this.blackSprite = createSprite(IMG_SMALL_ICON, SMALL_IMAGE_FRAME_LIST.black_icon, new cPoint(0, (SPRITE_SSH+2)*y, SPRITE_SSW, SPRITE_SSH));
	this.getGroup().addChild(this.blackSprite);
	this.blackText = null;
	this.blackCount = 0;
	this.refleshBlackText();
	++y;

	this.pinkSprite = createSprite(IMG_SMALL_ICON, SMALL_IMAGE_FRAME_LIST.pink_icon, new cPoint(0, (SPRITE_SSH+2)*y, SPRITE_SSW, SPRITE_SSH));
	this.getGroup().addChild(this.pinkSprite);
	this.pinkText = null;
	this.pinkCount = 0;
	this.refleshPinkText();
};

cSmallIcon.prototype.action = function() {

};

cSmallIcon.prototype.draw = function() {

};

cSmallIcon.prototype.addRedCount = function(n) {
	this.redCount += n;
	this.refleshRedText();
};

cSmallIcon.prototype.addBlueCount = function(n) {
	this.blueCount += n;
	this.refleshBlueText();
};

cSmallIcon.prototype.addGreenCount = function(n) {
	this.greenCount += n;
	this.refleshGreenText();
};

cSmallIcon.prototype.addYellowCount = function(n) {
	this.yellowCount += n;
	this.refleshYellowText();
};

cSmallIcon.prototype.addBlackCount = function(n) {
	this.blackCount += n;
	this.refleshBlackText();
};

cSmallIcon.prototype.addPinkCount = function(n) {
	this.pinkCount += n;
	this.refleshPinkText();
};

cSmallIcon.prototype.refleshRedText = function() {
	if (this.redText) {
		removeAllChild(this.redText.getGroup());
		this.getGroup().removeChild(this.redText.getGroup());
	}

	this.redText = new cImageText(this.redCount);
	this.redText.getGroup().x = SPRITE_SSW + 2;
	this.redText.getGroup().y = (SPRITE_SSH+2) * 0;

	this.getGroup().addChild(this.redText.getGroup());
};

cSmallIcon.prototype.refleshBlueText = function() {
	if (this.blueText) {
		removeAllChild(this.blueText.getGroup());
		this.getGroup().removeChild(this.blueText.getGroup());
	}

	this.blueText = new cImageText(this.blueCount);
	this.blueText.getGroup().x = SPRITE_SSW + 2;
	this.blueText.getGroup().y = (SPRITE_SSH+2) * 1;

	this.getGroup().addChild(this.blueText.getGroup());
};

cSmallIcon.prototype.refleshGreenText = function() {
	if (this.greenText) {
		removeAllChild(this.greenText.getGroup());
		this.getGroup().removeChild(this.greenText.getGroup());
	}

	this.greenText = new cImageText(this.greenCount);
	this.greenText.getGroup().x = SPRITE_SSW + 2;
	this.greenText.getGroup().y = (SPRITE_SSH+2) * 2;

	this.getGroup().addChild(this.greenText.getGroup());
};

cSmallIcon.prototype.refleshYellowText = function() {
	if (this.yellowText) {
		removeAllChild(this.yellowText.getGroup());
		this.getGroup().removeChild(this.yellowText.getGroup());
	}

	this.yellowText = new cImageText(this.yellowCount);
	this.yellowText.getGroup().x = SPRITE_SSW + 2;
	this.yellowText.getGroup().y = (SPRITE_SSH+2) * 3;

	this.getGroup().addChild(this.yellowText.getGroup());
};

cSmallIcon.prototype.refleshBlackText = function() {
	if (this.blackText) {
		removeAllChild(this.blackText.getGroup());
		this.getGroup().removeChild(this.blackText.getGroup());
	}

	this.blackText = new cImageText(this.blackCount);
	this.blackText.getGroup().x = SPRITE_SSW + 2;
	this.blackText.getGroup().y = (SPRITE_SSH+2) * 4;

	this.getGroup().addChild(this.blackText.getGroup());
};

cSmallIcon.prototype.refleshPinkText = function() {
	if (this.pinkText) {
		removeAllChild(this.pinkText.getGroup());
		this.getGroup().removeChild(this.pinkText.getGroup());
	}

	this.pinkText = new cImageText(this.pinkCount);
	this.pinkText.getGroup().x = SPRITE_SSW + 2;
	this.pinkText.getGroup().y = (SPRITE_SSH+2) * 5;

	this.getGroup().addChild(this.pinkText.getGroup());
};
