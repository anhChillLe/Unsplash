import { Linking, Platform } from "react-native"
import ReactNativeBlobUtil, { FetchBlobResponse, ReactNativeBlobUtilConfig } from "react-native-blob-util"
import { RESULTS } from "react-native-permissions"
import LibraryService from "../library/library"
import { requestLibraryPermissionIOS, requestToragePermissionAndroid } from "../permission/permission"
import { Photo } from "../unsplash/models"
import WallpaperManager from "../../modules/wallpaper/wallpaper"
const { config, fs } = ReactNativeBlobUtil

/* Static function not suport hot reload */
export default class DownloadService {
	static async savePhoto(photo: Photo, onCompleted?: (res: FetchBlobResponse) => void) {
		const url = photo.links.download ? photo.links.download : photo.urls.raw
		
		if (Platform.OS === "android") {
			const result = await requestToragePermissionAndroid()
			if (result !== RESULTS.GRANTED) return
			const res = await this.downloadAndroid(url)
			ReactNativeBlobUtil.fs.scanFile([{ path: res.path() }])
			LibraryService.savePhotoAndroid(res.path())
			onCompleted && onCompleted(res)
		} else {
			const result = await requestLibraryPermissionIOS()
			if (result !== RESULTS.GRANTED) return
			const res = await LibraryService.savePhotoIOS(url)
			console.log(res)
		}
	}

	static async downloadOnBrowser(photo: Photo) {
		photo.links.download && Linking.openURL(photo.links.download + "&force=true")
	}

	private static async downloadAndroid(url: string) {
		const filename = new Date().getTime() + ".jpg"
		const path = fs.dirs.LegacyPictureDir + "/ChillPaper/" + filename

		const downloadConfig: ReactNativeBlobUtilConfig = {
			addAndroidDownloads: {
				notification: true,
				mediaScannable: true,
				useDownloadManager: true,
				title: "ChillPaper",
				description: "Downloading image",
				path,
			},
			fileCache: true,
			path,
		}

		const res = await config(downloadConfig).fetch("GET", url)
		console.log("Download successfull at: ", res.path())
		return res
	}

	private static async downloadIOS(url: string) {
		const filename = new Date().getTime() + ".jpg"
		const path = fs.dirs.PictureDir + "/ChillPaper/" + filename

		const downloadConfig: ReactNativeBlobUtilConfig = {
			fileCache: true,
			path,
		}

		const res = await config(downloadConfig).fetch("GET", url)
		console.log("Download successfull at: ", res.path())
		return res
	}
}