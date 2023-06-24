import {Dimensions, ScrollView, View} from 'react-native';
import {Text, Searchbar} from 'react-native-paper';
import {photos} from '../../services/sampleData/photos';
import {GroupHeading, HorizontalImageList, ListAlbums} from '../../components';
import {topics} from '../../services/sampleData/topics';
import {collections} from '../../services/sampleData/collections';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {width, height} = Dimensions.get('window');
  const {top, bottom, left, right} = useSafeAreaInsets();

  const paddingLeft = left > 0 ? left : 16 + left;
  const paddingRight = right > 0 ? right : 16 + right;
  const paddingTop = top;
  const paddingBottom = bottom;
  const safeAreaWidth = width - paddingLeft - paddingRight;

  return (
    <SafeAreaView
      style={{flex: 1, paddingTop, paddingLeft, paddingRight}}
      edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom
        }}>
        <Text
          variant="displayLarge"
          style={{fontWeight: '500', marginVertical: 16}}>
          Home
        </Text>
        <Searchbar mode="bar" placeholder="Search for image" value={''} />
        <GroupHeading containerStyle={{marginTop: 32}} onMorePress={() => {}}>
          Top of the week
        </GroupHeading>
        <HorizontalImageList
          data={photos}
          itemWidth={135}
          itemHeight={240}
          space={16}
          containerStyle={{
            marginTop: 12,
            paddingBottom: 4,
          }}
        />
        <GroupHeading containerStyle={{marginTop: 32}} onMorePress={() => {}}>
          Hot topics
        </GroupHeading>
        <ListAlbums
          data={topics}
          column={2}
          space={8}
          maxItems={4}
          width={safeAreaWidth}
          containerStyle={{
            marginTop: 12,
          }}
        />
        <GroupHeading containerStyle={{marginTop: 32}} onMorePress={() => {}}>
          Hot collections
        </GroupHeading>
        <ListAlbums
          data={collections}
          column={2}
          space={8}
          maxItems={4}
          itemRatio={2}
          width={safeAreaWidth}
          containerStyle={{
            marginTop: 12,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
