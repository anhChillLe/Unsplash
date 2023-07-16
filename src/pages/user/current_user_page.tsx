import { ScrollView } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { BackAppBar, ImageGrid, LoadingScreen, SingleTag, SocialGroup, StatGroup, UserElement } from "../../components";
import { RootState } from "../../redux/store/store";

export default function CurrentUserPage() {
	const inset = useSafeAreaInsets();
	const profile = useSelector((state: RootState) => state.user.profile);
	if (!profile) return <LoadingScreen />;

	const {
		profile_image,
		username,
		portfolio_url,
		twitter_username,
		instagram_username,
		name,
		bio,
		total_photos,
		total_likes,
		downloads,
		followers_count,
		location,
		photos,
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
					<Text style={{ marginTop: 8 }} numberOfLines={4} ellipsizeMode="tail">
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
					<ImageGrid photos={photos} style={{ height: 200, width: "100%", marginTop: 4 }} space={4} />
				)}
			</ScrollView>
		</Surface>
	);
}
