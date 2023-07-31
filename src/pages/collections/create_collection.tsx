import { yupResolver } from "@hookform/resolvers/yup"
import { BackAppBar, TextField } from '../../components'
import { useForm } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button, IconButton, Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as yup from "yup"

export default function CreateCollectionScreen() {
	const inset = useSafeAreaInsets()

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

	const onSubmit = async (data: { title: string; description?: string }) => {}
	const onInvalid = (errors: any) => console.error(errors)
	const handleSave = () => handleSubmit(onSubmit, onInvalid)()

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
						errors={errors}
						style={styles.field}
						autoCapitalize="words"
					/>
					
				</View>
			</ScrollView>
			<Button mode="contained" style={styles.button} onPress={handleSave}>
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
