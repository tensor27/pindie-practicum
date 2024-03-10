'use client'
import { Banner } from './components/Banner/Banner'
import { CardList } from './components/CardList/CardList'
import { Promo } from './components/Promo/Promo'
import { getGameByCategory } from './data/data-utils'

export default function Home() {
	const popularGames = getGameByCategory('popular')
	const newGames = getGameByCategory('new')
	return (
		<main>
			<Banner />
			<Promo />
			<CardList id='popular' title='Популярные' data={popularGames} />
			<CardList id='new' title='Новые' data={newGames} />
		</main>
	)
}
