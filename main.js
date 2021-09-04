var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var blank_video = ["XIMLoLxmTDw", 0, 0.5]
var gods_menu = ["LhwQ5_NO2v0", 43, 82];
var loser_lover = ["QMxqHzdjv0c", 39, 78];
var after_school = ["7t9CHqg59h8", 35, 64];
var asap = ["ljLn5QFnGyQ", 36, 72];

var videos = [blank_video, gods_menu, loser_lover, after_school, asap];
var index = 0;

var done = false;

function onYouTubeIframeAPIReady(){
	player = new YT.Player('player', {
		height:'390',
		width:'640',
		videoId:'XIMLoLxmTDw',
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
		setTimeout(loadNextVideo, 1000*(videos[index][2]-videos[index][1]));
		done = true;
	}
}

function loadNextVideo(){
	index += 1;
	player.loadVideoById(videos[index][0], videos[index][1]);
	done = false;
}
