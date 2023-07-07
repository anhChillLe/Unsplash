import {RouteProp} from '@react-navigation/native';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {ScreenName} from '../../navigations/screen_name';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/store';
import {requestToken} from '../../redux/features/auth/action';
import { RootParamList } from '../../navigations/param_list';

type Props = RouteProp<RootParamList, ScreenName.loginResult>;
export default function LoginSuccess({route}: {route: Props}) {
  const code = route.params?.code;
  console.log(code)

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(requestToken(code));
  }, []);

  return (
    <Surface
      mode="flat"
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
type Params = {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  code: string;
  grant_type: string;
};
