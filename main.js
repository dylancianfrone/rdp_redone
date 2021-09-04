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
var index = 0
var done = false;
songs = [blank_video]


function onYouTubeIframeAPIReady(){
	fetchSongData();
	player = new YT.Player('player', {
		height:'390',
		width:'640',
		videoId:'XIMLoLxmTDw',
		playerVars:{
			'playsinline':1,
			'controls':0,
			'modestbranding':1
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
		setTimeout(loadNextVideo, 1000*(songs[index]['end']-songs[index]['start']));
		done = true;
	}
}

function loadNextVideo(){
	console.log("Loading song "+index)
	index += 1;
	player.loadVideoById(songs[index]['id'], songs[index]['start']);
	done = false;
}

async function fetchSongData(){
  fetch('data.json').then(response => {
    return response.json();
  }).then(data => {
		songs = songs.concat(data['songs']);
    console.log(data);
  }).catch(err => {
    console.log("ERROR")
  });
}
