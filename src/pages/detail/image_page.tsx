import React, { ReactElement, useEffect, useState } from "react"
import { Dimensions, Platform, ScrollView, StyleSheet, View } from "react-native"
import { Button, Chip, Menu, Text, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
	Chart,
	GroupHeading,
	ImageCard,
	ListAlbums,
	TagGroup,
	TextIcon,
	UserElement,
	VerticalDivider,
} from "../../components"
import Stat from "../../components/Stats/Stat"
import { usePhoto } from "../../hooks"
import WallpaperManager from "../../modules/wallpaper/wallpaper"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import DownloadService from "../../service/download/download"
import ShareService from "../../service/sharing/share_action"
import unsplash from "../../service/unsplash"
import { BaseGroup, Statistics, Tag } from "../../service/unsplash/models"
import { FullPhoto, Photo } from "../../service/unsplash/models/Photo"
import "../../ultilities/date_distance"

export default function Page({ photo }: { photo: Photo }): ReactElement {
	const navigation = useAppNavigation()
	const inset = useSafeAreaInsets()
	const theme = useTheme()
	const { fullPhoto, like } = usePhoto(photo.id)

	const handleShare = () => ShareService.sharePhotoLink(photo)
	const handleDownload = () => DownloadService.savePhoto(photo)
	const handleUserPress = () =>
		navigation.navigate({
			key: username,
			name: Screens.user,
			params: { username },
			merge: false,
		})
	const handleWallpaperPress = () =>
		photo.links.download && WallpaperManager.setWallpaperFromStream(photo.links.download)

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
					theme={{
						colors: {
							outline: liked_by_user ? theme.colors.primary : theme.colors.outline,
						},
					}}
					onPress={like}
				>
					{likes.shorten()}
				</Button>
				<Button mode="outlined" compact icon="plus" style={styles.buttonAdd} textColor={theme.colors.onSurface}>
					Add
				</Button>
				<View style={styles.fill} />
				<Button
					mode="outlined"
					icon="arrow-down"
					contentStyle={styles.buttonDownload}
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
				{Platform.OS === "android" && (
					<>
						<Chip
							mode="outlined"
							icon="wallpaper"
							compact
							style={styles.buttonShare}
							onPress={handleWallpaperPress}
						>
							Set as wallpaper
						</Chip>
						<View style={{ flex: 1 }} />
					</>
				)}
				<Chip mode="outlined" icon="share" compact style={styles.buttonShare} onPress={handleShare}>
					Share
				</Chip>
				<Stats id={photo.id} />
			</View>
			{fullPhoto && <MoreInfo {...fullPhoto} />}
		</ScrollView>
	)
}

const Stats = ({ id }: { id: string }) => {
	const [visible, setVisible] = useState(false)
	const [statistics, setStatistic] = useState<Statistics>()

	const openStats = () => setVisible(true)
	const closeStats = () => setVisible(false)

	const getData = async () => {
		if (!statistics) {
			const data = await unsplash.photo.statistics(id)
			setStatistic(data)
		}
	}

	const ButtonStats = () => (
		<Chip mode="outlined" icon="chart-arc" compact onPress={openStats}>
			Stats
		</Chip>
	)

	useEffect(() => {
		getData()
	}, [])

	const totalDownload = statistics?.downloads.total
	const averageDownload = statistics?.downloads.historical.average
	const totalView = statistics?.views.total
	const averageView = statistics?.views.historical.average
	const downloads = statistics?.downloads.historical.values.map(it => it.value) ?? []
	const views = statistics?.views.historical.values.map(it => it.value) ?? []
	return (
		<Menu
			visible={visible}
			anchor={<ButtonStats />}
			onDismiss={closeStats}
			anchorPosition="bottom"
			style={{ marginTop: 8 }}
			contentStyle={{ padding: 8, borderRadius: 8 }}
		>
			<View>
				{totalDownload && (
					<Text variant="bodyMedium" style={{ fontWeight: "600" }}>
						Total downloads: {totalDownload.shorten()}
					</Text>
				)}
				{averageDownload && (
					<Text variant="bodyMedium" style={{ fontWeight: "600" }}>
						Average: {averageDownload.shorten()}
					</Text>
				)}
				<Chart data={downloads} width={240} height={90} style={{ marginTop: 16, marginBottom: 16 }} />
				{totalView && (
					<Text variant="bodyMedium" style={{ fontWeight: "600" }}>
						Total views: {totalView.shorten()}
					</Text>
				)}
				{averageView && (
					<Text variant="bodyMedium" style={{ fontWeight: "600" }}>
						Average: {averageView.shorten()}
					</Text>
				)}
				<Chart data={views} width={240} height={90} style={{ marginTop: 16 }} />
			</View>
		</Menu>
	)
}

function MoreInfo(fullPhoto: FullPhoto): ReactElement {
	const { width } = Dimensions.get("window")
	const navigation = useAppNavigation()

	const {
		exif: { make, model, exposure_time, aperture, focal_length, iso },
		related_collections: { results },
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
			navigation.navigate(Screens.searchResult, {
				searchInput: { query: tag.title },
			})
		}
	}
	const handleCollectionPress = (collection: BaseGroup) => {
		navigation.navigate({
			name: Screens.collectionPhotos,
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

			<TagGroup tags={tags} onItemPress={handleTagPress} containerStyle={styles.tags} />

			<GroupHeading containerStyle={styles.header}>Related collections</GroupHeading>

			<ListAlbums
				data={results}
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
		marginHorizontal: 8,
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
	tags: {
		marginBottom: 4,
	},
	buttonAdd: {
		marginStart: 8,
	},
	buttonShare: {
		marginEnd: 8,
	},
	buttonDownload: {
		flexDirection: "row-reverse",
	},
	fill: {
		flex: 1,
	},
})
