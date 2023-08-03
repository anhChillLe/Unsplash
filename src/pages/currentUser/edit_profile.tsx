import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { Avatar, Button, IconButton, Surface, Text } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as yup from "yup"
import { BackAppBar, LoadingScreen, TextField } from "../../components"
import { updateCurrentUser } from "../../redux/features/user/action"
import { useAppDispatch, useUserState } from "../../redux/store/store"

export default function EditUserProfile() {
	const state = useUserState()
	const inset = useSafeAreaInsets()
	const dispatch = useAppDispatch()
	const { isLoading, profile } = state
	if(!profile) return null
	const { username, first_name, last_name, email, portfolio_url: url, location, bio, instagram_username } = profile

	const schema = yup.object({
		username: yup.string(),
		first_name: yup.string(),
		last_name: yup.string(),
		email: yup.string().email('I\'s not an email'),
		url: yup.string().url('It must be an url'),
		location: yup.string(),
		bio: yup.string(),
		instagram_username: yup.string()
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onSubmit",
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: {
		username: string | undefined
		first_name: string | undefined
		last_name: string | undefined
		email: string | undefined
		url: string | undefined
		location: string | undefined
		bio: string | undefined
		instagram_username: string | undefined
	}) => {
		dispatch(updateCurrentUser(data))
	}

	const handleSave = () => {
		const onInvalid = (errors: any) => console.error(errors)
		handleSubmit(onSubmit, onInvalid)()
	}

	if (isLoading) return <LoadingScreen />

	return (
		<Surface style={[styles.container, { paddingTop: inset.top, paddingBottom: inset.bottom }]}>
			<BackAppBar />
			<ScrollView
				contentContainerStyle={{ paddingBottom: 16 }}
				style={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
			>
				<View style={{ alignItems: "center" }}>
					<Avatar.Image source={{ uri: profile?.profile_image.large }} size={128} />
					<Text variant="headlineMedium" style={{ fontWeight: "bold", marginTop: 8 }}>
						{profile?.username}
					</Text>
					<Text variant="titleMedium">@{profile?.username}</Text>
				</View>
				<View>
					<TextField
						title="Username"
						control={control}
						name="username"
						initValue={username}
						placeholder="User name"
						errors={errors}
						style={styles.field}
						autoCapitalize="none"
						right={<IconButton icon="restore" />}
					/>
					<TextField
						title="First name"
						control={control}
						name="first_name"
						initValue={first_name}
						placeholder="First name"
						errors={errors}
						style={styles.field}
						autoCapitalize="words"
					/>
					<TextField
						title="Last name"
						control={control}
						name="last_name"
						initValue={last_name}
						placeholder="Last name"
						errors={errors}
						style={styles.field}
						autoCapitalize="words"
					/>
					<TextField
						title="Email"
						control={control}
						name="email"
						initValue={email}
						placeholder="Email"
						errors={errors}
						style={styles.field}
						autoCapitalize="none"
					/>
					<TextField
						title="Portfolio URL"
						control={control}
						name="url"
						initValue={url}
						placeholder="Your portfolio"
						style={styles.field}
						autoCapitalize="none"
					/>
					<TextField
						title="Location"
						control={control}
						name="location"
						initValue={location}
						placeholder="Location"
						errors={errors}
						style={styles.field}
					/>
					<TextField
						title="About"
						control={control}
						name="bio"
						initValue={bio ?? ""}
						placeholder="Description about you"
						errors={errors}
						style={styles.field}
					/>
					<TextField
						title="Instagram"
						control={control}
						name="instagram_username"
						initValue={instagram_username ?? ""}
						placeholder="Instagram username"
						errors={errors}
						style={styles.field}
						autoCapitalize="none"
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
