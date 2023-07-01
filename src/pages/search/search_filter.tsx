import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Chip, Surface, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function FilterScreen() {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <Surface
      mode="flat"
      style={{
        flex: 1,
        height: '100%',
        paddingTop: top + 16,
        paddingBottom: bottom,
        paddingHorizontal: 16,
      }}>
      {/* // orderBy latest relevant // collections // content_filter // color //
      orientation */}

      <FilterCard
        title="Order by"
        data={['latest', 'relevant']}
        onItemPress={() => {}}
      />
      <FilterCard
        title="Content filter"
        data={['low', 'high']}
        onItemPress={() => {}}
      />
      <FilterCard
        title="Color"
        data={[
          'black_and_white',
          'black',
          'white',
          'yellow',
          'orange',
          'red',
          'purple',
          'magenta',
          'green',
          'teal',
          'blue',
        ]}
        onItemPress={() => {}}
      />
      <FilterCard
        title="Orientation"
        data={['landscape', 'portrait', 'squarish']}
        onItemPress={() => {}}
      />
    </Surface>
  );
}

function FilterCard({
  title,
  data,
  onItemPress,
}: {
  title: string;
  data: string[];
  onItemPress?: (value: string) => void;
}) {
  return (
    <View style={{marginTop: 16}}>
      <Text variant="titleLarge">{title}</Text>
      <ScrollView
        horizontal
        style={{marginTop: 8}}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <SelectableChip title={item} onChange={onItemPress} />
        ))}
      </ScrollView>
    </View>
  );
}

function SelectableChip({
  title,
  onChange,
}: {
  title: string;
  onChange?: (value: string) => void;
}) {
  const [isSelected, setSelected] = useState(false);

  const onCheckedChange = () => {
    setSelected(!isSelected);
    onChange ? onChange(title) : null;
  };

  return (
    <Chip
      mode="outlined"
      style={{margin: 2, borderColor: 'red'}}
      onPress={onCheckedChange}
      compact
      selectedColor='blue'
      selected={isSelected}>
      {title}
    </Chip>
  );
}
