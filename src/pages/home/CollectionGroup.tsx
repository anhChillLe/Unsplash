import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {GroupHeading, ListAlbums} from '../../components';
import {ScreenName} from '../../navigations/screen_name';

export default function CollectionGroup({width}: {width: number}) {
  const collectionsState = useSelector((state: RootState) => state.collection);
  const navigation = useContext(NavigationContext);

  return (
    <>
      <GroupHeading
        containerStyle={{marginTop: 32}}
        onMorePress={() => navigation?.navigate(ScreenName.collections)}>
        Hot collections
      </GroupHeading>
      <ListAlbums
        data={collectionsState.collections}
        column={2}
        space={8}
        maxItems={4}
        itemRatio={2}
        isLoading={collectionsState.isLoadingCollections}
        mode="compact"
        width={width}
        onItemPress={item => {
          navigation?.navigate(ScreenName.collectionPhotos, {collection: item});
        }}
        style={{
          marginTop: 12,
        }}
      />
    </>
  );
}
