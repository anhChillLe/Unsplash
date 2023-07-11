import {RouteProp} from '@react-navigation/native';
import {ActivityIndicator, Surface} from 'react-native-paper';
import {ScreenName} from '../../navigations/screen_name';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store/store';
import {requestToken} from '../../redux/features/auth/action';
import { AuthParamList } from '../../navigations/param_list';
import { LoadingScreen } from '../../components';

type Props = RouteProp<AuthParamList, ScreenName.loginResult>;
export default function LoginSuccess({route}: {route: Props}) {
  const code = route.params?.code;
  console.log(code)

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(requestToken(code));
  }, []);

  return (
    <LoadingScreen />
  );
}