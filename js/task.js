/**
 * タスク
 */
var cTask = function() {
	this.group = null;
	this.task = TASK_INIT;
	this.subTask = TASK_INIT;
};

cTask.prototype.action = function() {};

cTask.prototype.draw = function() {};

cTask.prototype.getGroup = function() {
	if (this.group == null) {
		this.group = new Group();
	}
	return this.group;
}