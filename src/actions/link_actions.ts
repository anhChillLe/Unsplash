import { ACCESS_KEY } from "@env";
import { Linking } from "react-native";
import { Scope } from "../services/unsplash/constants/AuthScope";

const openInstagramProfile = (instagramUsername: string) => {
	const instagramURL = `https://www.instagram.com/${instagramUsername}/`;

	Linking.openURL(instagramURL).catch((err) => console.error("Can not open Instagram:", err));
};

const openTwitterProfile = (twitterUsername: string) => {
	const twitterURL = `https://twitter.com/${twitterUsername}/`;

	Linking.openURL(twitterURL).catch((err) => console.error("Can not open Twitter:", err));
};

const openPortfolio = (portfolio_url: string) => {
	Linking.openURL(portfolio_url).catch((err) => console.error("Can not open Portfolio:", err));
};

function LoginWidthUnsplash() {
	const baseUrl = "https://unsplash.com/oauth/authorize";
	const clientId = `client_id=${ACCESS_KEY}`;
	const redirect = `redirect_uri=unsplash://app/login_success`;
	const responseType = `response_type=code`;
	const allScope: Scope = [
		"public",
		"read_user",
		"write_user",
		"read_photos",
		"write_photos",
		"write_likes",
		"write_followers",
		"read_collections",
		"write_collections",
	];

	const scope = `scope=${allScope.join("+")}`

	const url = `${baseUrl}?${clientId}&${redirect}&${responseType}&${scope}`;

	Linking.openURL(url);
}

export { openInstagramProfile, openTwitterProfile, LoginWidthUnsplash, openPortfolio };
