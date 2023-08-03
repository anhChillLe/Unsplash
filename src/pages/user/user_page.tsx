import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Card, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
	BackAppBar,
	ImageGrid,
	LoadingScreen,
	SingleTag,
	SocialGroup,
	StatGroup,
	TagGroup,
	UserElement,
} from "../../components"
import { useUser } from "../../hooks"
import { useAppNavigation, useUserRoute } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import { useUserState } from "../../redux/store/store"

export default function UserPage() {
	const route = useUserRoute()
	const usn = route.params?.username
	const { profile, isLoading } = usn ? useUser(usn) : useUserState()
	const inset = useSafeAreaInsets()
	const navigation = useAppNavigation()
	if (!profile) return <LoadingScreen />

	const {
		username,
		profile_image,
		name,
		bio,
		total_collections,
		total_photos,
		total_likes,
		downloads,
		followers_count,
		location,
		photos,
		social,
		tags: { custom },
	} = profile

	const handleLocationPress = () =>
		location &&
		navigation.navigate({
			key: location,
			name: Screens.searchResult,
			params: { searchInput: { query: location } },
			merge: false,
		})
	const handlePhotosPress = () =>
		navigation.navigate({
			key: profile.id,
			name: Screens.userPhotos,
			params: { user: profile },
			merge: false,
		})
	const handleCollectionPress = () =>
		navigation.navigate({
			key: profile.id,
			name: Screens.userCollections,
			params: { user: profile },
			merge: false,
		})

	return (
		<Surface style={[styles.container, { paddingTop: inset.top }]}>
			<BackAppBar />
			<ScrollView
				style={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[styles.contentContainer, { paddingBottom: inset.bottom }]}
			>
				<View style={styles.groupContainer}>
					<UserElement profile_image={profile_image} username={username} name={name} size="large" />

					{location && (
						<SingleTag mode="outlined" icon="map-marker-outline" onPress={handleLocationPress}>
							{location}
						</SingleTag>
					)}
				</View>

				<SocialGroup social={social} containerStyle={styles.social} />

				<View style={styles.groupContainer}>
					{custom.length > 0 && <TagGroup tags={custom} containerStyle={{ paddingBottom: 12 }} />}

					{bio && <Text ellipsizeMode="tail">{bio}</Text>}

					<StatGroup
						{...{ total_likes, total_photos, followers_count, downloads }}
						containerStyle={styles.stats}
					/>

					{photos.length > 0 && (
						<ImageGrid
							photos={photos}
							containerStyle={styles.grid}
							space={2}
							mainAxis="row"
							onPress={handlePhotosPress}
						/>
					)}

					<Card mode="contained" style={styles.button} onPress={handleCollectionPress}>
						<Text variant="headlineMedium" style={styles.buttonLabel}>
							{total_collections} collections
						</Text>
					</Card>
				</View>
			</ScrollView>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	groupContainer: {
		paddingHorizontal: 16,
		width: "100%",
	},
	contentContainer: {
		paddingBottom: 16,
		alignItems: "flex-start",
	},
	grid: {
		height: 240,
		width: "100%",
		marginTop: 4,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		height: 128,
		marginTop: 16,
	},
	buttonLabel: {
		fontWeight: "600",
	},
	stats: {
		width: "100%",
		paddingVertical: 12,
	},
	social: {
		marginVertical: 12,
		paddingHorizontal: 16,
	},
})
