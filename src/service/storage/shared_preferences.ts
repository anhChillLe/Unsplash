import AsyncStorage from "@react-native-async-storage/async-storage"

enum Keys {
	histories = "histories",
}

const History = {
	async save(value: string) {
		const response = await AsyncStorage.getItem(Keys.histories)
		if (response) {
			const histories = JSON.parse(response) as string[]
			AsyncStorage.setItem(Keys.histories, JSON.stringify([...histories, value]))
		} else {
			AsyncStorage.setItem(Keys.histories, JSON.stringify([value]))
		}
	},
	async get(){
		const response = await AsyncStorage.getItem(Keys.histories) ?? '[]'
		return JSON.parse(response) as string[]
	},
	remove(value: string){
		AsyncStorage.getItem(Keys.histories).then((response) => {
			if (response) {
				const histories = JSON.parse(response) as string[]
				const newHis = histories.filter(historiy => historiy != value)
				AsyncStorage.setItem(Keys.histories, JSON.stringify(newHis))
			}
		})
	}
}

export default History