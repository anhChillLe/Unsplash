import {Dimensions, ScrollView, View} from 'react-native';
import {Photo} from '../../services/api/type';
import {
  GroupHeading,
  ImageCard,
  ListAlbums,
  StatGroup,
  UserElement,
} from '../../components';
import {Card, Chip, DataTable, Text} from 'react-native-paper';
import {PhotoDetailViewModel, getPhotoViewModel} from './photoViewModel';
import {useContext, useEffect} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';
import {Full} from 'unsplash-js/dist/methods/photos/types';

export default function PageContainer({photo}: {photo: Photo}) {
  const viewModel = getPhotoViewModel(photo);
  return <Page {...viewModel} />;
}

function Page({
  isLoading,
  photo,
  stats,
  getStat,
  getDetail,
  fullPhoto,
}: PhotoDetailViewModel) {
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    getStat();
    getDetail();
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
        <Chip
          style={{backgroundColor: 'transparent'}}
          textStyle={{fontSize: 12}}
          compact={true}
          icon="cards-heart-outline">
          {photo.likes.shorten()} likes
        </Chip>

        <Chip
          style={{backgroundColor: 'transparent'}}
          textStyle={{fontSize: 12}}
          compact={true}
          icon="eye">
          {stats.views.total.shorten()} views
        </Chip>

        <Chip
          style={{backgroundColor: 'transparent'}}
          textStyle={{fontSize: 12}}
          compact={true}
          icon="download-circle">
          {stats.downloads.total.shorten()} downloads
        </Chip>
      </View>
      <MoreInfo fullPhoto={fullPhoto} />
    </ScrollView>
  );
}

function MoreInfo({fullPhoto}: {fullPhoto: Full | undefined}) {
  if (!fullPhoto) return null;
  const {width} = Dimensions.get('window');
  const navigation = useContext(NavigationContext);

  const {
    exif: {make, model, exposure_time, aperture, focal_length, iso},
  } = fullPhoto;

  return (
    <View style={{paddingHorizontal: 8}}>
      <Card style={{marginBottom: 16}}>
        <DataTable style={{width: '100%'}}>
          <DataTable.Row>
            <DataTable.Title>Make</DataTable.Title>
            <DataTable.Cell>{make ? make : 'unknown'}</DataTable.Cell>
            <DataTable.Title>Model</DataTable.Title>
            <DataTable.Cell>{model ? make : 'unknown'}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Title>Exposure</DataTable.Title>
            <DataTable.Cell>
              {exposure_time ? exposure_time : 'unknown'}
            </DataTable.Cell>
            <DataTable.Title>Aperture</DataTable.Title>
            <DataTable.Cell>{aperture ? aperture : 'unknown'}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Title>Focal</DataTable.Title>
            <DataTable.Cell>
              {focal_length ? focal_length : 'unknown'}
            </DataTable.Cell>
            <DataTable.Title>Iso</DataTable.Title>
            <DataTable.Cell>{iso ? iso : 'unknown'}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card>
      <ListAlbums
        data={fullPhoto.related_collections.results}
        column={1}
        space={8}
        width={width - 16}
        mode="compact"
        itemMode="group"
        onItemPress={item =>
          navigation?.navigate(ScreenName.collectionPhotos, {collection: item})
        }
      />
    </View>
  );
}
