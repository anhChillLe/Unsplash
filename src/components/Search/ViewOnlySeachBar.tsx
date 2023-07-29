import React from "react"
import { Pressable } from "react-native"
import { Searchbar } from "react-native-paper"
import { Props as SearchBarProps } from "react-native-paper/lib/typescript/src/components/Searchbar"

type Props = {
	placeHolder: string
	onPress: () => void
}

export default function ViewOnlySearchBar({ placeHolder, onPress, ...props }: Props & SearchBarProps) {
	return (
		<Searchbar {...props} mode="bar" placeholder={placeHolder} editable={false} onPressIn={onPress} />
	)
}
