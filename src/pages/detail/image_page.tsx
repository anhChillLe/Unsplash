import { NavigationContext } from "@react-navigation/native";
import React, { ReactElement, useContext, useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Card, Chip, DataTable, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GroupHeading, ImageCard, ListAlbums, UserElement } from "../../components";
import { ScreenName } from "../../navigations/screen_name";
import { FullPhoto } from "../../unsplash/models/Photo";
import { PhotoDetailViewModel, getPhotoViewModel } from "../../viewmodels/photo_viewmodel";

export default function PageContainer({ photo }: { photo: any }) {
	const viewModel = getPhotoViewModel(photo);
	return <Page {...viewModel} />;
}

function Page({ photo, getDetail, fullPhoto, like }: PhotoDetailViewModel): ReactElement {
	const navigation = useContext(NavigationContext);
	const inset = useSafeAreaInsets();

	useEffect(getDetail, []);

	const {
		user: { profile_image, username, name },
		description,
	} = photo;

	return (
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ paddingBottom: inset.bottom }}
			showsVerticalScrollIndicator={false}
		>
			<UserElement
				profile_image={profile_image}
				username={username}
				name={name}
				style={{
					padding: 8,
				}}
				onPress={() => navigation?.navigate(ScreenName.user, { username })}
			/>

			{description && <Text style={{ padding: 8 }}>{photo.description}</Text>}

			<ImageCard
				roundness={0}
				mode="contained"
				photo={photo}
				placeHolderMode="blurhash"
				width="full"
				height="auto"
				quality="auto"
			/>
			{fullPhoto && <MoreInfo fullPhoto={fullPhoto} like={like} />}
		</ScrollView>
	);
}

function MoreInfo({ fullPhoto, like = () => {} }: { fullPhoto: FullPhoto; like: () => void }): ReactElement {
	const { width } = Dimensions.get("window");
	const navigation = useContext(NavigationContext);
	const theme = useTheme();

	const {
		exif: { make, model, exposure_time, aperture, focal_length, iso },
		likes,
		downloads,
		views,
		liked_by_user,
	} = fullPhoto;

	return (
		<View style={{ paddingHorizontal: 8 }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginVertical: 8,
				}}
			>
				<Chip
					style={{ backgroundColor: "transparent" }}
					textStyle={{
						fontSize: 12,
						color: liked_by_user ? theme.colors.primary : theme.colors.onSurface,
					}}
					compact={true}
					icon={liked_by_user ? "thumb-up" : "thumb-up-outline"}
					onPress={like}
				>
					{likes.shorten()} likes
				</Chip>

				<Chip style={{ backgroundColor: "transparent" }} textStyle={{ fontSize: 12 }} compact={true} icon="eye">
					{views.shorten()} views
				</Chip>

				<Chip
					style={{ backgroundColor: "transparent" }}
					textStyle={{ fontSize: 12 }}
					compact={true}
					icon="download-circle"
				>
					{downloads.shorten()} downloads
				</Chip>
			</View>

			<GroupHeading containerStyle={{ marginVertical: 8, marginStart: 4 }}>Exif</GroupHeading>

			<Card mode="contained" style={{ marginBottom: 16, overflow: "hidden" }}>
				<DataTable style={{ width: "100%" }}>
					<DataTable.Row>
						<DataTable.Title>Model</DataTable.Title>
						<DataTable.Cell>{model ?? "unknown"}</DataTable.Cell>
						<DataTable.Title>Make</DataTable.Title>
						<DataTable.Cell>{make ?? "unknown"}</DataTable.Cell>
					</DataTable.Row>

					<DataTable.Row>
						<DataTable.Title>Exposure</DataTable.Title>
						<DataTable.Cell>{exposure_time ?? "unknown"}</DataTable.Cell>
						<DataTable.Title>Aperture</DataTable.Title>
						<DataTable.Cell>{aperture ?? "unknown"}</DataTable.Cell>
					</DataTable.Row>

					<DataTable.Row>
						<DataTable.Title>Focal</DataTable.Title>
						<DataTable.Cell>{focal_length ?? "unknown"}</DataTable.Cell>
						<DataTable.Title>Iso</DataTable.Title>
						<DataTable.Cell>{iso ?? "unknown"}</DataTable.Cell>
					</DataTable.Row>
				</DataTable>
			</Card>
			<GroupHeading containerStyle={{ marginVertical: 8, marginStart: 4 }}>More collection</GroupHeading>
			<ListAlbums
				data={fullPhoto.related_collections.results}
				column={1}
				space={8}
				width={width - 16}
				mode="compact"
				itemMode="group"
				onItemPress={(collection) => navigation?.navigate(ScreenName.collectionPhotos, { collection })}
			/>
		</View>
	);
}
