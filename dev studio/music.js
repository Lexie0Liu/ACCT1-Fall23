// music
const songLibrary = [
    { title: "Kill Bill", artist: "SZA", cover: "killbill.jpeg" },
    // { title: "As It Was", artist: "Harry Styles", cover: "asitwas.jpeg" },
    { title: "All you had to do was stay", artist: "Taylor Swift", cover: "1989.jpeg" },
    { title: "Therefore I Am", artist: "Billie Eilish", cover: "billie.jpeg" },
    { title: "Lover", artist: "Taylor Swift", cover: "lover.jpeg" },
    { title: "Blinding Lights", artist: "The Weeknd", cover: "blinding.jpeg" },
    { title: "Good 4 You", artist: "Olivia Rodrigo", cover: "good4u.jpeg" },
    { title: "Peaches", artist: "ustin Bieber ft. Daniel Caesar & Giveon", cover: "peaches.jpeg" },
    { title: "Industry Baby", artist: "Lil Nas X ft. Jack Harlow", cover: "lilnasx.jpeg" },
    { title: "I Don't Wanna Live Forever", artist: "Taylor Swift", cover: "taylor1.jpeg" },
    { title: "SOUR CANDY", artist: "Lady Gaga & BLACKPINK", cover: "sourcandy.jpeg" },
    { title: "Lucid Dreams", artist: "Juice WRLD", cover: "luciddream.jpeg" },
    // add..
];

let currentSongIndex = 0;

function playNextSong() {
    
    currentSongIndex = (currentSongIndex + 1) % songLibrary.length;
    const currentSong = songLibrary[currentSongIndex];
    // refresh
    document.getElementById('song-title').innerText = currentSong.title;
    document.getElementById('artist-name').innerText = `by ${currentSong.artist}`;
    document.getElementById('album-cover').src = currentSong.cover;
}

document.getElementById('next-song').addEventListener('click', playNextSong);

playNextSong(); 


