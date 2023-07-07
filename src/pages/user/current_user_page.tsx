import {Chip, Surface, Text} from 'react-native-paper';
import {
  BackAppBar,
  CollectionCard,
  GroupHeading,
  ImageGrid,
  LoadingScreen,
  SingleTag,
  StatGroup,
  TagGroup,
} from '../../components';
import {Linking, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {
  openInstagramProfile,
  openTwitterProfile,
} from '../../actions/link_actions';

export default function CurrentUserPage() {
  const inset = useSafeAreaInsets();
  const profile = useSelector((state: RootState) => state.user.profile);
  if (!profile) return <LoadingScreen />;

  const {
    profile_image: {large: avatar},
    username,
    portfolio_url,
    twitter_username,
    instagram_username,
    name,
    bio,
    total_photos,
    total_likes,
    downloads,
    followers_count,
    location,
    photos,
    tags: {custom},
  } = profile;

  return (
    <Surface
      style={{
        flex: 1,
        height: '100%',
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}>
      <BackAppBar />
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          alignItems: 'flex-start',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={{uri: avatar}}
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <View style={{marginStart: 8}}>
            <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
              {name}
            </Text>
            <Text style={{opacity: 0.75}}>@{username}</Text>
          </View>
        </View>

        {location ? (
          <SingleTag mode="outlined" icon="map-marker-outline">
            {location}
          </SingleTag>
        ) : null}

        {(twitter_username || instagram_username || portfolio_url) && (
          <ScrollView
            horizontal
            contentContainerStyle={{marginVertical: 12}}
            showsHorizontalScrollIndicator={false}>
            {twitter_username && (
              <Chip
                icon="twitter"
                onPress={() => openTwitterProfile(twitter_username)}>
                {twitter_username}
              </Chip>
            )}
            {instagram_username && (
              <Chip
                style={{marginStart: 8}}
                icon="instagram"
                onPress={() => openInstagramProfile(instagram_username)}>
                {instagram_username}
              </Chip>
            )}
            {portfolio_url && (
              <Chip
                style={{marginStart: 8}}
                icon="account-star"
                onPress={() => {
                  Linking.openURL(portfolio_url);
                }}>
                Portfolio
              </Chip>
            )}
          </ScrollView>
        )}
        {bio && (
          <Text style={{marginTop: 8}} numberOfLines={4} ellipsizeMode="tail">
            {bio}
          </Text>
        )}
        <StatGroup
          {...{
            total_likes,
            total_photos,
            followers_count,
            downloads,
          }}
        />

        {photos.length >= 0 && (
          <ImageGrid
            photos={photos}
            style={{height: 200, width: '100%' ,marginTop: 4}}
            space={4}
          />
        )}

      </ScrollView>
    </Surface>
  );
}