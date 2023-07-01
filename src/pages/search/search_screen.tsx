import {NavigationContext} from '@react-navigation/native';
import {useContext, useRef, useState} from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import {Chip, Searchbar, Surface, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchFilterParams} from '../../services/api/type';
import {ColorId, ContentFilter, Orientation, SearchOrderBy} from 'unsplash-js';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {SearchInput, searchImage} from '../../redux/features/search/actions';
import {ScreenName} from '../../navigations/screen_name';
import { removeHistory } from '../../redux/features/search/search';

export default function SearchScreen() {
  const {top, bottom} = useSafeAreaInsets();
  const navigation = useContext(NavigationContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const filter = useRef<SearchFilterParams>({});

  const onSearchSubmit = (query: string) => {
    const input: SearchInput = {
      query,
      ...filter.current,
    };
    navigation?.navigate(ScreenName.SearchResult, {searchInput: input});
  };

  return (
    <Surface
      style={{
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        paddingTop: 16 + top,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Searchbar
          mode="bar"
          placeholder="Search for image"
          focusable={false}
          value={searchValue}
          autoCapitalize='none'
          onChangeText={setSearchValue}
          onSubmitEditing={() => onSearchSubmit(searchValue)}
          style={{flex: 1}}
        />
      </View>

      <Text variant='headlineLarge' style={{fontWeight: 'bold', marginTop: 16}}>Histories</Text>

      <Histories onItemPress={onSearchSubmit} />

      <Text variant='headlineLarge' style={{fontWeight: 'bold', marginTop: 32}}>Filter</Text>

      <FilterCard
        title="Order by"
        data={['latest', 'relevant', 'editorial']}
        style={{marginTop: 8}}
        onSelected={value => (filter.current.orderBy = value as SearchOrderBy)}
      />
      <FilterCard
        title="Content filter"
        data={['low', 'high']}
        style={{marginTop: 8}}
        onSelected={value =>
          (filter.current.contentFilter = value as ContentFilter)
        }
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
        style={{marginTop: 8}}
        onSelected={value => (filter.current.color = value as ColorId)}
      />
      <FilterCard
        title="Orientation"
        data={['landscape', 'portrait', 'squarish']}
        style={{marginTop: 8}}
        onSelected={value =>
          (filter.current.orientation = value as Orientation)
        }
      />
    </Surface>
  );
}

function FilterCard({
  data,
  title,
  onSelected,
  style,
}: {
  data: string[];
  title: string;
  onSelected?: (value: string | undefined) => void;
  style?: StyleProp<ViewStyle>;
}) {
  const [currentValue, setValue] = useState<string | undefined>(undefined);

  const onValueChange = (newValue: string | undefined) => {
    const nextValue = newValue === currentValue ? undefined : newValue;
    setValue(nextValue);
    onSelected && onSelected(nextValue);
  };

  return (
    <View style={style}>
      <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal: -4}}>
        {data.map(value => (
          <Chip
            key={value + (value === currentValue)}
            onPress={() => onValueChange(value)}
            selected={value === currentValue}
            style={{margin: 4}}>
            {value}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

function Histories({onItemPress} : {
  onItemPress: (query: string) => void
}) {
  const state = useSelector((state: RootState) => state.search);
  const navigation = useContext(NavigationContext);
  const dispatch = useDispatch<AppDispatch>()

  const removeItem = (value: string) => {
    dispatch(removeHistory({value}))
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginTop: 8,
      }}>
      {state.histories.map((query, index) => (
        <Chip
          key={index}
          style={{margin: 4}}
          mode="outlined"
          onClose={() => removeItem(query)}
          onPress={() => onItemPress(query)}>
          {query}
        </Chip>
      ))}
    </View>
  );
}
