var dimensions = {
	width: window.innerWidth,
	height: window.innerHeight
};

var startVideo = function(video,videoStream){


	var onSuccess = function (stream){
		var srcstream = window.URL ? window.URL.createObjectURL : function(stream) { return stream};
		videoStream.url = srcstream(stream);
		video.src = videoStream.url;
		whenVideoStreamReady(video,videoStream)
	}


	var onError = function(e){
	}
	video.width = dimensions.width;
	video.height = dimensions.height;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia || null;

    if(navigator.getUserMedia !== null){
    	navigator.getUserMedia({video:true},onSuccess,onError);
    }
};

var translateVideoToCanvas = function(video,videoStream,canvas){
	var intId = setInterval(function(){ 
		capture(video,canvas,videoStream)
	},60);
	return intId;
}
var capture = function(video,canvas,videoStream){
	if(!videoStream.url){
		return;
	}
	var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, video.width, video.height);
    
}
var setDataUrlToA = function(base64dataUrl){
	var a = document.querySelector('#save');
	a.href = base64dataUrl;
	a.setAttribute('download','picture' + (Math.floor(Math.random() * 100)) + '.png');
}
var showSaveBtn = function(save){
	if(save.classList.contains('hide')){
		save.classList.remove('hide');
	}
}
var clearCanvas = function(canvas){
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(!save.classList.contains('hide')){
		save.classList.add('hide');
	}
}
var showToolsPanel = function(toolsPanel){
	if(toolsPanel.classList.contains('hide')){
		toolsPanel.classList.remove('hide');
	}
}
var whenVideoStreamReady = function(video,videoStream){
	var canvas = document.getElementById('canvas');
	canvas.width = dimensions.width;
	canvas.height = dimensions.height;


	var screenShot = document.getElementById('screenShot');
	var clear = document.getElementById('clear');
	var save = document.getElementById('save');
	var toolsPanel = document.querySelector('.toolsPanel');
	var intId = translateVideoToCanvas(video,videoStream,canvas)
	var shadowCanvas = document.createElement('canvas');
	var shadowCanvasContext = shadowCanvas.getContext('2d');
	var buttons = document.getElementsByClassName('buttonWrap')[0];

	var saveHandler = function(){
		var context = canvas.getContext('2d');
		

		var pictures = document.querySelectorAll('.picture > img');
		var coordsOfElement;
		var stylesOfElement;

		var coordsOfCanvas = canvas.getBoundingClientRect();

		shadowCanvas.width = dimensions.width;
		shadowCanvas.height = dimensions.height;

		shadowCanvasContext.drawImage(canvas,0,0,canvas.width,canvas.height);
		for(var i=0,N = pictures.length;i < N; i++){
			coordsOfElement = pictures[i].getBoundingClientRect();
			stylesOfElement = getComputedStyle(pictures[i]);
			shadowCanvasContext.drawImage(pictures[i],coordsOfElement.left - coordsOfCanvas.left,coordsOfElement.top - coordsOfCanvas.top,parseInt(stylesOfElement.width,10),parseInt(stylesOfElement.height,10));
		};

		var base64dataUrl = shadowCanvas.toDataURL('image/png');
    	setDataUrlToA(base64dataUrl);

	}
	var screenShothandler = function(){
		buttons.classList.add('captured');
		screenShot.classList.add('captured');
		showToolsPanel(toolsPanel);
		clearInterval(intId);
	}
	var clearhandler = function(){
		buttons.classList.remove('captured');
		screenShot.classList.remove('captured');
		if(!toolsPanel.classList.contains('hide')){
			toolsPanel.classList.add('hide');
		}
		intId = translateVideoToCanvas(video,videoStream,canvas);
	}


	screenShot.addEventListener('click',screenShothandler);
	clear.addEventListener('click',clearhandler);
	save.addEventListener('click',saveHandler);

}


