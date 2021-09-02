var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var videos = ['LhwQ5_NO2v0', 'ltf17T91_eM'];
var index = 0;

function onYouTubeIframeAPIReady(){
	player = new YT.Player('player', {
		height:'390',
		width:'640',
		videoId:'LhwQ5_NO2v0',
		playerVars:{
			'playsinline':1
		}
	,
	events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event){
	console.log("ready");
	event.target.playVideo();
	console.log("video play sent");
}

function onPlayerStateChange(event){
	if(event.data == YT.PlayerState.PLAYING && !done){
		setTimeout(stopVideo, 6000);
		done = true;
	}
}

function loadNextVideo(){
	index += 1;
	player.loadVideoById(videos[index]);
}
