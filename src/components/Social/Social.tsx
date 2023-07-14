import {ScrollView} from 'react-native';
import {Chip} from 'react-native-paper';
import {
  openInstagramProfile,
  openPortfolio,
  openTwitterProfile,
} from '../../actions/link_actions';

export default function SocialGroup({
  twitter_username,
  instagram_username,
  portfolio_url,
}: {
  twitter_username?: string | null;
  instagram_username?: string | null;
  portfolio_url?: string | null;
}) {
  if (!(twitter_username || instagram_username || portfolio_url)) return null;
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{marginVertical: 12}}
      showsHorizontalScrollIndicator={false}>
      {twitter_username && (
        <Chip
          icon="twitter"
          onPress={() => openTwitterProfile(twitter_username)}>
          {twitter_username}
        </Chip>
      )}
      {instagram_username && (
        <Chip
          style={{marginStart: 8}}
          icon="instagram"
          onPress={() => openInstagramProfile(instagram_username)}>
          {instagram_username}
        </Chip>
      )}
      {portfolio_url && (
        <Chip
          style={{marginStart: 8}}
          icon="account-star"
          onPress={() => openPortfolio(portfolio_url)}>
          Portfolio
        </Chip>
      )}
    </ScrollView>
  );
}
