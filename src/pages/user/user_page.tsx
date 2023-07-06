import {Chip, Divider, Surface, Text} from 'react-native-paper';
import {
  BackAppBar,
  GroupHeading,
  ImageGrid,
  LoadingScreen,
} from '../../components';
import {Dimensions, Linking, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import '../../ultilities/shortenNumber';
import {Tag} from '../../services/api/type';
import {useEffect, useState} from 'react';
import {Full} from 'unsplash-js/dist/methods/users/types';
import unsplash from '../../services/api/unsplash';
import {RouteProp} from '@react-navigation/native';
import {AppParamList} from '../../navigations/param_list';
import {ScreenName} from '../../navigations/screen_name';

type Props = RouteProp<AppParamList, ScreenName.user>;
export default function UserPage({route}: {route: Props}) {
  const inset = useSafeAreaInsets();
  const username = route.params?.username;

  const [profile, setProfile] = useState<Full | undefined>();

  async function getUser() {
    console.log('getting user');
    if (!username) return null;
    const apiResponse = await unsplash.users.get({username: username});
    const data = apiResponse.response;
    console.log(data);
    setProfile(data);
  }

  const openInstagramProfile = (instaUsername: string) => {
    const instagramURL = `https://www.instagram.com/${instaUsername}/`;

    Linking.openURL(instagramURL).catch(err =>
      console.error('Không thể mở Instagram:', err),
    );
  };

  const openTwitterProfile = (twitterUsername: string) => {
    const twitterURL = `https://twitter.com/${twitterUsername}/`;

    Linking.openURL(twitterURL).catch(err =>
      console.error('Không thể mở Twitter:', err),
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  if (profile === undefined) return <LoadingScreen />;

  const {
    profile_image: {large: avatar},
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
    // tags: {custom},
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 12,
          }}>
          {location ? (
            <Chip mode="outlined" icon="map-marker-outline">
              {location}
            </Chip>
          ) : null}
        </View>
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
          <Text numberOfLines={4} ellipsizeMode="tail">
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

        {photos.length > 0 && (
          <>
            {/* <GroupHeading containerStyle={{marginTop: 8}}>Photos</GroupHeading> */}
            <ImageGrid
              photos={photos}
              style={{height: 200, marginTop: 4}}
              space={4}
              // total={total_photos}
            />
          </>
        )}

        {/* <GroupHeading containerStyle={{marginTop: 12}}>Interests</GroupHeading> */}
        {/* <UserTags tags={custom} /> */}
      </ScrollView>
    </Surface>
  );
}

function UserTags({tags}: {tags: Tag[]}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginTop: 4,
      }}>
      {tags.map((tag: Tag, index: number) => (
        <Chip key={tag.title} style={{margin: 4}}>
          {tag.title}
        </Chip>
      ))}
    </View>
  );
}

function StatGroup({
  total_likes,
  total_photos,
  followers_count,
  downloads,
}: {
  total_likes: number;
  total_photos: number;
  followers_count: number;
  downloads: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 12,
      }}>
      <Stat title="Likes" count={total_likes} />
      <VerticalDivider />
      <Stat title="Photos" count={total_photos} />
      <VerticalDivider />
      <Stat title="Followers" count={followers_count} />
      <VerticalDivider />
      <Stat title="Downloads" count={downloads} />
    </View>
  );
}

function Stat({title, count}: {title: string; count: number}) {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{opacity: 0.75}}>{title}</Text>
      <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
        {count.shorten()}
      </Text>
    </View>
  );
}

const VerticalDivider = () => {
  return <Divider style={{width: 0.5, height: '100%'}} />;
};
