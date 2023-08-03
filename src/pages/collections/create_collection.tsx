import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import { Button, Checkbox, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as yup from "yup"
import { BackAppBar, TextField } from "../../components"
import { useAppNavigation, useCreateCollectionRoute } from "../../navigations/hooks"
import unsplash from "../../service/unsplash"

export default function CreateCollectionScreen() {
	const route = useCreateCollectionRoute()
	const navigation = useAppNavigation()
	const inset = useSafeAreaInsets()
	const [isPrivate, setPrivate] = useState(false)
	const collection = route.params?.collection

	const schema = yup.object({
		title: yup.string().required("Title can't be empty"),
		description: yup.string(),
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: { title: string; description?: string }) => {
		try {
			const result = await unsplash.collection.create({ ...data, private: isPrivate })
			console.log(result)
			navigation.goBack()
		} catch (error) {
			console.error("create Collection: ", error)
		}
	}
	const onInvalid = (errors: any) => console.error(errors)
	const handleCreateCollection = () => handleSubmit(onSubmit, onInvalid)()

	return (
		<Surface style={[styles.container, { paddingTop: inset.top, paddingBottom: inset.bottom }]}>
			<BackAppBar />
			<ScrollView
				contentContainerStyle={{ paddingBottom: 16 }}
				style={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<TextField
						title="Title"
						control={control}
						name="title"
						defaultValue={collection?.title}
						placeholder="Collection title"
						errors={errors}
						style={styles.field}
						autoCapitalize="sentences"
					/>
					<TextField
						title="Description"
						control={control}
						name="description"
						placeholder="Title description"
						defaultValue={collection?.description ?? ""}
						errors={errors}
						style={styles.field}
						autoCapitalize="words"
						multiline={true}
					/>
					<Pressable
						style={{ flexDirection: "row", alignItems: "center" }}
						onPress={() => setPrivate(isPrivate => !isPrivate)}
					>
						<Checkbox.Android status={isPrivate ? "checked" : "unchecked"} />
						<Text>Private collection</Text>
					</Pressable>
				</View>
			</ScrollView>
			<Button mode="contained" style={styles.button} onPress={handleCreateCollection}>
				Save
			</Button>
		</Surface>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		paddingHorizontal: 16,
	},
	field: {
		marginBottom: 16,
	},
	button: { paddingVertical: 4 },
})
