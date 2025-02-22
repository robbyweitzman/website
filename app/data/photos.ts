export interface Photo {
  id: string
  src: string
  alt: string
  title: string
  camera: string
  film: string
  date: string
}

export const photos: Photo[] = [
  {
    id: "1",
    src: "https://placehold.co/300x400",
    alt: "Urban landscape",
    title: "City Streets",
    camera: "Leica M6",
    film: "Kodak Portra 400",
    date: "January 2024",
  },
  {
    id: "2",
    src: "https://placehold.co/300x400",
    alt: "Nature scene",
    title: "Forest Path",
    camera: "Leica M6",
    film: "Ilford HP5+",
    date: "February 2024",
  },
]

