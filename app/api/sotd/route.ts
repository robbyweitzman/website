import { NextRequest, NextResponse } from "next/server"
import { format, parseISO } from "date-fns"

const GITHUB_REPO = "robbyweitzman/website"
const SONGS_FILE_PATH = "app/data/songs.ts"

interface iTunesResult {
  trackName: string
  artistName: string
  collectionName: string
  releaseDate: string
  artworkUrl100: string
  trackViewUrl: string
  wrapperType: string
}

interface OdesliResponse {
  linksByPlatform?: {
    spotify?: {
      url: string
    }
  }
}

function parseAppleMusicUrl(url: string): {
  trackId: string
  type: "track" | "album"
} {
  const parsed = new URL(url)

  if (parsed.hostname !== "music.apple.com") {
    throw new Error("Invalid Apple Music URL")
  }

  // Format A: /album/song-name/ALBUM_ID?i=TRACK_ID (most common from share sheet)
  const trackIdParam = parsed.searchParams.get("i")
  if (trackIdParam) {
    return { trackId: trackIdParam, type: "track" }
  }

  const pathParts = parsed.pathname.split("/").filter(Boolean)
  // pathParts: ['us', 'song', 'song-name', 'TRACK_ID']
  //        or: ['us', 'album', 'album-name', 'ALBUM_ID']

  // Format B: /song/song-name/TRACK_ID
  if (pathParts[1] === "song" && pathParts.length >= 4) {
    return { trackId: pathParts[pathParts.length - 1], type: "track" }
  }

  // Format C: /album/album-name/ALBUM_ID (no track param — use album lookup)
  if (pathParts[1] === "album" && pathParts.length >= 4) {
    return { trackId: pathParts[pathParts.length - 1], type: "album" }
  }

  throw new Error(
    "Could not extract track ID from Apple Music URL. Expected format: https://music.apple.com/.../album/...?i=TRACK_ID"
  )
}

function getHighResArtwork(artworkUrl100: string): string {
  return artworkUrl100.replace("100x100bb", "600x600bb")
}

function formatReleaseDate(isoDate: string): string {
  return format(parseISO(isoDate), "MMMM d, yyyy")
}

function formatTodayDate(): string {
  return format(new Date(), "MMMM d, yyyy")
}

async function fetchItunesMetadata(
  id: string,
  type: "track" | "album"
): Promise<iTunesResult> {
  const url =
    type === "track"
      ? `https://itunes.apple.com/lookup?id=${id}&entity=song`
      : `https://itunes.apple.com/lookup?id=${id}&entity=song`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`iTunes API returned ${response.status}`)
  }

  const data = await response.json()
  const results = data.results as iTunesResult[]

  if (!results || results.length === 0) {
    throw new Error(`No results found in iTunes for ID: ${id}`)
  }

  // For album lookups, the first result is the album — find the first track
  if (type === "album") {
    const track = results.find((r) => r.wrapperType === "track")
    if (!track) {
      throw new Error(`No tracks found in album: ${id}`)
    }
    return track
  }

  // For track lookups, find the track result (first result may be the collection)
  const track = results.find((r) => r.wrapperType === "track") || results[0]
  return track
}

async function fetchSpotifyUrl(appleMusicUrl: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(appleMusicUrl)}&userCountry=US`
    )
    if (!response.ok) {
      console.warn(`Odesli API returned ${response.status}`)
      return ""
    }

    const data = (await response.json()) as OdesliResponse
    return data.linksByPlatform?.spotify?.url || ""
  } catch (error) {
    console.warn("Failed to fetch Spotify URL from Odesli:", error)
    return ""
  }
}

function buildSongEntry(song: {
  title: string
  artist: string
  album: string
  releaseDate: string
  albumArt: string
  date: string
  spotifyUrl: string
  appleMusicUrl: string
}): string {
  return `  {
    title: ${JSON.stringify(song.title)},
    artist: ${JSON.stringify(song.artist)},
    album: ${JSON.stringify(song.album)},
    releaseDate: "${song.releaseDate}",
    albumArt: "${song.albumArt}",
    date: "${song.date}",
    spotifyUrl: "${song.spotifyUrl}",
    appleMusicUrl: "${song.appleMusicUrl}",
  },`
}

async function commitToGithub(
  songEntry: string,
  title: string,
  artist: string,
  appleMusicUrl: string
): Promise<void> {
  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    throw new Error("GITHUB_TOKEN not configured")
  }

  // Fetch current file
  const getResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${SONGS_FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )

  if (!getResponse.ok) {
    throw new Error(`Failed to fetch songs.ts from GitHub: ${getResponse.status}`)
  }

  const fileData = await getResponse.json()
  const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8")
  const sha = fileData.sha

  // Check for duplicates
  if (currentContent.includes(appleMusicUrl)) {
    throw new Error("DUPLICATE: This song has already been added as SOTD")
  }

  // Insert new entry at the top of the array
  const insertionMarker = "export const songs: Song[] = [\n"
  const insertIndex = currentContent.indexOf(insertionMarker)
  if (insertIndex === -1) {
    throw new Error("Could not find insertion point in songs.ts")
  }

  const insertPosition = insertIndex + insertionMarker.length
  const newContent =
    currentContent.slice(0, insertPosition) +
    songEntry +
    "\n" +
    currentContent.slice(insertPosition)

  // Commit the updated file
  const putResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${SONGS_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add SOTD: ${title} by ${artist}`,
        content: Buffer.from(newContent).toString("base64"),
        sha,
        branch: "main",
      }),
    }
  )

  if (!putResponse.ok) {
    const error = await putResponse.json()
    throw new Error(
      `Failed to commit to GitHub: ${putResponse.status} - ${error.message || JSON.stringify(error)}`
    )
  }
}

export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.SOTD_API_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { appleMusicUrl, date } = body as {
      appleMusicUrl?: string
      date?: string
    }

    if (!appleMusicUrl) {
      return NextResponse.json(
        { error: "appleMusicUrl is required" },
        { status: 400 }
      )
    }

    // Parse the Apple Music URL
    const { trackId, type } = parseAppleMusicUrl(appleMusicUrl)

    // Fetch metadata from iTunes and Spotify URL from Odesli in parallel
    const [itunesData, spotifyUrl] = await Promise.all([
      fetchItunesMetadata(trackId, type),
      fetchSpotifyUrl(appleMusicUrl),
    ])

    const songData = {
      title: itunesData.trackName,
      artist: itunesData.artistName,
      album: itunesData.collectionName,
      releaseDate: formatReleaseDate(itunesData.releaseDate),
      albumArt: getHighResArtwork(itunesData.artworkUrl100),
      date: date || formatTodayDate(),
      spotifyUrl,
      appleMusicUrl,
    }

    // Build the song entry and commit to GitHub
    const songEntry = buildSongEntry(songData)
    await commitToGithub(
      songEntry,
      songData.title,
      songData.artist,
      appleMusicUrl
    )

    return NextResponse.json({
      success: true,
      song: songData,
      message: `Added "${songData.title}" by ${songData.artist} as SOTD for ${songData.date}`,
      spotifyFound: !!spotifyUrl,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"

    if (message.startsWith("DUPLICATE:")) {
      return NextResponse.json(
        { error: message.replace("DUPLICATE: ", "") },
        { status: 409 }
      )
    }

    console.error("SOTD API error:", error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
