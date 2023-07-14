import {useContext} from 'react';
import {NavigationContext} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {GroupHeading, HorizontalImageList} from '../../components';
import {ScreenName} from '../../navigations/screen_name';

export default function PhotoGroup() {
  const navigation = useContext(NavigationContext);
  const photosState = useSelector((state: RootState) => state.photoPopular);
  return (
    <>
      <GroupHeading
        containerStyle={{marginTop: 32}}
        onMorePress={() => navigation?.navigate(ScreenName.allImage)}>
        Top of the week
      </GroupHeading>
      <HorizontalImageList
        data={photosState.photos}
        itemWidth={135}
        itemHeight={240}
        space={16}
        maxItem={6}
        isLoading={photosState.isLoading}
        containerStyle={{
          marginTop: 12,
        }}
        onItemPress={photo => navigation?.navigate(ScreenName.detail, {photo})}
      />
    </>
  );
}
