import { Share } from "react-native"
import { Photo } from "../unsplash/models"

async function shareLink(photo: Photo){
  const response = Share.share({
    title: 'Share image to',
    message: `${photo.urls.raw}`,
    url: photo.urls.raw,
  }, {
    dialogTitle: `Share image to`
  })
}


export { shareLink }

