import {ScrollView, View} from 'react-native';
import {Photo} from '../../services/api/type';
import {ImageCard, UserElement} from '../../components';
import {Text} from 'react-native-paper';
import {PhotoDetailViewModel, getPhotoViewModel} from './photoViewModel';
import {useContext, useEffect} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';

export default function PageContainer({photo}: {photo: Photo}) {
  const viewModel = getPhotoViewModel(photo);

  return <Page {...viewModel} />;
}

function Page({isLoading, photo, stats, getPhotoDetail}: PhotoDetailViewModel) {
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    getPhotoDetail();
  }, []);

  if (!stats) return;

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <UserElement
        user={photo.user}
        avatarSize={48}
        quality="large"
        style={{
          padding: 8,
        }}
        onPress={() =>
          navigation?.navigate(ScreenName.user, {username: photo.user.username})
        }
      />
      {photo.description ? (
        <Text style={{padding: 8}}>{photo.description}</Text>
      ) : null}

      <ImageCard
        roundness={0}
        mode="contained"
        photo={photo}
        placeHolderMode="blurhash"
        width="full"
        height="auto"
        quality="auto"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 8,
        }}>
        <Text>{photo.likes} likes</Text>
        <Text>{stats.views.total} views</Text>
        <Text>{stats.downloads.total} downloads</Text>
      </View>
    </ScrollView>
  );
}
