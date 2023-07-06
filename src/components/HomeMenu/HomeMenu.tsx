import {PropsWithChildren, useState} from 'react';
import {Pressable} from 'react-native';
import {Divider, Menu} from 'react-native-paper';

type Props = PropsWithChildren<{}>;

export default function HomeMenu({children}: Props) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition='bottom'
      style={{marginTop: 8}}
      anchor={<Pressable onPress={openMenu}>{children}</Pressable>}>
      <Menu.Item
        leadingIcon="card-account-details-outline"
        onPress={() => {}}
        title="View Profile"
      />
      <Menu.Item
        leadingIcon="arrow-up-circle-outline"
        onPress={() => {}}
        title="Update Profile"
      />
      <Menu.Item leadingIcon="chart-arc" onPress={() => {}} title="Stats" />
      <Menu.Item leadingIcon="logout" onPress={() => {}} title="Logout" />
      <Divider />
      <Menu.Item leadingIcon="cog" onPress={() => {}} title="Setting" />
    </Menu>
  );
}
