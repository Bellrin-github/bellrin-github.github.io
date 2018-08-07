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

const getComboAverage = function () {
	if (comboCountHistory.length < 1) {
		return 1;
	}

	let total = 0;
	for (let i=0; i<comboCountHistory.length; ++i) {
		total += comboCountHistory[i];
	}

	return Math.floor(total / comboCountHistory.length);
};

const getComboAverageDamageBonus = function () {
	if (getComboAverage() >= 10) {
		return COMBO_AVARAGE_DAMAGE_BONUS_LIST[10];
	}

	return COMBO_AVARAGE_DAMAGE_BONUS_LIST[getComboAverage()];
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
		case IMAGE_FRAME_BOARD_DROP_PINK:
			return ELEMENT_PINK;
	}

	return ELEMENT_NONE;
};

/**
 * 第一引数からみた第二引数の属性相性による倍率を返す
 */
const getElementMagnification = function (element1, element2) {
	element1 = convertElement(element1);
	element2 = convertElement(element2);
	if (element1 == ELEMENT_NONE || element2 == ELEMENT_NONE) {
		return 1.0;
	}

	if (element1 == ELEMENT_RED) {
		switch (element2) {
			case ELEMENT_RED:
			case ELEMENT_YELLOW:
			case ELEMENT_BLACK:
				return 1.0;
			case ELEMENT_BLUE:
				return 0.5;
			case ELEMENT_GREEN:
				return 1.5;
		}
	} else
	if (element1 == ELEMENT_BLUE) {
		switch (element2) {
			case ELEMENT_BLUE:
			case ELEMENT_YELLOW:
			case ELEMENT_BLACK:
				return 1.0;
			case ELEMENT_RED:
				return 1.5;
			case ELEMENT_GREEN:
				return 0.5;
		}
	} else
	if (element1 == ELEMENT_GREEN) {
		switch (element2) {
			case ELEMENT_GREEN:
			case ELEMENT_YELLOW:
			case ELEMENT_BLACK:
				return 1.0;
			case ELEMENT_RED:
				return 0.5;
			case ELEMENT_BLUE:
				return 1.5;
		}
	} else
	if (element1 == ELEMENT_YELLOW) {
		switch (element2) {
			case ELEMENT_RED:
			case ELEMENT_BLUE:
			case ELEMENT_GREEN:
			case ELEMENT_YELLOW:
				return 1.0;
			case ELEMENT_BLACK:
				return 1.5;
		}
	} else
	if (element1 == ELEMENT_BLACK) {
		switch (element2) {
			case ELEMENT_RED:
			case ELEMENT_BLUE:
			case ELEMENT_GREEN:
			case ELEMENT_BLACK:
				return 1.0;
			case ELEMENT_YELLOW:
				return 1.5;
		}
	}

	// ここを通ることはないはず
	return 1.0;
};