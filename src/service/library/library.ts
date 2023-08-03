import { CameraRoll, SaveToCameraRollOptions } from "@react-native-camera-roll/camera-roll"

export default abstract class LibraryService {
	static getAlbum() {
		return CameraRoll.getAlbums()
	}
	static async savePhotoAndroid(path: string){
		return await CameraRoll.save(path, this.options)
	}
	static async savePhotoIOS(url: string) {
		return await CameraRoll.save(url, this.options)
	}
	private static options: SaveToCameraRollOptions = {
		album: "ChillPaper",
		type: "photo",
	}
}
