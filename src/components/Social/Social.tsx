import { ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { openInstagramProfile, openPortfolio, openTwitterProfile } from "../../actions/link_actions";

type Props = {
	twitter_username?: string | null;
	instagram_username?: string | null;
	portfolio_url?: string | null;
};

export default function SocialGroup(props: Props) {
	const { twitter_username, instagram_username, portfolio_url } = props;
	if (!(twitter_username || instagram_username || portfolio_url)) return null;

	return (
		<ScrollView horizontal contentContainerStyle={{ marginVertical: 12 }} showsHorizontalScrollIndicator={false}>
			{twitter_username && (
				<Chip style={{ marginEnd: 8 }} icon="twitter" onPress={() => openTwitterProfile(twitter_username)}>
					{twitter_username}
				</Chip>
			)}
			{instagram_username && (
				<Chip
					style={{ marginEnd: 8 }}
					icon="instagram"
					onPress={() => openInstagramProfile(instagram_username)}
				>
					{instagram_username}
				</Chip>
			)}
			{portfolio_url && (
				<Chip style={{ marginEnd: 8 }} icon="account-star" onPress={() => openPortfolio(portfolio_url)}>
					Portfolio
				</Chip>
			)}
		</ScrollView>
	);
}
