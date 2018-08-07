cHpBar = function(point, hp, type, elements) {
	this.max;
	this.now;
	this.frameBar;
	this.bgBar;
	this.bar;
	this.type;
	this,point;
	this.elements;
	this.isUpdate;
	this.init(point, hp, type, elements);
};
inherits(cHpBar, cTask);

cHpBar.prototype.init = function(point, hp, type, elements) {
	this.point = point;
	this.now = this.max = hp;
	this.type = type;
	this.elements = elements;

	this.frameBar = new Sprite(this.point.w, this.point.h);
	let surface = new Surface(this.point.w, this.point.h);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
	surface.context.fillRect(0, 0, this.point.w, this.point.h);
	this.frameBar.image = surface;
	this.getGroup().addChild(this.frameBar);

	this.bgBar = new Sprite(this.point.w-2, this.point.h - 2);
	surface = new Surface(this.point.w-2, this.point.h - 2);
	surface.context.beginPath();
	surface.context.fillStyle = 'rgba(70, 70, 70, 1.0)';
	surface.context.fillRect(1, 1, this.point.w-1, this.point.h - 1);
	this.bgBar.image = surface;
	this.getGroup().addChild(this.bgBar);

	this.bar = new Sprite(this.point.w-2, this.point.h - 2);
	this.bar.image = new Surface(this.point.w-2, this.point.h - 2);
	this.draw();
	this.getGroup().addChild(this.bar);

	this.isUpdate = false;

	this.update();
};

cHpBar.prototype.action = function() {
	return this.now > 0;
};

cHpBar.prototype.draw = function() {
	const percent = Math.floor((100 / this.max) * this.now);

	const barWidth = this.point.w - 2;
	const barHeight = this.point.h - 2;

	this.bar.image.context.beginPath();
	this.bar.image.context.clearRect(0, 0, barWidth, barHeight);

	if (percent <= 0) {
		return;
	}

	if (this.elements.length < 2) {
		if (this.type == _KUMA) {
			this.bar.image.context.fillStyle = this.getRgba(this.elements[0]);
		} else {
			this.bar.image.context.fillStyle = this.getRgba(this.elements[0]);
		}
		this.bar.image.context.fillRect(1, 1, (barWidth+1) * (percent * 0.01), barHeight + 1);
	} else {
		for (let i=0; i<this.elements.length; ++i) {
			const p = 100 / this.elements.length * i;
			if (percent < p) {
				continue;
			}

			if (this.type == _KUMA) {
				this.bar.image.context.fillStyle = this.getRgba(this.elements[i]);
			} else {
				this.bar.image.context.fillStyle = this.getRgba(this.elements[i]);
			}

			// HPの割合が属性割合以上なら割合分そのまま描画
			if (percent >= 100 / this.elements.length * (i+1)) {
				this.bar.image.context.fillRect(1 + i * (barWidth/this.elements.length), 1, (barWidth+1) * (100 / this.elements.length * 0.01), barHeight + 1);
			} else {
				this.bar.image.context.fillRect(1 + i * (barWidth/this.elements.length), 1, (barWidth+1) * ((percent-p) * 0.01), barHeight + 1);
			}
		}
	}
};

cHpBar.prototype.update = function() {
	this.draw();
};

cHpBar.prototype.setHp = function(n) {
	this.now = n;
	this.update();
};

cHpBar.prototype.minusHp = function(n) {
	this.now -= n;
	if (this.now < 0) {
		this.now = 0;
	}
	this.update();
};

cHpBar.prototype.plusHp = function(n) {
	this.now += n;
	if (this.now > this.max) {
		this.now = this.max;
	}
	this.update();
};

cHpBar.prototype.setMaxHp = function(n) {
	this.max = n;
	this.update();
};

cHpBar.prototype.remove = function() {
	removeAllChild(this.getGroup());
};

cHpBar.prototype.getRgba = function(element) {
	switch (element) {
		case ELEMENT_RED:
			return 'rgba(255, 100, 100, 1.0)';
		case ELEMENT_BLUE:
			return 'rgba(100, 100, 255, 1.0)';
		case ELEMENT_GREEN:
			return 'rgba(100, 255, 100, 1.0)';
		case ELEMENT_YELLOW:
			return 'rgba(255, 255, 100, 1.0)';
		case ELEMENT_BLACK:
			return 'rgba(255, 100, 255, 1.0)';
	}

	return 'rgba(255, 220, 170, 1.0)';
};

cHpBar.prototype.setOpacity = function(opacity) {
	this.frameBar.opacity = opacity;
	this.bgBar.opacity = opacity;
	this.bar.opacity = opacity;
};

cHpBar.prototype.setElements = function(elements) {
	this.elements = elements;
	for (let i=0; i<this.elements.length; ++i) {
		this.elements[i] = convertElement(this.elements[i]);
	}
	this.update();
};
