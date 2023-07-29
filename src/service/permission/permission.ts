import * as Permission from 'react-native-permissions'

/* Fix No Permission Handler Detected on IOS
  npx react-native setup-ios-permissions && npx pod-install 
  or yarn setup-permission
  => clear DeliveredData (if needed) => run app
*/

async function requestStoragePermissionAndroid() {
  const permission = Permission.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  const status = await Permission.check(permission)
  if(status === Permission.RESULTS.GRANTED) return status
  const result = await Permission.request(permission)
  return result
}

async function requestLibraryPermissionIOS() {
  const permission = Permission.PERMISSIONS.IOS.PHOTO_LIBRARY
  const status = await Permission.check(permission)
  if(status === Permission.RESULTS.GRANTED) return status
  const result = await Permission.request(permission)
  return result
}

export {requestStoragePermissionAndroid, requestLibraryPermissionIOS}