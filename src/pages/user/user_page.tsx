import { NavigationContext } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackAppBar, ImageGrid, LoadingScreen, SingleTag, SocialGroup, StatGroup, UserElement } from "../../components";
import { UserRoute } from "../../navigations/param_list";
import { ScreenName } from "../../navigations/screen_name";
import unsplash from "../../unsplash";
import { FullUser } from "../../unsplash/models";

export default function UserPage({ route }: UserRoute) {
	const inset = useSafeAreaInsets();
	const navigation = useContext(NavigationContext);
	const username = route.params.username;

	const [profile, setProfile] = useState<FullUser | undefined>();

	async function getUser() {
		const data = await unsplash.user.getProfile(username);
		setProfile(data);
	}

	useEffect(() => {
		getUser();
	}, []);

	if (!profile) return <LoadingScreen />;

	const {
		profile_image,
		portfolio_url,
		twitter_username,
		instagram_username,
		name,
		bio,
		total_collections,
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
				height: "100%",
				paddingTop: inset.top,
				paddingBottom: inset.bottom,
			}}
		>
			<BackAppBar />
			<ScrollView
				style={{
					flex: 1,
				}}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
					alignItems: "flex-start",
				}}
			>
				<UserElement profile_image={profile_image} username={username} name={name} size="large" />

				{location ? (
					<SingleTag mode="outlined" icon="map-marker-outline">
						{location}
					</SingleTag>
				) : null}

				<SocialGroup
					instagram_username={instagram_username}
					twitter_username={twitter_username}
					portfolio_url={portfolio_url}
				/>

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
					<ImageGrid
						photos={photos}
						style={{ height: 200, marginTop: 4 }}
						space={4}
						onPress={() => navigation?.navigate(ScreenName.userPhotos, { user: profile })}
					/>
				)}

				<Button
					mode="contained-tonal"
					style={{ width: "100%", paddingVertical: 50, marginTop: 16 }}
					labelStyle={{ fontSize: 32, padding: 12 }}
					// onPress={() =>
					//   navigation?.navigate(ScreenName.userCollections, {user: profile})
					// }
				>
					{total_collections} collections
				</Button>
			</ScrollView>
		</Surface>
	);
}
