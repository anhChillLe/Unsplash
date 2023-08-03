import { useState } from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { HelperText, Text, TextInput, TextInputProps } from "react-native-paper"

type Props = {
	name: string
	control: any
	initValue?: string
	title?: string
	style?: StyleProp<ViewStyle>
	errors?: FieldErrors
}

const TextField = ({ name, control, initValue = "", title, style, errors, ...props }: Props & TextInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={initValue}
			render={({ field: { value, onChange: onChangeText, onBlur } }) => {
				const isError = !!errors?.[name]
				const errorMessage = isError ? errors[name]?.message : ""
				return (
					<View style={[style]}>
						{title && (
							<Text variant="titleSmall" style={styles.title}>
								{title}
							</Text>
						)}
						<TextInput
							mode="outlined"
							{...{ value, onChangeText, onBlur }}
							theme={{ roundness: 8 }}
							error={isError}
							{...props}
						/>
						{isError && (
							<HelperText type="error" style={styles.helper}>
								{errorMessage?.toString()}
							</HelperText>
						)}
					</View>
				)
			}}
		/>
	)
}

export default TextField

const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		opacity: 0.6,
	},
	helper: {
		fontWeight: "500",
	},
})
