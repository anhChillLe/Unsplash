import { NavigationContext } from "@react-navigation/native"
import React, { ReactElement, useContext, useEffect } from "react"
import { Dimensions, ScrollView, StyleSheet, View } from "react-native"
import { Button, Chip, Text, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { shareLink } from "../../actions/share_action"
import { GroupHeading, ImageCard, ListAlbums, TagGroup, TextIcon, UserElement, VerticalDivider } from "../../components"
import Stat from "../../components/Stats/Stat"
import { ScreenName } from "../../navigations/screen_name"
import "../../ultilities/date_distance"
import { FullPhoto, Photo } from "../../unsplash/models/Photo"
import { BaseGroup, Tag } from "../../unsplash/models/base"
import { PhotoDetailViewModel, getPhotoViewModel } from "../../viewmodels/photo_viewmodel"
import { downloadImage } from "../../actions/download"

export default function PageContainer({ photo }: { photo: Photo }) {
	const viewModel = getPhotoViewModel(photo)
	return <Page {...viewModel} />
}

function Page({ photo, getDetail, fullPhoto, like }: PhotoDetailViewModel): ReactElement {
	const navigation = useContext(NavigationContext)
	const inset = useSafeAreaInsets()
	const theme = useTheme()

	useEffect(getDetail, [])

	const handleShare = () => shareLink(photo)
	const handleDownload = () => downloadImage(photo)
	const handleUserPress = () => navigation?.navigate(ScreenName.user, { username })

	const {
		user: { profile_image, username, name },
		likes,
		liked_by_user,
	} = fullPhoto ?? photo

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ paddingBottom: inset.bottom }}
			showsVerticalScrollIndicator={false}
		>
			<UserElement
				profile_image={profile_image}
				username={username}
				name={name}
				style={styles.user}
				onPress={handleUserPress}
			/>

			<View style={styles.topBottomGroup}>
				<Button
					mode="outlined"
					icon={liked_by_user ? "heart" : "heart-outline"}
					compact
					textColor={liked_by_user ? theme.colors.primary : theme.colors.onSurface}
					onPress={like}
				>
					{likes}
				</Button>
				<Button
					mode="outlined"
					compact
					icon="plus"
					style={{ marginStart: 8 }}
					textColor={theme.colors.onSurface}
				>
					Add
				</Button>
				<View style={{ flex: 1 }} />
				<Button
					mode="outlined"
					icon="arrow-down"
					contentStyle={{ flexDirection: "row-reverse" }}
					textColor={theme.colors.onSurface}
					onPress={handleDownload}
				>
					Download
				</Button>
			</View>

			<ImageCard
				roundness={0}
				mode="contained"
				photo={photo}
				placeHolderMode="blurhash"
				width="full"
				height="auto"
				quality="auto"
			/>

			<View style={styles.bottomButtonGroup}>
				<Chip mode="outlined" icon="share" compact style={{ marginEnd: 8 }} onPress={handleShare}>
					Share
				</Chip>
				<Chip mode="outlined" icon="chart-arc" compact>
					Stats
				</Chip>
			</View>

			{fullPhoto && <MoreInfo {...fullPhoto} />}
		</ScrollView>
	)
}

function MoreInfo(fullPhoto: FullPhoto): ReactElement {
	const { width } = Dimensions.get("window")
	const navigation = useContext(NavigationContext)

	const {
		exif: { make, model, exposure_time, aperture, focal_length, iso },
		likes,
		downloads,
		views,
		location,
		created_at,
		description,
		tags,
	} = fullPhoto

	const handleTagPress = (tag: Tag) => {
		if (tag.type === "search") {
			navigation?.navigate(ScreenName.searchResult, {
				searchInput: { query: tag.title },
			})
		}
	}
	const handleCollectionPress = (collection: BaseGroup) => {
		navigation?.navigate({
			name: ScreenName.collectionPhotos,
			key: collection.id,
			params: { collection },
			merge: false,
		})
	}

	return (
		<View style={styles.detailContainer}>
			{description && <Text style={styles.description}>{description}</Text>}

			<View style={styles.statsContainer}>
				<Stat title="Views" count={views} />
				<VerticalDivider style={styles.divider} />
				<Stat title="Downloads" count={downloads} />
				<VerticalDivider style={styles.divider} />
				<Stat title="Likes" count={likes} />
			</View>

			<View style={styles.exifContainer}>
				{location.name && (
					<TextIcon style={styles.exifItem} icon="map-marker-outline">
						{location.name}
					</TextIcon>
				)}
				{make && model && (
					<TextIcon style={styles.exifItem} icon="camera">
						{make}, {model}
					</TextIcon>
				)}
				{created_at && (
					<TextIcon style={styles.exifItem} icon="calendar">
						{created_at.formatAsDate()}
					</TextIcon>
				)}
				{exposure_time && (
					<TextIcon style={styles.exifItem} icon="image-filter-tilt-shift">
						Exposure: {exposure_time}
					</TextIcon>
				)}
				{aperture && (
					<TextIcon style={styles.exifItem} icon="camera-iris">
						Aperture: {aperture}
					</TextIcon>
				)}
				{focal_length && (
					<TextIcon style={styles.exifItem} icon="image-filter-center-focus">
						Focal: {focal_length}
					</TextIcon>
				)}
				{iso && (
					<TextIcon style={styles.exifItem} icon="apple-ios">
						ISO: {iso}
					</TextIcon>
				)}
			</View>

			<TagGroup tags={tags} onItemPress={handleTagPress} />

			<GroupHeading containerStyle={styles.header}>Related collections</GroupHeading>

			<ListAlbums
				data={fullPhoto.related_collections.results}
				column={1}
				space={8}
				width={width - 16}
				mode="compact"
				itemMode="group"
				onItemPress={handleCollectionPress}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	detailContainer: {
		paddingHorizontal: 8,
		marginTop: 16,
	},
	bottomButtonGroup: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		marginTop: 8,
		marginEnd: 8,
	},
	topBottomGroup: {
		flexDirection: "row",
		marginBottom: 8,
		paddingHorizontal: 8,
	},
	description: {
		marginBottom: 16,
	},
	statsContainer: {
		flexDirection: "row",
		marginBottom: 16,
	},
	exifContainer: {
		marginBottom: 8,
	},
	exifItem: {
		marginBottom: 8,
	},
	header: {
		marginVertical: 8,
		marginStart: 4,
	},
	divider: {
		marginHorizontal: 16,
	},
	user: {
		padding: 8,
	},
})
