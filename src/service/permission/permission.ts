import * as Permission from 'react-native-permissions'

async function requestToragePermissionAndroid() {
  const permission = Permission.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  const isAvailable = await Permission.check(permission)
  if(isAvailable === Permission.RESULTS.GRANTED) return isAvailable
  const result = await Permission.request(permission)
  return result
}

async function requestLibraryPermissionIOS() {
  const permission = Permission.PERMISSIONS.IOS.PHOTO_LIBRARY
  const isAvailable = await Permission.check(permission)
  if(isAvailable === Permission.RESULTS.GRANTED) return isAvailable
  const result = await Permission.request(permission)
  return result
}

export {requestToragePermissionAndroid, requestLibraryPermissionIOS}