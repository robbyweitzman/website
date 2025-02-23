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
      title: "Wet Sand",
      artist: "Red Hot Chili Peppers",
      album: "Stadium Arcadium",
      releaseDate: "May 5, 2006",
      albumArt: "https://storage.highresaudio.com/library/bild/c_400000/407164/field4.jpg",
      date: "February 22, 2024",
      spotifyUrl: "https://open.spotify.com/track/3L2Nyi3T7XabH8EEZFLDdX",
      appleMusicUrl: "https://music.apple.com/us/song/wet-sand/945569010",
    },
    {
      id: "2",
      title: "DIE TRYING",
      artist: "PARTYNEXTDOOR, Drake, Yebba",
      album: "$OME $EXY $ONGS 4 U",
      releaseDate: "February 14, 2025",
      albumArt: "https://ratedrnb.com/cdn/2025/02/partynextdoor-drake-some-sexy-songs-4-u.jpeg",
      date: "February 21, 2024",
      spotifyUrl: "https://open.spotify.com/track/0NUqi0ps17YpLUC3kgsZq0",
      appleMusicUrl: "https://music.apple.com/us/song/die-trying/1796127376",
    },
    {
      id: "3",
      title: "Señorita",
      artist: "Justin Timberlake",
      album: "Justified",
      releaseDate: "November 5, 2002",
      albumArt: "https://m.media-amazon.com/images/I/71Bt4Mf7upL.jpg",
      date: "February 20, 2024",
      spotifyUrl: "https://open.spotify.com/track/0aj2QKJvz6CePykmlTApiD",
      appleMusicUrl: "https://music.apple.com/us/album/se%C3%B1orita/252606580?i=252606581",
    },
  ]

export const getCurrentSong = () => songs[0]

