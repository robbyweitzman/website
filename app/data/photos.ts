export interface Photo {
  id: string
  src: string
  alt: string
  title: string
  camera: string
  film: string
  date: string
  width: number
  height: number
}

export const photos: Photo[] = [
    {
      id: "1",
      src: "/photos/24h Grocery.jpg",
      alt: "24h Grocery",
      title: "24 Hour Grocery",
      camera: "Canon A1",
      film: "Kodak Color Plus",
      date: "September 16, 2024",
      width: 900,
      height: 600,
    },
    {
      id: "2",
      src: "/photos/Daytime Skyline.jpeg",
      alt: "Daytime Skyline",
      title: "Daytime Skyline",
      camera: "Canon A1",
      film: "Kodak UltraMax",
      date: "September 22, 2024",
      width: 900,
      height: 600,
    },
     {
      id: "3",
      src: "/photos/Skyline Sunset.jpeg",
      alt: "Skyline Sunset",
      title: "Skyline Sunset",
      camera: "Canon A1",
      film: "Kodak UltraMax",
      date: "September 22, 2024",
      width: 900,
      height: 600,
    },
    {
      id: "4",
      src: "/photos/Domino Sugar.jpeg",
      alt: "Domino Sugar",
      title: "Domino Sugar",
      camera: "Canon A1",
      film: "Kodak UltraMax",
      date: "September 22, 2024",
      width: 900,
      height: 600,
    },
    {
      id: "5",
      src: "/photos/Mookie 1.jpeg",
      alt: "Mookie in the woods",
      title: "Mookie in the woods",
      camera: "Nikon F4",
      film: "Kodak UltraMax",
      date: "September 14, 2024",
      width: 900,
      height: 600,
    },
    {
      id: "6",
      src: "/photos/Mookie2.jpeg",
      alt: "Mookie in the woods again",
      title: "Mookie in the woods again",
      camera: "Nikon F4",
      film: "Kodak UltraMax",
      date: "September 14, 2024",
      width: 900,
      height: 600,
    },
  ]

