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
    title: "Are You What You Want to Be?",
    artist: "Foster the People",
    album: "Supermodel",
    releaseDate: "March 14, 2024",
    albumArt: "https://m.media-amazon.com/images/I/71v8dy5R4BL.jpg",
    date: "February 26, 2025",
    spotifyUrl: "https://open.spotify.com/track/3CVPyuuD6HxWXgPbbGqbg6",
    appleMusicUrl: "https://music.apple.com/us/album/are-you-what-you-want-to-be/793285794?i=793286896",
  },
  {
    id: "2",
    title: "Me & U",
    artist: "Tems",
    album: "Me & U - Single",
    releaseDate: "October 5, 2023",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Video116/v4/1f/3f/1c/1f3f1c05-2c33-724c-a76c-3691a53ee737/Jobf33e67e4-77ef-4be0-84bd-f116231a4adc-157017799-PreviewImage_Preview_Image_Intermediate_nonvideo_sdr_301392199_1579433950-Time1697039042989.png/632x632bb.webp",
    date: "February 25, 2025",
    spotifyUrl: "https://open.spotify.com/track/4nFrcGM7MY1mpoQCC7Kefj",
    appleMusicUrl: "https://music.apple.com/us/album/me-u-single/1710052036",
  },
  {
      id: "3",
      title: "Workin' Day and Night",
      artist: "Michael Jackson",
      album: "Off the Wall",
      releaseDate: "July 10, 1979",
      albumArt: "https://m.media-amazon.com/images/I/812EgYpATnL._UF1000,1000_QL80_.jpg",
      date: "February 24, 2025",
      spotifyUrl: "https://open.spotify.com/track/6BdiFsPMPkSEEO4fFXFVWX?si=c16643a975664ceb",
      appleMusicUrl: "https://music.apple.com/us/album/workin-day-and-night/186166282?i=186166410",
    },
  {
      id: "4",
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
      id: "5",
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
      id: "6",
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
      id: "7",
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
      id: "8",
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

