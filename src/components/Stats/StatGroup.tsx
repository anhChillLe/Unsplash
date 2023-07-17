import { View } from "react-native";
import Stat from "./Stat";
import VerticalDivider from "../Devider/VetticalDivider";

type Props = {
	total_likes: number;
	total_photos: number;
	followers_count: number;
	downloads: number;
};

export default function StatGroup(props: Props) {
	const { total_likes, total_photos, followers_count, downloads } = props;

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%",
				paddingVertical: 12,
			}}
		>
			<Stat title="Likes" count={total_likes} />
			<VerticalDivider />
			<Stat title="Photos" count={total_photos} />
			<VerticalDivider />
			<Stat title="Followers" count={followers_count} />
			<VerticalDivider />
			<Stat title="Downloads" count={downloads} />
		</View>
	);
}
