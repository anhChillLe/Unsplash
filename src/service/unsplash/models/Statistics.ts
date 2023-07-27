export interface UserStatistics {
	id: string
	username: string
	downloads: Statistic
	views: Statistic
}

interface Statistic {
	total: number
	historical: Historical
}

export interface Statistics {
	id: string
	slug: string
	downloads: Statistic
	views: Statistic
	likes: Statistic
}

interface Historical {
	change?: number
	average?: number
	resolution: 'days'
	quantity: number
	values: Value[]
}

interface Value {
	date: string
	value: number
}
