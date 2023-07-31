import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { Button, Text } from "react-native-paper"
import { BackAppBar, ImageGrid, LoadingScreen, SingleTag, SocialGroup, StatGroup, UserElement } from "../../components"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { useUserState } from "../../redux/store/store"

export default function CurrentUserPage() {
	const navigation = useAppNavigation()
	const { profile } = useUserState()
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

	const handleLocationPress = () => location && navigation.navigate(Screens.searchResult, { searchInput: { query: location } })
	const handlePhotosPress = () => navigation.navigate(Screens.userPhotos, { user: profile })
	const handleCollectionPress = () => {}

	return (
		<SafeAreaView style={styles.container}>
			<BackAppBar />
			<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
				<UserElement profile_image={profile_image} username={username} name={name} size="large" />

				{location && (
					<SingleTag mode="outlined" icon="map-marker-outline" onPress={handleLocationPress}>
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
				<Button
					mode="contained-tonal"
					style={styles.button}
					labelStyle={styles.buttonLabel}
					onPress={handleCollectionPress}
				>
					Your collection
				</Button>
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
		paddingVertical: 16,
		marginTop: 16,
	},
	buttonLabel: {
		fontSize: 24,
		padding: 8,
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
