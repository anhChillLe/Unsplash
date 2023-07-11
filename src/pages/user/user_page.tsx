import React, { useContext } from 'react';
import {Chip, Surface, Text, useTheme} from 'react-native-paper';
import {
  BackAppBar,
  ImageGrid,
  ListAlbums,
  LoadingScreen,
  SingleTag,
  StatGroup,
  UserElement,
} from '../../components';
import {Linking, Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import '../../ultilities/shortenNumber';
import {useEffect, useState} from 'react';
import {Full} from 'unsplash-js/dist/methods/users/types';
import unsplash from '../../services/api/unsplash';
import {NavigationContext, RouteProp} from '@react-navigation/native';
import {AppParamList} from '../../navigations/param_list';
import {ScreenName} from '../../navigations/screen_name';
import {
  openInstagramProfile,
  openTwitterProfile,
} from '../../actions/link_actions';

type Props = RouteProp<AppParamList, ScreenName.user>;
export default function UserPage({route}: {route: Props}) {
  const inset = useSafeAreaInsets();
  const colors = useTheme().colors;
  const navigation = useContext(NavigationContext)
  const username = route.params?.username;

  const [profile, setProfile] = useState<Full | undefined>();

  async function getUser() {
    console.log('getting user');
    if (!username) {
      return null;
    }
    const apiResponse = await unsplash.users.get({username: username});
    const data = apiResponse.response;
    console.log(data);
    setProfile(data);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (profile === undefined) {
    return <LoadingScreen />;
  }

  const {
    profile_image,
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

        <UserElement profile_image={profile_image} username={username} name={name} size='large'/>
      
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
              onPress={() => navigation?.navigate(ScreenName.userPhotos, {user: profile})}
              // total={total_photos}
            />
          </>
        )}

        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.75,
            backgroundColor: colors.secondary,
            borderRadius: 8,
            width: '100%',
            height: 200,
            marginTop: 16,
          }}
          onPress={() => navigation?.navigate(ScreenName.userCollections, {user: profile})}
          >
          <Text
            variant="headlineSmall"
            style={{fontWeight: 'bold', color: colors.onSecondary}}>
            View collection
          </Text>
        </Pressable>
      </ScrollView>
    </Surface>
  );
}
