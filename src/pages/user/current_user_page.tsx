import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { BackAppBar, ImageGrid, LoadingScreen, SingleTag, SocialGroup, StatGroup, UserElement } from "../../components"
import { RootState, useUserState } from "../../redux/store/store"
import { useContext } from "react"
import { NavigationContext } from "@react-navigation/native"
import { Screens } from "../../navigations/screen_name"

export default function CurrentUserPage() {
	const navigation = useContext(NavigationContext)
	const {profile} = useUserState()
	if (!profile) return <LoadingScreen />

	const {
		profile_image,
		username,
		name,
		bio,
		total_photos,
		total_likes,
		downloads,
		followers_count,
		location,
		photos,
		social,
	} = profile

	const handleLocationPress = () => navigation?.navigate(Screens.searchResult, { searchInput: { query: location } })
	const handlePhotosPress = () => navigation?.navigate(Screens.userPhotos, { user: profile })
	const handleCollectionPress = () => navigation?.navigate(Screens.userCollections, { user: profile })

	return (
		<SafeAreaView style={styles.container}>
			<BackAppBar />
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<UserElement profile_image={profile_image} username={username} name={name} size="large" />

				{location && (
					<SingleTag
						mode="outlined"
						icon="map-marker-outline"
						onPress={handleLocationPress}
					>
						{location}
					</SingleTag>
				)}

				<SocialGroup social={social} />

				{bio && (
					<Text style={styles.bio} numberOfLines={4} ellipsizeMode="tail">
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
					containerStyle={styles.stats}
				/>

				{photos.length > 0 && (
					<ImageGrid
						photos={photos}
						containerStyle={styles.grid}
						space={2}
						mainAxis="column"
						onPress={handlePhotosPress}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
		alignItems: "flex-start",
	},
	grid: {
		height: 240,
		width: "100%",
		marginTop: 4,
	},
	button: {
		width: "100%",
		paddingVertical: 50,
		marginTop: 16,
	},
	buttonLabel: {
		fontSize: 32,
		padding: 12,
	},
	stats: {
		width: "100%",
		paddingVertical: 12,
	},
	social: {
		marginVertical: 12,
	},
	bio: {
		marginTop: 8,
	},
})
