

//GetElements
const btnPlayer = document.querySelector("#btnPlayer")
const audioTag = document.querySelector("#audioTag")
let timeSlider = document.querySelector("#timeSlider")
let titleMusic = document.querySelector("#titleMusic")
const soundOnOff = document.querySelector("#soundOnOff")
const mutedIcon = document.querySelector("#mutedIcon")
const sliderVol = document.querySelector("#sliderVol")
const track = document.querySelector("#track")

// Animação
AOS.init({
    duration: 1200
}); 

// Array e estado de current
const listMusic = ["audios/audio1.mp3","audios/audio2.mp3","audios/audio3.mp3"]
const listTitle = ["Track 1", "Track 2", "Track 3"]
let curretMusic = 0
audioTag.src = listMusic[curretMusic]
titleMusic.innerText = listTitle[curretMusic]

// Botão Play e Pause
btnPlayer.onclick = function (e) {
    e.preventDefault()
    if(audioTag.paused){
        audioTag.play()
        track.style.opacity = 1
        track.classList.add("animated", "fadeInDown")
        titleMusic.classList.add("animated","fadeInUp")
        titleMusic.style.opacity = 1
        btnIcon.classList.remove("fa-play") 
        btnIcon.classList.add("fa-pause")
    } else{
        audioTag.pause()
        btnIcon.classList.remove("fa-pause")
        btnIcon.classList.add("fa-play")
    }   
}

//Volume
soundOnOff.onclick = function(e){
    e.preventDefault()
    audioTag.muted = ! audioTag.muted 
    if(audioTag.muted === false){
        mutedIcon.classList.remove("fa-volume-off")
        mutedIcon.classList.add("fa-volume-up")
    }else{
        mutedIcon.classList.remove("fa-volume-up")
        mutedIcon.classList.add("fa-volume-off")
    }
}
sliderVol.oninput = function(e){audioTag.volume = sliderVol.value/100}
sliderVol.onchange = function(e){audioTag.volume = sliderVol.value/100}


//Update time
audioTag.ontimeupdate = function(e){
    timeSlider.max = audioTag.duration
    timeSlider.value = audioTag.currentTime
    timeSlider.oninput = function(e){audioTag.currentTime = timeSlider.value}
}

//Next
audioTag.onended = function (e) {
    curretMusic++
    if (curretMusic === listMusic.length) {
        curretMusic = 0
    }
    audioTag.src = listMusic[curretMusic]
    titleMusic.innerText = listTitle[curretMusic]
    titleMusic.style.opacity = 0
    titleMusic.classList.remove("animated", "fadeInUp")
    audioTag.play() 
    setTimeout(
        function () {
            titleMusic.innerText = listTitle[curretMusic]
            titleMusic.style.opacity = 1
            titleMusic.classList.add("animated", "fadeInUp")
        }, 500
    )
}

