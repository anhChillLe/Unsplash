import { useLayoutEffect, useRef, useState } from "react"
import PagerView from "react-native-pager-view"
import { Surface } from "react-native-paper"
import { BackAppBar } from "../../components"
import { useDetailPagerRoute } from "../../navigations/hooks"
import { Photo } from "../../service/unsplash/models"
import PageContainer from "./image_page"

export default function DetailPagerScreen() {
	const route = useDetailPagerRoute()
	const { photos, initPosition = 0 } = route.params

	const ref = useRef<PagerView>(null)
	const [data, setData] = useState<Photo[]>(() => {
		const currentPhoto = photos[initPosition]
		return [currentPhoto]
	})

	useLayoutEffect(() => {
    console.log(photos.length)
		setData([...photos])
		// ref.current?.setPage(initPosition)
	}, [photos])

  console.log(data.length)

	return (
		<Surface style={{ flex: 1, height: "100%" }}>
			<BackAppBar />
			<PagerView ref={ref} style={{flex: 1}} offscreenPageLimit={1} collapsable={false} pageMargin={8}>
				{data.map((photo) => {
					return <PageContainer key={photo.id} photo={photo} />
				})}
			</PagerView>
		</Surface>
	)
}
