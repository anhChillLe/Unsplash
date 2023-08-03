import { PropsWithChildren, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { Avatar, Divider, IconButton, Menu, Text } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { LoginWithUnsplash as Login } from "../../actions/link_actions"
import { Icons } from "../../assets/images/icons"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { clearToken } from "../../redux/features/auth/action"
import { AppDispatch, RootState } from "../../redux/store/store"

export default function UserGroup() {
	const dispatch = useDispatch<AppDispatch>()
	const user = useSelector((state: RootState) => state.user.profile)
	const navigation = useAppNavigation()
	const [visible, setVisible] = useState(false)
	const openMenu = () => setVisible(true)
	const closeMenu = () => setVisible(false)

	const Setting = () => <IconButton onPress={openMenu} icon="cog" size={28} />

	const UserAvatar = () => (
		<Pressable onPress={openMenu}>
			<Avatar.Image size={24} source={{ uri: user?.profile_image.medium }} />
		</Pressable>
	)
	const openUserProfile = () => {
		navigation.navigate(Screens.user)
		closeMenu()
	}

	const openEdit = () => {
		// navigation.navigate(Screens.editUserProfile)
		closeMenu()
	}

	const openCreateCollection = () => {
		// navigation.navigate(Screens.createCollection)
		closeMenu()
	}

	const logOut = () => dispatch(clearToken())

	return user ? (
		<View style={styles.container}>
			<Heading>Hi {user.last_name}!</Heading>
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchorPosition="bottom"
				style={styles.menu}
				anchor={<UserAvatar />}
			>
				<Menu.Item leadingIcon="card-account-details-outline" onPress={openUserProfile} title="View Profile" />
				<Menu.Item leadingIcon="arrow-up-circle-outline" title="Update Profile" onPress={openEdit} />
				<Menu.Item leadingIcon="chart-arc" title="Your collections" onPress={openCreateCollection} />
				<Menu.Item leadingIcon="logout" title="Logout" onPress={logOut} />
				<Divider />
				<Menu.Item leadingIcon="cog" title="Setting" />
			</Menu>
		</View>
	) : (
		<View style={styles.container}>
			<Heading>Hi!</Heading>
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchorPosition="bottom"
				style={styles.menu}
				anchor={<Setting />}
			>
				<Menu.Item leadingIcon={Icons.unsplash} onPress={Login} title="Login" />
				<Divider />
				<Menu.Item leadingIcon="cog" title="Setting" />
			</Menu>
		</View>
	)
}

const Heading = ({ children }: PropsWithChildren) => {
	return (
		<Text variant="displaySmall" style={styles.heading}>
			{children}
		</Text>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginVertical: 16,
		alignItems: "center",
	},
	heading: {
		fontWeight: "bold",
		flex: 1,
	},
	menu: {
		marginTop: 8,
	},
})
