import { NativeModules } from "react-native"
const { DownloadModule: DownloadManager } = NativeModules

export default DownloadManager as DownloadManager

interface DownloadManager {
  downloadWithService(url: string): void
  //Return download id
  download(url: string, name?: string): number
}