import { Linking, Platform } from "react-native"
import { RESULTS } from "react-native-permissions"
import requestToragePermissionAndroid from "./permission"
import { Photo } from "../unsplash/models"

import ReactNativeBlobUtil from "react-native-blob-util"

async function downloadImage(photo: Photo) {
	if (Platform.OS === "android") {
		const result = await requestToragePermissionAndroid()
		if (result === RESULTS.GRANTED) {
			download(photo.links.download ? photo.links.download : photo.urls.raw)
		}
	}
}

async function downloadOnBrowser(photo: Photo) {
	photo.links.download && Linking.openURL(photo.links.download + "&force=true")
}

function download(url: string) {
	const filename = new Date().getTime() + ".jpg"

	const { config, fs } = ReactNativeBlobUtil

	config({
		path: fs.dirs.DCIMDir + "/ChillPaper/" + filename,
	})
		.fetch("GET", url)
		.then((res) => {
			ReactNativeBlobUtil.fs.scanFile([{ path: res.path() }])
			console.log(res.path())
		})
		.then(() => {
			// scan file success
		})
		.catch((err) => {
			console.log(err)
		})
}

export { downloadImage, downloadOnBrowser }
