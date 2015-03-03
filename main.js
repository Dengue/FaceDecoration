function main(){
	var videoStream = {};
	videoStream.url = false;
	var video = document.getElementById('video');	
	startVideo(video,videoStream);


	var pictures = document.getElementsByClassName('picture');
	var ctrls = [];
	for(var i=0,N = pictures.length;i < N; i++){
		ctrls.push(new DragNdropController(pictures[i]));
	};
};
main();