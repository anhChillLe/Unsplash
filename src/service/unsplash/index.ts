import AuthService from "./service/auth"
import CollectionService from "./service/collection"
import CurrentUserService from "./service/current_user"
import PhotoService from "./service/photo"
import SearchService from "./service/search"
import StatsService from "./service/stats"
import TopicService from "./service/topic"
import UserService from "./service/user"

const unsplash = {
	auth: AuthService,
	current_user: CurrentUserService,
	user: UserService,
	stats: StatsService,
	search: SearchService,
	photo: PhotoService,
	topic: TopicService,
	collection: CollectionService,
}

export default unsplash
