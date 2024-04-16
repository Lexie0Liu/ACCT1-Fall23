// music
const songLibrary = [
    { title: "Therefore I Am", artist: "Billie Eilish", cover: "billie.jpeg", file: "path_to_thereforeiam.mp3" },
    { title: "All you had to do was stay", artist: "Taylor Swift", cover: "1989.jpeg", file: "All You Had to Do Was Stay _ 24Naijamuzic.com 1.mp3" },
    { title: "Lucid Dreams", artist: "Juice WRLD", cover: "luciddream.jpeg", file: "Juice WRLD - Lucid Dreams (Directed by Cole Bennett).mp3"},
    { title: "Kill Bill", artist: "SZA", cover: "killbill.jpeg", file: "SZA - Kill Bill (Audio).mp3" },
    { title: "Peaches", artist: "ustin Bieber ft. Daniel Caesar & Giveon", cover: "peaches.jpeg", file: "Justin Bieber - Peaches ft. Daniel Caesar, Giveon.mp3" },
    { title: "Blinding Lights", artist: "The Weeknd", cover: "blinding.jpeg", file: "The Weeknd - Blinding Lights (Official Audio).mp3" },
    { title: "I Don't Wanna Live Forever", artist: "Taylor Swift, ZAYN", cover: "taylor1.jpeg", file: "ZAYN, Taylor Swift - I Dont Wanna Live Forever (Fifty Shades Darker).mp3" },
    { title: "Lover", artist: "Taylor Swift", cover: "lover.jpeg" },
    { title: "Good 4 You", artist: "Olivia Rodrigo", cover: "good4u.jpeg" },
    { title: "Industry Baby", artist: "Lil Nas X ft. Jack Harlow", cover: "lilnasx.jpeg" },
    { title: "SOUR CANDY", artist: "Lady Gaga & BLACKPINK", cover: "sourcandy.jpeg" },
    // 省略其他歌曲，确保添加完整信息...
];


let currentSongIndex = 0;

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songLibrary.length;
    const currentSong = songLibrary[currentSongIndex];
    
    // 更新歌曲信息
    document.getElementById('song-title').innerText = currentSong.title;
    document.getElementById('artist-name').innerText = `by ${currentSong.artist}`;
    document.getElementById('album-cover').src = currentSong.cover;

    // 设置并播放音频
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = currentSong.file;
    audioPlayer.play();
}


document.getElementById('next-song').addEventListener('click', playNextSong);

playNextSong(); 


