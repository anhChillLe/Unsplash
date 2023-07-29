import { NavigationContext } from "@react-navigation/native"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BackAppBar, ImageGrid, LoadingScreen, SingleTag, SocialGroup, StatGroup, UserElement } from "../../components"
import { UserRoute } from "../../navigations/param_list"
import { Screens } from "../../navigations/screen_name"
import unsplash from "../../service/unsplash"
import { FullUser } from "../../service/unsplash/models"

export default function UserPage({ route }: UserRoute) {
	const inset = useSafeAreaInsets()
	const navigation = useContext(NavigationContext)
	const username = route.params.username

	const [profile, setProfile] = useState<FullUser | undefined>()

	async function getUser() {
		const data = await unsplash.user.getProfile(username)
		setProfile(data)
	}

	useEffect(() => {
		getUser()
	}, [])

	if (!profile) return <LoadingScreen />

	const {
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
		// tags: {custom},
	} = profile

	const handleLocationPress = () => navigation?.navigate(Screens.searchResult, { searchInput: { query: location } })
	const handlePhotosPress = () => navigation?.navigate(Screens.userPhotos, { user: profile })
	const handleCollectionPress = () => navigation?.navigate(Screens.userCollections, { user: profile })

	return (
		<Surface
			style={[
				styles.container,
				{
					paddingTop: inset.top,
					paddingBottom: inset.bottom,
				},
			]}
		>
			<BackAppBar />

			<ScrollView
				style={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
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
					{bio && (
						<Text ellipsizeMode="tail">
							{bio}
						</Text>
					)}

					<StatGroup
						{...{ total_likes, total_photos, followers_count, downloads }}
						containerStyle={styles.stats}
					/>

					<ImageGrid
						photos={photos}
						containerStyle={styles.grid}
						space={2}
						mainAxis="row"
						onPress={handlePhotosPress}
					/>

					<Button
						mode="contained-tonal"
						style={styles.button}
						labelStyle={styles.buttonLabel}
						onPress={handleCollectionPress}
					>
						{total_collections} collections
					</Button>
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
		paddingHorizontal: 16, width: "100%"
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
		paddingHorizontal: 16,
	},
})
