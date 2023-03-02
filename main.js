let track_art = document.querySelector(".track-art")
let track_name = document.querySelector(".track-name")
let track_artist = document.querySelector(".track-artist")

let playpause_btn = document.querySelector(".playpause-track")
let prev_btn = document.querySelector(".prev-track")
let next_btn = document.querySelector(".next-track")

let seek_slider = document.querySelector(".seek_slider")
let volume_slider = document.querySelector(".volume_slider")
let volume_down = document.querySelector(".volume_down")
let volume_up = document.querySelector(".volume_up")
let curr_time = document.querySelector(".current-time")
let total_duration = document.querySelector(".total-duration")
let wave = document.getElementById("wave")
let randomIcon = document.querySelector(".fa-random")
let curr_track = document.createElement("audio")


let track_index = 0;
let isPlaying = false;
let isRandom= false;
let updateTimer;

const music_list = [

        {
        img: 'imgs/1.jpg',
        name: "2amareen",
        artist: "Amr Diab",
        music: "music/2amareen.mp3"
    },
        {
        img: 'imgs/3.jpeg',
        name: "Ya Rumman",
        artist: "Mohamed Mounir",
        music: "music/02.Ya Rumman.mp3"
    },
        {
        img: 'imgs/2.jpg',
        name: "Kanet Henak",
        artist: "Mohamed Hamaki",
        music: "music/04 - Kanet Henak.mp3"
    },
        {
        img: 'imgs/33.jpeg',
        name: "Haret El Sa'ayeen",
        artist: "Mohamed Mounir",
        music: "music/05.Haret El Sa'ayeen.mp3"
    },
    
        {
        img: 'imgs/11.jpg',
        name: "Habibty",
        artist: "Amr Diab",
        music: "music/06 - Habibty.mp3"
    },
        {
        img: 'imgs/1.jpg',
        name: "07 - Saet El Forak",
        artist: "Amr Diab",
        music: "music/07 - Saet El Forak.mp3"
    },
        {
        img: 'imgs/3.jpeg',
        name: "Ya Hamam",
        artist: "Mohamed Mounir",
        music: "music/14.Ya Hamam.mp3"
    },
        {
        img: 'imgs/11.jpg',
        name: "Ah Men El Fora2",
        artist: "Amr Diab",
        music: "music/Ah Men El Fora2.mp3"
    },
    {
        img: 'imgs/1.jpg',
        name: "Tamaly Ma3ak",
        artist: "Amr Diab",
        music: "music/Tamaly Ma3ak.mp3"
    },
        {
        img: 'imgs/11.jpg',
        name: "Tensa Wa7da",
        artist: "Amr Diab",
        music: "music/Tensa Wa7da.mp3"
    },
]

loadTarck(track_index)


function loadTarck(track_index){
    clearInterval(updateTimer)
        resizeTo(0,0);


    curr_track.load();
    track_art.style.backgroundImage = 'url('+ music_list[track_index].img +')'    
    track_name.textContent = music_list[track_index].name
    track_artist.textContent = music_list[track_index].artist
    curr_track.src = music_list[track_index].music
    updateTimer = setInterval(setUpdate,1000);
    curr_track.addEventListener("ended",nextTrack)
}
function reset(){
    curr_time.textContent="00:00"
    total_duration.textContent="00:00"
    seek_slider.value=0
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    randomIcon.classList.add("randomActive")
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove("randomActive")
}

function repeatTrack(){
    let current_index = track_index;
    loadTarck(current_index);
    playTrack();
}
function playPauseTrack(){
    isPlaying ? pauseTrack() : playTrack()
}
function playTrack(){
    curr_track.play();
    isPlaying = true
    track_art.classList.add("rotate")
    wave.classList.add("loader")
    playpause_btn.innerHTML = "<i class='fa fa-pause-circle fa-5x'></i> "
    playpause_btn.setAttribute("title","Pause")
}

function pauseTrack(){
    curr_track.pause()
    isPlaying = false
    track_art.classList.remove("rotate")
    wave.classList.remove("loader")
    playpause_btn.innerHTML = "<i class='fa fa-play-circle fa-5x'></i> "
    playpause_btn.setAttribute("title","Play")

}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length)
        track_index = random_index
    }else{
        track_index = 0
    }
    loadTarck(track_index)
    playTrack()
}


function prevTrack(){
    if(track_index > 0){
        track_index -= 1
    }else{
        track_index = music_list.length - 1
    }
    loadTarck(track_index)
    playTrack()
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100
}
function mute(){
    volume_slider.value =0
    setVolume()
}
function unMute(){
    volume_slider.value = 99
    setVolume()
}
volume_down.addEventListener("click", function(){
    this.classList.add("fa-volume-xmark")
})
volume_up.addEventListener("click", function(){
    volume_down.classList.remove("fa-volume-xmark")
})

volume_slider.addEventListener("change", function(){
    if(volume_slider.value > 0){
        volume_down.classList.remove("fa-volume-xmark")
    }else if(volume_slider.value <= 0){
        volume_down.classList.add("fa-volume-xmark")
    }
})
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration)
        seek_slider.value = seekPosition
        let currentMinutes = Math.floor(curr_track.currentTime / 60)
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60)
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds<10){
            currentSeconds = '0' + currentSeconds
        }
        if(durationSeconds<10){
            durationSeconds = '0' + durationSeconds
        }
        if(currentMinutes<10){
            currentMinutes = '0' + currentMinutes
        }
        if(durationMinutes<10){
            durationMinutes = '0' + durationMinutes
        }
        curr_time.textContent = currentMinutes + ":" + currentSeconds
        total_duration.textContent = durationMinutes + ":" + durationSeconds
    }
}