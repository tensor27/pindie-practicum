'use client'
import { useGetDataByCategory } from './api/api-hooks'
import { endpoints } from './api/config'
import { Banner } from './components/Banner/Banner'
import { CardList } from './components/CardList/CardList'
import { Promo } from './components/Promo/Promo'

export default function Home() {
	const popularGames = useGetDataByCategory(endpoints.games, 'popular')
	const newGames = useGetDataByCategory(endpoints.games, 'new')
	return (
		<main>
			<Banner />
			<Promo />
			{popularGames && (
				<CardList id='popular' title='Популярные' data={popularGames} />
			)}
			{newGames && <CardList id='new' title='Новые' data={newGames} />}
		</main>
	)
}
