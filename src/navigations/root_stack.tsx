import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import AuthStack from './auth_stack';
import {ScreenName} from './screen_name';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store/store';
import {ActivityIndicator, Surface} from 'react-native-paper';
import AppStack from './app_stack';
import { useEffect } from 'react';
import { getToken } from '../redux/features/auth/action';
import { AppParamList, AuthParamList } from './param_list';

export default function RootStack() {
  const state = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getToken())
  }, [])

  if (state.isGettingToken) {
    return (
      <Surface
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </Surface>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      {state.token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const linking: LinkingOptions<AuthParamList> = {
  prefixes: ['unsplash://app'],
  config: {
    screens: {
      [ScreenName.login]: 'login_request',
      [ScreenName.loginResult]: 'login_success',
    },
  },
};
