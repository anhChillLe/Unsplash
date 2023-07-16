import { NavigationContext } from "@react-navigation/native"
import React, { useContext, useRef, useState } from "react"
import { ScrollView, StyleProp, TextInput, View, ViewStyle } from "react-native"
import { Chip, Searchbar, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenName } from "../../navigations/screen_name"
import { Fillter, SearchPhotosParams } from "../../unsplash/params/search_params"
import { SearchOrderBy } from "../../unsplash/constants/OrderBy"
import { ContentFilter } from "../../unsplash/constants/ContentFilter"
import { Orientation } from "../../unsplash/constants/Orientation"
import { ColorId } from "../../unsplash/constants/Color"

export default function SearchScreen() {
	const { top, bottom } = useSafeAreaInsets()
	const navigation = useContext(NavigationContext)
	const [searchValue, setSearchValue] = useState<string>("")
	const filter = useRef<Fillter>({})
	const searchRef = useRef<TextInput>(null)

	const handleSearchSubmit = (query: string) => {
		const input: SearchPhotosParams = {
			query,
			...filter.current,
		}
		navigation?.navigate(ScreenName.searchResult, { searchInput: input })
		setSearchValue("")
	}

	return (
		<Surface
			style={{
				flex: 1,
				height: "100%",
				paddingTop: 16 + top,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }}>
				<Searchbar
					mode="bar"
					placeholder="Search for image"
					ref={searchRef}
					value={searchValue}
					onLayout={() => searchRef.current?.focus()}
					autoCapitalize="none"
					onChangeText={setSearchValue}
					onSubmitEditing={() => handleSearchSubmit(searchValue)}
					style={{ flex: 1 }}
				/>
			</View>

			{/* <Text variant="headlineLarge" style={{ fontWeight: "bold", marginTop: 16, paddingHorizontal: 16 }}>
				Histories
			</Text>
			<Histories onItemPress={handleSearchSubmit} /> */}

			<Text variant="headlineLarge" style={{ fontWeight: "bold", marginTop: 32, marginStart: 16 }}>
				Filter
			</Text>

			<FilterCard
				title="Order by"
				data={["latest", "relevant", "editorial"]}
				style={{ marginTop: 8, marginStart: 16 }}
				onSelected={(value) => (filter.current.order_by = value as SearchOrderBy)}
			/>
			<FilterCard
				title="Content filter"
				data={["low", "high"]}
				style={{ marginTop: 8, marginStart: 16 }}
				onSelected={(value) => (filter.current.content_filter = value as ContentFilter)}
			/>
			<FilterCard
				title="Color"
				data={[
					"black_and_white",
					"black",
					"white",
					"yellow",
					"orange",
					"red",
					"purple",
					"magenta",
					"green",
					"teal",
					"blue",
				]}
				style={{ marginTop: 8, marginStart: 16 }}
				onSelected={(value) => (filter.current.color = value as ColorId)}
			/>
			<FilterCard
				title="Orientation"
				data={["landscape", "portrait", "squarish"]}
				style={{ marginTop: 8, marginStart: 16 }}
				onSelected={(value) => (filter.current.orientation = value as Orientation)}
			/>
		</Surface>
	)
}

function FilterCard({
	data,
	title,
	onSelected,
	style,
}: {
	data: string[]
	title: string
	onSelected?: (value: string | undefined) => void
	style?: StyleProp<ViewStyle>
}) {
	const [currentValue, setValue] = useState<string | undefined>(undefined)

	const onValueChange = (newValue: string | undefined) => {
		const nextValue = newValue === currentValue ? undefined : newValue
		setValue(nextValue)
		onSelected && onSelected(nextValue)
	}

	return (
		<View style={style}>
			<Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
				{title}
			</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ marginHorizontal: -4 }}
			>
				{data.map((value) => (
					<Chip
						key={value + (value === currentValue)}
						onPress={() => onValueChange(value)}
						selected={value === currentValue}
						style={{ margin: 4 }}
					>
						{value}
					</Chip>
				))}
			</ScrollView>
		</View>
	)
}

// function Histories({ onItemPress }: { onItemPress: (query: string) => void }) {
// 	const state = useSelector((state: RootState) => state.search);
// 	const dispatch = useDispatch<AppDispatch>();
// 	const removeItem = (value: string) => dispatch(removeHistory({ value }))
// 	let histories = [...state.histories].reverse();
// 	const nonDuplicateHistories = Array.from(new Set(histories));

// 	return (
// 		<View
// 			style={{
// 				flexDirection: "row",
// 				flexWrap: "wrap",
// 				marginHorizontal: -4,
// 				marginTop: 8,
// 				paddingHorizontal: 16,
// 			}}
// 		>
// 			{nonDuplicateHistories.map((query, index) => (
// 				<Chip
// 					key={index}
// 					style={{ margin: 4 }}
// 					mode="outlined"
// 					onClose={() => removeItem(query)}
// 					onPress={() => onItemPress(query)}
// 				>
// 					{query}
// 				</Chip>
// 			))}
// 		</View>
// 	);
// }
