import {ImageBackground, Linking, Platform, StatusBar} from 'react-native';
import {Button, Surface, Text} from 'react-native-paper';
import {Icons} from '../../assets/icons';
import {Images} from '../../assets/images';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ACCESS_KEY} from '@env';

export default function LoginRequest() {

  if(Platform.OS === 'android'){
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    changeNavigationBarColor('transparent');
  }

  return (
    <Surface mode="flat" style={{flex: 1, height: '100%'}}>
      <ImageBackground
        source={Images.landing}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resizeMode="cover">
        <Button mode="contained" onPress={() => Login()} icon={Icons.unsplash}>
          Login with unsplash
        </Button>
      </ImageBackground>
    </Surface>
  );
}

function Login() {
  const baseUrl = 'https://unsplash.com/oauth/authorize';
  const clientId = `client_id=${ACCESS_KEY}`;
  const redirect = `redirect_uri=unsplash://app/login_success`;
  const responseType = `response_type=code`;
  const scope =
    'scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections';

  const url = `${baseUrl}?${clientId}&${redirect}&${responseType}&${scope}`;
  Linking.openURL(url);
}
