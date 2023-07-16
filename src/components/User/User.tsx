import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {ProfileImage} from '../../unsplash/models/base';

type Props = {
  profile_image: ProfileImage;
  name: string;
  username: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  size?: 'small' | 'large';
};

export default function UserElement({
  profile_image,
  name,
  username,
  style,
  size = 'small',
  onPress = () => {},
}: Props) {
  const {large} = profile_image;

  return (
    <Pressable
      onPress={onPress}
      style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      {size === 'small' ? (
        <>
          <Avatar.Image size={48} source={{uri: large}} />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginStart: 8,
            }}>
            <Text variant="titleSmall">{name}</Text>
            <Text variant="bodySmall" style={{opacity: 0.75}}>
              @{username}
            </Text>
          </View>
        </>
      ) : (
        <>
          <FastImage
            source={{uri: large}}
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'gray',
            }}
            resizeMode="cover"
          />
          <View style={{marginStart: 8, flex: 1}}>
            <Text
              numberOfLines={1}
              variant="headlineSmall"
              style={{fontWeight: 'bold'}}>
              {name}
            </Text>
            <Text style={{opacity: 0.75}}>@{username}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
}
