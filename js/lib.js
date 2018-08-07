const random = function(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const removeAllChild = function(group) {
	if (!group) return;

	while(group.lastChild) {
		removeAllChild(group.lastChild);
		group.removeChild(group.lastChild);
	}
};

const createSprite = function (img, frame, point) {
	let sprite = new Sprite(point.w, point.h);
	sprite.image = game.assets[img];
	sprite.x = point.x;
	sprite.y = point.y;
	sprite.frame = frame;
	sprite.frameCount = 0;;
	return sprite;
};

const convertElement = function (element) {
	if (element < 10) {
		return element
	}

	switch (element) {
		case IMAGE_FRAME_BOARD_DROP_RED:
			return ELEMENT_RED;
		case IMAGE_FRAME_BOARD_DROP_BLUE:
			return ELEMENT_BLUE;
		case IMAGE_FRAME_BOARD_DROP_GREEN:
			return ELEMENT_GREEN;
		case IMAGE_FRAME_BOARD_DROP_YELLOW:
			return ELEMENT_YELLOW;
		case IMAGE_FRAME_BOARD_DROP_PURPLE:
			return ELEMENT_BLACK;
	}

	return ELEMENT_NONE;
};