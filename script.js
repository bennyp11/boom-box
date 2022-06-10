/* we're going to use document.querySelector('audio') to connect this js page to the <audio></audio> secton of index.html */
/* same idea applies to the rest of the consts declared */
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


/* A. WE NEED TO DEFINE THE SONGS INTO AN ARRAY */
const songs = [
{
    name: 'contra-1',
    displayName: 'STARTING TOMORROW',
    artist: 'CONTRA'
},
{
    name: 'contra-2',
    displayName: 'BREAKTHROUGH',
    artist: 'CONTRA'
},
{
    name: 'contra-3',
    displayName: 'CAN YOU DIG IT',
    artist: 'CONTRA'
}];

/* B. NOW WE NEED TO MAKE FUNCTIONS FOR OUR PLAY/PAUSE FUNCTIONALITY */
/*    1. LEAVE THE SOUND OFF AT REST */
let isPlaying = false;

/*    2. CREATE PLAYSONG FUNCTION */
function playSong(){
    /* --------------------------------------------------------------music.play() refers to the music const created when variables were being declared, which refers to the <audio> in HTML 
    -----------------------------------------------------------------play() is a method in the Javascript DOM 
    -----------------------------------------------------------------we also want this function to toggle the play button to a pause button for the next selection 
    -----------------------------------------------------------------playBtn.classList.replace('fa-play', 'fa-pause'); replaces the play logo with the pause logo
    -----------------------------------------------------------------setAttribute('title', 'Pause') changes the element title from 'Play' to 'Pause' */
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

/*    3. CREATE PAUSESONG FUNCTION */
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

/* CREATE THE EVENT LISTENERS FOR THE PLAY/PAUSE */
/* ------------------------------------------------------------------ I think using the arrow function keeps the scope of the variables contained within the playBtn object 
   ------------------------------------------------------------------ (isPlaying ? pauseSong() : playSong())) is a ternary operator, which says if isPlaying is true, pauseSong(), if false, playSong()
*/
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


/* C. WE NEED TO ADD SONGLOADING ABILITY */
/* WE NEED A FUNCTION TO UPDATE THE DOM WITH THE SONG LIST */
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Define the current song
let songIndex = 0;

/*    4. CREATE NEXTSONG FUNCTION */
function nextSong(){
songIndex++;
if (songIndex > songs.length - 1){
    songIndex = 0;
}
loadSong(songs[songIndex]);
playSong();
}
    
/*    5. CREATE PREVSONG FUNCTION */
function prevSong(){
songIndex--;
if (songIndex < 0){
    songIndex = songs.length - 1;
}
loadSong(songs[songIndex]);
playSong();
}

/* ON LOAD, SELECT FIRST SONG */
loadSong(songs[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e){
    if(isPlaying){
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime)

        //update the progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //Update the duration of the song 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        //Delay switching duration Element to avoid NaN
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
  
        //Update the current time
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if(currentTimeSeconds < 10){
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        console.log(currentTimeSeconds, 'seconds')
        console.log(currentTimeMinutes, 'minutes')


    }}


//Update 
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

/* EVENT LISTENERS TO THE PREV AND NEXT BUTTON */
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);




