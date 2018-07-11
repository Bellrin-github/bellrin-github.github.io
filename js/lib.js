const random = function(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const removeAllChild = function(group) {
	if (!group) return;

	while(group.lastChild) {
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
}