import { NativeModules } from "react-native"
const { WallpaperModule: WallpaperManager } = NativeModules

export default WallpaperManager as WallpaperManager

interface WallpaperManager {
  setWallpaper(uri: string): void
  setWallpaperFromStream(url: string): void
  toast(message: string): void
}