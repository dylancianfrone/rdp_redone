var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var blank_video = {
		"title": "",
		"artist": "",
		"id": "XIMLoLxmTDw",
		"start": 0,
		"end": 0.5
}
var d = new Date();
var time_buffer = 1000;
var index = 0
var done = false;
var songs = [blank_video]
var time = 0
function onYouTubeIframeAPIReady(){
	fetchSongData();
	player = new YT.Player('player', {
		height:'390',
		width:'640',
		videoId:'XIMLoLxmTDw',
		playerVars:{
			'playsinline':1,
			'controls':1,
			'modestbranding':1,
			'origin': window.location.host
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
	//event.target.playVideo();
	//console.log("video play sent");
}

function onPlayerStateChange(event){
	if(event.data == YT.PlayerState.ENDED){
		console.log("Sending loadNextVideo() from index: "+index)
		index = loadNextVideo(index);
	}
	if(event.data == YT.PlayerState.PLAYING && index == 0){
		index = loadNextVideo(index);
		done = true;
		request = player.requestFullScreen;
		if(request){
			request.bind(iframe)();
		}
	}
}

function loadNextVideo(n){
	curTime = Date.now()
	console.log("CurTime: "+curTime+" time: "+time);
	if(n != 1 && curTime - time < time_buffer){
		return n;
		console.log("Too fast. CurTime: "+curTime+" time: "+time);
	}
	time = curTime;
	console.log("Loading song "+n);
	play = {'videoId': songs[n]['id'], 'startSeconds': songs[n]['start'], 'endSeconds': songs[n]['end']};
	player.loadVideoById(play);
	done = false;
	return n+1;
}

function manuallyLoadNextVideo(){
	index = loadNextVideo(index);
}

async function fetchSongData(){
	fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
		songs = songs.concat(shuffle(data['songs']));
    console.log(data);
  }).catch(err => {
    console.log("ERROR")
  });
}

//Durstenfeld shuffle
function shuffle(data){
	for(var i=data.length-1;i>0;i--){
		var x = Math.floor(Math.random() * (i+1));
		var temp = data[i];
		data[i] = data[x];
		data[x] = temp;
	}
	return data;
}
