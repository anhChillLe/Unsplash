import {useContext, useEffect} from 'react';
import getUserPhotosViewModel, {
  UserPhotosViewModel,
} from '../../viewmodels/user_photos_viewmode';
import {Surface} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {BackAppBar, ListImageLite, UserElement} from '../../components';
import {Dimensions} from 'react-native';
import {AppParamList} from '../../navigations/param_list';
import {ScreenName} from '../../navigations/screen_name';

type RouteProps = {route: RouteProp<AppParamList, ScreenName.userPhotos>};
export default function UserPhotoPage({route}: RouteProps) {
  const user = route.params.user;
  const viewModel = getUserPhotosViewModel(user);

  return <UserPhotos {...viewModel} />;
}

function UserPhotos({
  isLoading,
  user,
  photos,
  getPhotos,
  loadMore,
}: UserPhotosViewModel) {
  const inset = useSafeAreaInsets();
  const {width} = Dimensions.get('window');
  const navigation = useContext(NavigationContext);
  const contentWidth = width - 16;

  const {profile_image, name, username} = user

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <Surface
      style={{
        flex: 1,
        height: '100%',
        paddingBottom: inset.bottom,
        paddingTop: inset.top,
      }}>
      <BackAppBar />
      <ListImageLite
        width={contentWidth}
        space={4}
        header={<UserElement size='large' profile_image={profile_image} name={name} username={username} />}
        photos={photos}
        column={3}
        onEndReached={loadMore}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      />
    </Surface>
  );
}
