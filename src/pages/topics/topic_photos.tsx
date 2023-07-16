import "../../ultilities/date_distance";
import { NavigationContext } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Chip, Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackAppBar, ListImageLite, LoadingScreen } from "../../components";
import { TopicPhotosRoute } from "../../navigations/param_list";
import { ScreenName } from "../../navigations/screen_name";
import { FullTopic, User } from "../../services/unsplash/models";
import getTopicViewmodel, { TopicViewmodel } from "../../viewmodels/topic_viewmodel";

export default function TopicPhotosContainer({ route }: TopicPhotosRoute) {
	const viewmodel = getTopicViewmodel(route.params.topic.id);

	return <TopicDetail {...viewmodel} />;
}

function TopicDetail({ isLoadingDetail, isLoadingPhotos, photos, detail, getTopic, getPhotos }: TopicViewmodel) {
	const width = Dimensions.get("window").width;
	const { top } = useSafeAreaInsets();
	const navigation = useContext(NavigationContext);

	useEffect(() => {
		getTopic();
		getPhotos();
	}, []);

	if (!detail) return <LoadingScreen />;
	return (
		<Surface mode="flat" style={{ flex: 1, height: "100%", paddingTop: top }}>
			<BackAppBar />
			<ListImageLite
				width={width - 16}
				space={4}
				photos={photos}
				header={<ListHeader topic={detail} />}
				onItemPress={(photo, index) => navigation?.navigate(ScreenName.detail, { photo })}
				column={3}
				itemThreshold={6}
				onEndReached={getPhotos}
				contentContainerStyle={{
					paddingHorizontal: 8,
				}}
			/>
		</Surface>
	);
}

const ListHeader = ({ topic }: { topic: FullTopic }) => {
	const navigation = useContext(NavigationContext);
	const { title, owners, description, total_photos } = topic;

	return (
		<Surface mode="flat" style={{ paddingVertical: 4 }}>
			<Text variant="headlineLarge" numberOfLines={1} style={{ fontWeight: "bold" }}>
				{title}
			</Text>

			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{owners.map((user: User) => (
					<Chip
						key={user.id}
						avatar={<Avatar.Image size={24} source={{ uri: user.profile_image.medium }} />}
						onPress={() => navigation?.navigate(ScreenName.user, { username: user.username })}
					>
						{user.name}
					</Chip>
				))}
			</ScrollView>

			{description ? (
				<Text variant="bodyMedium" style={{ marginVertical: 4 }}>
					{description.trim()}
				</Text>
			) : null}
			<Text style={{ fontSize: 12, opacity: 0.6 }}>
				{total_photos} photos · {topic.published_at.formatAsDate()}
			</Text>
		</Surface>
	);
};
