import { ScrollView, StyleSheet, ViewStyle } from "react-native"
import { Chip } from "react-native-paper"
import { openInstagramProfile, openPortfolio, openTwitterProfile } from "../../actions/link_actions"
import { StyleProp } from "react-native"
import { Social } from "../../service/unsplash/models"

type Props = {
	social: Social
	containerStyle?: StyleProp<ViewStyle>
}

export default function SocialGroup(props: Props) {
	const { containerStyle, social: {twitter_username, instagram_username, portfolio_url} } = props

	return (
		<ScrollView horizontal contentContainerStyle={[styles.container, containerStyle]} showsHorizontalScrollIndicator={false}>
			{twitter_username && (
				<Chip style={styles.item} icon="twitter" onPress={() => openTwitterProfile(twitter_username)}>
					{twitter_username}
				</Chip>
			)}
			{instagram_username && (
				<Chip style={styles.item} icon="instagram" onPress={() => openInstagramProfile(instagram_username)}>
					{instagram_username}
				</Chip>
			)}
			{portfolio_url && (
				<Chip style={styles.item} icon="account-star" onPress={() => openPortfolio(portfolio_url)}>
					Portfolio
				</Chip>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {  },
	item: { marginEnd: 8 },
})
