import { Linking, Platform } from "react-native"
import ReactNativeBlobUtil, { FetchBlobResponse, ReactNativeBlobUtilConfig } from "react-native-blob-util"
import { RESULTS } from "react-native-permissions"
import requestToragePermissionAndroid from "../permission/permission"
import { Photo } from "../unsplash/models"
const { config, fs } = ReactNativeBlobUtil

export default abstract class DownloadService {
	static async downloadPhoto(photo: Photo, onCompleted?: (res: FetchBlobResponse) => void) {
		if (Platform.OS === "android") {
			const result = await requestToragePermissionAndroid()
			if (result !== RESULTS.GRANTED) return
			const res = await this.download(photo.links.download ? photo.links.download : photo.urls.raw)
			onCompleted && onCompleted(res)
		}
	}

	static async downloadOnBrowser(photo: Photo) {
		photo.links.download && Linking.openURL(photo.links.download + "&force=true")
	}

	/* 
		Changing config need reinstall to working
	*/
	private static async download(url: string) {
		const filename = new Date().getTime() + ".jpg"
		const path = fs.dirs.LegacyPictureDir + "/ChillPaper/" + filename

		const downloadConfig : ReactNativeBlobUtilConfig = {
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
}

// LegacySDCardDir: "/storage/emulated/0",

// LegacyDCIMDir: "/storage/emulated/0/DCIM",
// LegacyDownloadDir: "/storage/emulated/0/Download",
// LegacyMovieDir: "/storage/emulated/0/Movies",
// LegacyMusicDir: "/storage/emulated/0/Music",
// LegacyPictureDir: "/storage/emulated/0/Pictures",

// MovieDir: "/storage/emulated/0/Android/data/com.bap.unsplash/files/Movies",
// MusicDir: "/storage/emulated/0/Android/data/com.bap.unsplash/files/Music",
// PictureDir: "/storage/emulated/0/Android/data/com.bap.unsplash/files/Pictures",
// SDCardApplicationDir: "/storage/emulated/0/Android/data/com.bap.unsplash",
// SDCardDir: "/storage/emulated/0/Android/data/com.bap.unsplash/files",
// DCIMDir: "/storage/emulated/0/Android/data/com.bap.unsplash/files/DCIM",
// DownloadDir: "/storage/emulated/0/Android/data/com.bap.unsplash/files/Download",
