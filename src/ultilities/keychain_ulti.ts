import * as Keychain from 'react-native-keychain';

export async function StoreToken(token: string){
  const result = await Keychain.setGenericPassword('unsplash', token)
  console.log('StoreToken: ', result)
  return result
}

export async function GetToken() {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : undefined
}