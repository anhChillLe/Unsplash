import * as Permission from 'react-native-permissions'

async function requestToragePermissionAndroid() {
  const result = await Permission.request(Permission.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
  return result
}

export default requestToragePermissionAndroid