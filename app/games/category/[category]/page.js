import { notFound } from 'next/navigation'
import { getNormalizedGamesDataByCategory } from '../../../api/api-utils'
import { endpoints } from '../../../api/config'
import { CardList } from '../../../components/CardList/CardList.jsx'

export default async function FilteredGames(props) {
	const games = await getNormalizedGamesDataByCategory(
		endpoints.games,
		props.params.category
	)
	console.log(games)
	if (games.length === 0) return notFound()
	return (
		<>
			<div>
				<h1 style={{ textAlign: 'center' }}>
					{props.params.category.toUpperCase()}
				</h1>
				<CardList id={games.id} title={games.title} data={games} />
			</div>
		</>
	)
}
