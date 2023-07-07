import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {Pressable, StyleSheet, View} from 'react-native';
import {Avatar, Divider, IconButton, Menu, Text} from 'react-native-paper';
import {PropsWithChildren, useContext, useState} from 'react';
import {Icons} from '../../assets/icons';
import {LoginWidthUnsplash as Login} from '../../actions/link_actions';
import {NavigationContext} from '@react-navigation/native';
import {ScreenName} from '../../navigations/screen_name';

export default function UserGroup() {
  const user = useSelector((state: RootState) => state.user.profile);
  const navigation = useContext(NavigationContext);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Setting = () => <IconButton onPress={closeMenu} icon="cog" size={28} />;
  const UserAvatar = () => (
    <Pressable onPress={openMenu}>
      <Avatar.Image size={32} source={{uri: user?.profile_image.medium}} />
    </Pressable>
  );
  const openUserProfile = () => {
    navigation?.navigate(ScreenName.currentUser);
    closeMenu();
  };

  return user ? (
    <View style={styles.container}>
      <Heading>Hi {user.last_name}!</Heading>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        style={styles.menu}
        anchor={<UserAvatar />}>
        <Menu.Item
          leadingIcon="card-account-details-outline"
          onPress={openUserProfile}
          title="View Profile"
        />
        <Menu.Item
          leadingIcon="arrow-up-circle-outline"
          title="Update Profile"
        />
        <Menu.Item leadingIcon="chart-arc" title="Stats" />
        <Menu.Item leadingIcon="logout" title="Logout" />
        <Divider />
        <Menu.Item leadingIcon="cog" title="Setting" />
      </Menu>
    </View>
  ) : (
    <View style={styles.container}>
      <Heading>Hi chill!</Heading>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        style={styles.menu}
        anchor={<Setting />}>
        <Menu.Item leadingIcon={Icons.unsplash} onPress={Login} title="Login" />
        <Divider />
        <Menu.Item leadingIcon="cog" title="Setting" />
      </Menu>
    </View>
  );
}

const Heading = ({children}: PropsWithChildren) => {
  return (
    <Text variant="displaySmall" style={styles.heading}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    flex: 1,
  },
  menu: {
    marginTop: 8,
  },
});
