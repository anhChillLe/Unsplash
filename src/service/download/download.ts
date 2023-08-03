import { Linking, Platform } from "react-native"
import { RESULTS } from "react-native-permissions"
import LibraryService from "../library/library"
import { requestLibraryPermissionIOS, requestStoragePermissionAndroid } from "../permission/permission"
import { Photo } from "../unsplash/models"
import DownloadManager from "../../modules/download/download"

/* Static function not suport hot reload */
export default class DownloadService {
	static async savePhoto(photo: Photo) {
		const url = photo.links.download ? photo.links.download : photo.urls.raw

		if (Platform.OS === "android") {
			const result = await requestStoragePermissionAndroid()
			if (result !== RESULTS.GRANTED) return
			DownloadManager.download(url, `${photo.user.username}_${photo.id}_${new Date().toLocaleDateString()}_wallpaper`)
		} else {
			const result = await requestLibraryPermissionIOS()
			if (result !== RESULTS.GRANTED) return
			const res = await LibraryService.savePhotoIOS(url)
		}
	}

	static async downloadOnBrowser(photo: Photo) {
		photo.links.download && Linking.openURL(photo.links.download + "&force=true")
	}
}
