import { View } from "react-native";
import { Tag } from "../../services/api/type";
import { Chip } from "react-native-paper";

export default function TagGroup({tags}: {tags: Tag[]}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginTop: 4,
      }}>
      {tags.map((tag: Tag, index: number) => (
        <Chip key={tag.title} style={{margin: 4}}>
          {tag.title}
        </Chip>
      ))}
    </View>
  );
}