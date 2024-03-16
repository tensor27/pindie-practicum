'use client'
import { useGetDataByCategory } from '../../../api/api-hooks'
import { endpoints } from '../../../api/config'
import { CardList } from '../../../components/CardList/CardList'
import { Preloader } from '../../../components/Preloader/Preloader.jsx'

export default function FilteredGames(props) {
	const games = useGetDataByCategory(endpoints.games, props.params.category)
	if (games && games.length === 0) return notFound()
	return (
		<>
			{games ? (
				<div>
					<h1 style={{ textAlign: 'center' }}>
						{props.params.category.toUpperCase()}
					</h1>
					<CardList id={games.id} title={games.title} data={games} />
				</div>
			) : (
				<Preloader />
			)}
		</>
	)
}
