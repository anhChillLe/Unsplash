import { RouteProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingScreen } from '../../components';
import { AuthParamList } from '../../navigations/param_list';
import { ScreenName } from '../../navigations/screen_name';
import { requestToken } from '../../redux/features/auth/action';
import { AppDispatch } from '../../redux/store/store';

type Props = RouteProp<AuthParamList, ScreenName.loginResult>;
export default function RequestToken({route}: {route: Props}) {
  const code = route.params?.code;
  console.log('code: ', code)

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(requestToken(code));
  }, []);

  return (
    <LoadingScreen />
  );
}