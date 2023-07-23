import { Linking, Platform } from "react-native"
import ReactNativeBlobUtil, { FetchBlobResponse, ReactNativeBlobUtilConfig } from "react-native-blob-util"
import { RESULTS } from "react-native-permissions"
import { requestToragePermissionAndroid, requestLibraryPermissionIOS } from "../permission/permission"
import { Photo } from "../unsplash/models"
const { config, fs } = ReactNativeBlobUtil

export default abstract class DownloadService {
	static async downloadPhoto(photo: Photo, onCompleted?: (res: FetchBlobResponse) => void) {
		
		if (Platform.OS === "android") {
			const result = await requestToragePermissionAndroid()
			if (result !== RESULTS.GRANTED) return
			const res = await this.downloadAndroid(photo.links.download ? photo.links.download : photo.urls.raw)
			ReactNativeBlobUtil.fs.scanFile([{ path: res.path() }])
			onCompleted && onCompleted(res)
		} else {
			const result = await requestLibraryPermissionIOS()
			if (result !== RESULTS.GRANTED) return
			const res = await this.downloadIOS(photo.links.download ? photo.links.download : photo.urls.raw)
			const destPath = fs.dirs.PictureDir + '/image.jpg';
			await fs.cp(res.path(), destPath);
			fs.scanFile([{ path: destPath }]);
			onCompleted && onCompleted(res)
		}
	}

	static async downloadOnBrowser(photo: Photo) {
		photo.links.download && Linking.openURL(photo.links.download + "&force=true")
	}

	/* 
		Changing config need reinstall to working
	*/
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

const iosDir = {
	ApplicationSupportDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Library/Application Support",
	CacheDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Library/Caches",
	DCIMDir: "",
	DocumentDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Documents",
	DownloadDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Downloads",
	LibraryDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Library",
	MainBundleDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Bundle/Application/D5CB64DB-FBE0-475A-BC3B-9CBEBF911807/UnsplashApp.app",
	MovieDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Movies",
	MusicDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Music",
	PictureDir:
		"/Users/BAP/Library/Developer/CoreSimulator/Devices/E700D1D9-7DE1-4D7B-80E9-044D9D2D714B/data/Containers/Data/Application/58524C74-F153-48AA-BB42-7A2F11E96E23/Pictures",
}
