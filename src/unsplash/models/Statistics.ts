export interface UserStatistics {
	id: string
	username: string
	downloads: Statistic
	views: Statistic
}

export interface Statistics {
	id: string
	slug: string
	downloads: Statistic
	views: Statistic
	likes: Statistic
}

interface Historical {
	change: number
	average: number | null
	resolution: string
	quantity: number
	values: Value[]
}

interface Statistic {
	total: number
	historical: Historical
}

interface Value {
	date: string
	value: number
}
