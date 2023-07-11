import {
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Icons} from '../../assets/images/icons';
import {Images} from '../../assets/images';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {LoginWidthUnsplash} from '../../actions/link_actions';
import { useContext } from 'react';
import { NavigationContext } from '@react-navigation/native';

export default function LandingPage() {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
    changeNavigationBarColor('transparent');
  }

  const navigation = useContext(NavigationContext)
  const openApp = () => {
    // navigation?.navigate(ScreenName.main)
    // console.log('Open app')
  }

  return (
    <ImageBackground
      source={Images.landing2}
      style={{
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 96,
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'flex-start'}}>
        <Text
          variant="displayMedium"
          style={[
            styles.heading,
            {
              fontWeight: 'bold',
              color: 'white',
            },
          ]}>
          Chill Paper
        </Text>
        <Text
          variant="headlineSmall"
          style={[
            styles.heading,
            {
              fontWeight: '500',
              marginTop: 8,
            },
          ]}>
          Wallpaper app base on Unsplash API
        </Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Button
          mode ="contained"
          rippleColor='transparent'
          onPress={openApp}
          theme={{roundness: 2}}
          style={{paddingVertical: 8}}
          labelStyle={{fontSize: 16}}>
          Maybe laster
        </Button>
        <Button
          mode="contained"
          onPress={LoginWidthUnsplash}
          icon={Icons.unsplash}
          theme={{roundness: 2}}
          rippleColor='transparent'
          style={{marginTop: 16, paddingVertical: 8}}
          labelStyle={{fontSize: 16}}>
          Login with Unsplash
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 8,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
