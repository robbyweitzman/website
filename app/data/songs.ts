export interface Song {
  id: string
  title: string
  artist: string
  album: string
  releaseDate: string
  albumArt: string
  date: string
  spotifyUrl: string
  appleMusicUrl: string
}

export const songs: Song[] = [
  {
      id: "1",
      title: "Rock With You",
      artist: "Michael Jackson",
      album: "Off the Wall",
      releaseDate: "July 10, 1979",
      albumArt: "https://m.media-amazon.com/images/I/812EgYpATnL._UF1000,1000_QL80_.jpg",
      date: "February 24, 2025",
      spotifyUrl: "https://open.spotify.com/track/7oOOI85fVQvVnK5ynNMdW7?si=425e76b863294631",
      appleMusicUrl: "https://music.apple.com/us/album/rock-with-you/186166282?i=186166358",
    },
  {
      id: "2",
      title: "Blue Sky",
      artist: "The Allman Brothers Band",
      album: "Eat a Peach",
      releaseDate: "February 12, 1972",
      albumArt: "https://m.media-amazon.com/images/I/71bF-Z3JNCL._UF1000,1000_QL80_.jpg",
      date: "February 23, 2025",
      spotifyUrl: "https://open.spotify.com/track/6iX1QW1gGIVNEItnqyvFfH",
      appleMusicUrl: "https://music.apple.com/us/album/blue-sky/1469584912?i=1469585646",
    },
  {
      id: "3",
      title: "Wet Sand",
      artist: "Red Hot Chili Peppers",
      album: "Stadium Arcadium",
      releaseDate: "May 5, 2006",
      albumArt: "https://storage.highresaudio.com/library/bild/c_400000/407164/field4.jpg",
      date: "February 22, 2025",
      spotifyUrl: "https://open.spotify.com/track/3L2Nyi3T7XabH8EEZFLDdX",
      appleMusicUrl: "https://music.apple.com/us/song/wet-sand/945569010",
    },
    {
      id: "4",
      title: "DIE TRYING",
      artist: "PARTYNEXTDOOR, Drake, Yebba",
      album: "$OME $EXY $ONGS 4 U",
      releaseDate: "February 14, 2025",
      albumArt: "https://ratedrnb.com/cdn/2025/02/partynextdoor-drake-some-sexy-songs-4-u.jpeg",
      date: "February 21, 2025",
      spotifyUrl: "https://open.spotify.com/track/0NUqi0ps17YpLUC3kgsZq0",
      appleMusicUrl: "https://music.apple.com/us/song/die-trying/1796127376",
    },
    {
      id: "5",
      title: "Señorita",
      artist: "Justin Timberlake",
      album: "Justified",
      releaseDate: "November 5, 2002",
      albumArt: "https://m.media-amazon.com/images/I/71Bt4Mf7upL.jpg",
      date: "February 20, 2025",
      spotifyUrl: "https://open.spotify.com/track/0aj2QKJvz6CePykmlTApiD",
      appleMusicUrl: "https://music.apple.com/us/album/se%C3%B1orita/252606580?i=252606581",
    },
  {
      id: "6",
      title: "Teach Me How To Touch Me (KC Gilmore Remix)",
      artist: "Soane, KC Gilmore",
      album: "Teach Me How To Touch Me (KC Gilmore Remix) - Single",
      releaseDate: "February 28, 2020",
      albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/bf/eb/df/bfebdfbf-ac5a-a099-ca2b-8669af6554ce/cover.jpg/592x592bb.webp",
      date: "February 19, 2025",
      spotifyUrl: "https://open.spotify.com/track/5vaYVFncJFiu6D508YKUSO",
      appleMusicUrl: "https://music.apple.com/us/album/teach-me-how-to-touch-me-kc-gilmore-remix-single/1515596988",
    },
  ]

export const getCurrentSong = () => songs[0]

