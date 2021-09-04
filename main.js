var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var gods_menu = ["LhwQ5_NO2v0", 43, 82];
var loser_lover = ["QMxqHzdjv0c", 39, 78];
var after_school = ["7t9CHqg59h8", 35, 64];
var asap = ["ljLn5QFnGyQ", 36, 72];

var videos = [gods_menu, loser_lover, after_school, asap];
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
		setTimeout(loadNextVideo, videos[index][2]-videos[index][1]);
		done = true;
	}
}

function loadNextVideo(){
	index += 1;
	player.loadVideoById(videos[index][0]);
	done = false;
}
