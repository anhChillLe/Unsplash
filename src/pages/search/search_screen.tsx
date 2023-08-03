import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Chip, Searchbar, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FilterCard } from "../../components"
import { useAppNavigation } from "../../navigations/hooks"
import { Screens } from "../../navigations/screen_name"
import History from "../../service/storage/shared_preferences"
import { ColorId } from "../../service/unsplash/constants/Color"
import { ContentFilter } from "../../service/unsplash/constants/ContentFilter"
import { SearchOrderBy } from "../../service/unsplash/constants/OrderBy"
import { Orientation } from "../../service/unsplash/constants/Orientation"
import { colorValues, contentFilters, orderBys, orientations } from "../../service/unsplash/data"
import { Fillter } from "../../service/unsplash/params/search_params"

export default function SearchScreen() {
	const { top } = useSafeAreaInsets()
	const navigation = useAppNavigation()
	const [searchValue, setSearchValue] = useState("")
	const filter = useRef<Fillter>({})
	const searchRef = useRef<TextInput>(null)
	const [flag, setFlag] = useState(false)

	const handleSearchSubmit = async (query: string) => {
		if (searchValue === "") return
		navigation.navigate({
			name: Screens.searchResult,
			params: {
				searchInput: {
					query,
					...filter.current,
				},
			},
		})
		await History.save(query)
		setSearchValue("")
		setFlag(!flag)
	}

	return (
		<Surface style={[styles.container, { paddingTop: 16 + top }]}>
			<View style={styles.searchContainer}>
				<Searchbar
					mode="bar"
					placeholder="Search for image"
					ref={searchRef}
					value={searchValue}
					onLayout={searchRef.current?.focus}
					autoCapitalize="none"
					onChangeText={setSearchValue}
					onSubmitEditing={() => handleSearchSubmit(searchValue)}
					style={styles.search}
				/>
			</View>

			<Histories onItemPress={handleSearchSubmit} flag={flag} />

			<Text variant="headlineLarge" style={styles.cardHeader}>
				Filter
			</Text>

			<FilterCard
				title="Order by"
				data={orderBys}
				style={styles.filterCard}
				onSelected={value => (filter.current.order_by = value as SearchOrderBy)}
			/>
			<FilterCard
				title="Content filter"
				data={contentFilters}
				style={styles.filterCard}
				onSelected={value => (filter.current.content_filter = value as ContentFilter)}
			/>
			<FilterCard
				title="Color"
				data={colorValues}
				style={styles.filterCard}
				onSelected={value => (filter.current.color = value as ColorId)}
			/>
			<FilterCard
				title="Orientation"
				data={orientations}
				style={styles.filterCard}
				onSelected={value => (filter.current.orientation = value as Orientation)}
			/>
		</Surface>
	)
}

type HistoriesProps = {
	flag: boolean
	onItemPress: (query: string) => void
}
function Histories({ onItemPress, flag }: HistoriesProps) {
	const [histories, setHistories] = useState<string[]>([])
	const nonDuplicateHistories = Array.from(new Set(histories))

	const getHistories = () => {
		History.get().then(data => setHistories(data))
	}

	const removeHistory = (query: string) => {
		History.remove(query)
		setHistories(histories.filter(history => history != query))
	}

	useEffect(getHistories, [flag])

	if (histories.length === 0) return null

	return (
		<>
			<Text variant="headlineLarge" style={styles.cardHeader}>
				Histories
			</Text>
			<View style={styles.historiesContainer}>
				{nonDuplicateHistories.map((query, index) => (
					<Chip
						key={index}
						style={styles.history}
						mode="outlined"
						onClose={() => removeHistory(query)}
						onPress={() => onItemPress(query)}
					>
						{query}
					</Chip>
				))}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	search: {
		flex: 1,
	},
	cardHeader: {
		fontWeight: "bold",
		marginTop: 16,
		paddingHorizontal: 16,
	},
	filterCard: {
		marginTop: 8,
		marginStart: 16,
	},
	historiesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginHorizontal: -4,
		marginTop: 8,
		paddingHorizontal: 16,
	},
	history: {
		margin: 4,
	},
})
