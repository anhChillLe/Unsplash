import { Linking, Platform } from "react-native"
import ReactNativeBlobUtil, { FetchBlobResponse, ReactNativeBlobUtilConfig } from "react-native-blob-util"
import { RESULTS } from "react-native-permissions"
import LibraryService from "../library/library"
import { requestLibraryPermissionIOS, requestToragePermissionAndroid } from "../permission/permission"
import { Photo } from "../unsplash/models"
const { config, fs } = ReactNativeBlobUtil

/* Static function not suport hot reload */
export default abstract class DownloadService {
	static async downloadPhoto(photo: Photo, onCompleted?: (res: FetchBlobResponse) => void) {
		const url = photo.links.download ? photo.links.download : photo.urls.raw
		if (Platform.OS === "android") {
			const result = await requestToragePermissionAndroid()
			if (result !== RESULTS.GRANTED) return
			const res = await this.downloadAndroid(url)
			ReactNativeBlobUtil.fs.scanFile([{ path: res.path() }])
			onCompleted && onCompleted(res)
		} else {
			const result = await requestLibraryPermissionIOS()
			console.log(result)
			if (result !== RESULTS.GRANTED) return
			// const res = await this.downloadIOS(photo.links.download ? photo.links.download : photo.urls.raw)
			// const destPath = fs.dirs.PictureDir + '/image.jpg';
			// await fs.cp(res.path(), destPath);
			// fs.scanFile([{ path: destPath }]);
			// onCompleted && onCompleted(res)
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

/*  
	Download workflow
	Android: Check StoragePermission => Download with rn blob util => Save image to lib with rn cameraroll
	IOS: Check LibraryPermission => Save image to lib with rn cameraroll
*/