import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Avatar, Text } from "react-native-paper"
import FastImage from "react-native-fast-image"
import { ProfileImage } from "../../service/unsplash/models/base"

type Props = {
	profile_image: ProfileImage
	name: string
	username: string
	style?: StyleProp<ViewStyle>
	onPress?: () => void
	size?: "small" | "large"
}

export default function UserElement({
	profile_image,
	name,
	username,
	style,
	size = "small",
	onPress = () => {},
}: Props) {
	const { large } = profile_image

	return (
		<Pressable onPress={onPress} style={[styles.container, style]}>
			{size === "small" ? (
				<>
					<Avatar.Image size={48} source={{ uri: large }} />
					<View style={styles.textContainer}>
						<Text variant="titleSmall" style={styles.name}>{name}</Text>
						<Text variant="bodySmall" style={styles.username}>
							@{username}
						</Text>
					</View>
				</>
			) : (
				<>
					<FastImage source={{ uri: large }} style={styles.avatarLarge} resizeMode="cover" />
					<View style={styles.textContainer}>
						<Text numberOfLines={1} variant="headlineSmall" style={styles.name}>
							{name}
						</Text>
						<Text style={styles.username}>@{username}</Text>
					</View>
				</>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	avatarLarge: {
		width: 64,
		height: 64,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "gray",
	},
	name: {
		fontWeight: "bold",
	},
	username: {
		opacity: 0.75,
	},
	textContainer: {
		flexDirection: "column",
		alignItems: "flex-start",
		marginStart: 8,
	},
})
