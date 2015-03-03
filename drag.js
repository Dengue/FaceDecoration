var DragNdropController = function(element){
	this.element = element;
	this.isDragging = false;
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
	window.addEventListener('mousemove',this.dragMove.bind(this));
	window.addEventListener('mouseup',this.dragEnd.bind(this));

};

DragNdropController.prototype.dragStart = function(event){
		event.preventDefault();
		this.isDragging =true;
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
};
DragNdropController.prototype.dragMove = function(event){
	if(!this.isDragging) return;

	event.preventDefault();
	var br = this.element.parentNode.getBoundingClientRect();    //get someshit
	this.position.x = event.clientX;
	this.position.y = event.clientY;
	var offsetX = this.position.x-this.startPosition.x;
	var offsetY = this.position.y-this.startPosition.y;
	this.element.style.transform = "translate(" + (this.endPosition.x + offsetX) + "px," + (this.endPosition.y + offsetY) + "px)";
};
DragNdropController.prototype.dragEnd = function(event){
		event.preventDefault();
		this.isDragging = false;
		this.element.style.zIndex = ""//this.oldZIndex.toString();

		this.endPosition.x = this.endPosition.x + this.position.x-this.startPosition.x;
		this.endPosition.y = this.endPosition.y + this.position.y-this.startPosition.y;
		this.element.removeAttribute("data-draggable");
		this.element.removeEventListener('mousemove',this.dragMove1);
};