import { Photo } from "./Photo"
import { User } from "./User"

export interface LikeResponse {
	photo: Photo
	user: User
}
