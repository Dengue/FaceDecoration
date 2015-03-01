var DragNdropController = function(element){
	this.element = element;
	this.startPosition={
		x:0,
		y:0
	};
	this.endPosition={
		x:0,
		y:0
	};
	this.position={
		x:0,
		y:0
	};
	this.element.addEventListener('mousedown',this.dragStart.bind(this));
	this.element.addEventListener('mouseup',this.dragEnd.bind(this));
};

DragNdropController.prototype.dragStart = function(event){
		event.preventDefault();
		var delta = centerEl(this.element,event);
		this.endPosition.x = delta.deltaX;
		this.endPosition.y = delta.deltaY;
		var styles = getComputedStyle(this.element);
		this.oldZIndex = styles.zIndex;
		this.element.style.zIndex = "9999";
		var br = this.element.parentNode.getBoundingClientRect();
		this.startPosition.x = event.clientX;
		this.startPosition.y = event.clientY;
		this.position.x = event.clientX;
		this.position.y = event.clientY;
		this.dragMove1 = this.dragMove.bind(this);
		this.element.addEventListener('mousemove',this.dragMove1);
};
DragNdropController.prototype.dragMove = function(event){
		event.preventDefault();
		var br = this.element.parentNode.getBoundingClientRect();
		this.position.x = event.clientX;
		this.position.y = event.clientY;
		var offsetX = this.position.x-this.startPosition.x;
		var offsetY = this.position.y-this.startPosition.y;
		this.element.style.transform = "translate(" + (this.endPosition.x + offsetX) + "px," + (this.endPosition.y + offsetY) + "px)";
};
DragNdropController.prototype.dragEnd = function(event){
		event.preventDefault();

		this.element.style.zIndex = ""//this.oldZIndex.toString();

		this.endPosition.x = this.endPosition.x + this.position.x-this.startPosition.x;
		this.endPosition.y = this.endPosition.y + this.position.y-this.startPosition.y;
		this.element.removeEventListener('mousemove',this.dragMove1);
};



var childs = document.getElementsByClassName('child');
var ctrl1 = new DragNdropController(childs[0]);

var ctrl2 = new DragNdropController(childs[1]);