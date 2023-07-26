import * as Permission from 'react-native-permissions'

/* Fix No Permission Handler Detected on IOS
  npx react-native setup-ios-permissions && npx pod-install 
  or yarn setup-permission
  => clear DeliveredData (if needed) => run app
*/

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