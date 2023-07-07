import { View } from "react-native";
import { Text } from "react-native-paper";
import '../../ultilities/shortenNumber';

export default function Stat({title, count}: {title: string; count: number}) {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{opacity: 0.75}}>{title}</Text>
      <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
        {count.shorten()}
      </Text>
    </View>
  );
}