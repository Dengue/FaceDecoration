var startVideo = function(video,videoStream){


	var onSuccess = function (stream){
		var srcstream = window.URL ? window.URL.createObjectURL : function(stream) { return stream};
		videoStream.url = srcstream(stream);
		video.src = videoStream.url;
		whenVideoStreamReady(video,videoStream)
	}


	var onError = function(e){
	}

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
	var a = document.querySelector('#save a');
	a.href = base64dataUrl;
	a.setAttribute('download','picture' + (Math.floor(Math.random() * 100)) + '.png');
}
var showSaveBtn = function(){
	var save = document.getElementById('save');
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
var whenVideoStreamReady = function(video,videoStream){
	var canvas = document.getElementById('canvas');
	var screenShot = document.getElementById('screenShot');
	var clear = document.getElementById('clear');
	var save = document.getElementById('save');
	var intId = translateVideoToCanvas(video,videoStream,canvas)
	screenShot.addEventListener('click',function(){
		showSaveBtn();
		var base64dataUrl = canvas.toDataURL('image/png');
    	setDataUrlToA(base64dataUrl);
		clearInterval(intId);
	});
	clear.addEventListener('click',function(e){
		if(!save.classList.contains('hide')){
			save.classList.add('hide');
		}
		intId = translateVideoToCanvas(video,videoStream,canvas);
	});
}
function main(){
	var videoStream = {};
	videoStream.url = false;
	var video = document.getElementById('video');	
	startVideo(video,videoStream);

}
main();
