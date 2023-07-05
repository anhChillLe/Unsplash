import {StyleProp, View, ViewStyle} from 'react-native';
import {User} from '../../services/api/type';
import {Avatar, Text} from 'react-native-paper';

type Props = {
  user: User;
  avatarSize?: number;
  quality?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>
};

export default function UserElement({
  user,
  avatarSize = 24,
  quality = 'small',
  style
}: Props) {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <Avatar.Image
        size={avatarSize}
        source={{uri: user.profile_image[quality]}}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginStart: 8,
        }}>
        <Text variant='titleSmall'>{user.first_name}</Text>
        <Text variant='bodySmall'>@{user.username}</Text>
      </View>
    </View>
  );
}
