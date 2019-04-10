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

const positionToPoint = function(position) {
	let x = position.getX() * 16;
	x += position.getZ() * 16
	x += Math.floor(4 * MAP_Z_MAX);

	let y = position.getY() * 16;
	y += position.getX() * 8;
	y -= position.getZ() * 8;
	y += 96;

	let z = position.getZ() * 32;

	return new cPoint(x, y, z);
};
