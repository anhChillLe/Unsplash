import { Share } from "react-native"
import { Photo } from "../unsplash/models"

export default abstract class ShareService {
  static async sharePhotoLink(photo: Photo){
    const response = Share.share({
      title: 'Share image to',
      message: `${photo.urls.raw}`,
      url: photo.urls.raw,
    }, {
      dialogTitle: `Share image to`
    })
  }
}

