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
    title: "Test Song 1",
    artist: "Artist Name 1",
    album: "Album Name 1",
    releaseDate: "2024",
    albumArt: "https://placehold.co/400x400",
    date: "February 20, 2024",
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
  },
  {
    id: "2",
    title: "Song Title 2",
    artist: "Artist Name 2",
    album: "Album Name 2",
    releaseDate: "2023",
    albumArt: "https://placehold.co/400x400",
    date: "February 19, 2024",
    spotifyUrl: "https://open.spotify.com",
    appleMusicUrl: "https://music.apple.com",
  },
]

export const getCurrentSong = () => songs[0]

