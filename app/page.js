'use client'
import { useGetDataByCategory } from './api/api-hooks'
import { endpoints } from './api/config'
import { Banner } from './components/Banner/Banner'
import { CardListSection } from './components/CardListSection/CardListSection.jsx'
import { Promo } from './components/Promo/Promo'

//Из доп.фич хотел все-таки регистрацию сделать, но по времени не успел( По мелочи только анимацию для модалки добавил

export default function Home() {
	const popularGames = useGetDataByCategory(endpoints.games, 'popular')
	const newGames = useGetDataByCategory(endpoints.games, 'new')
	return (
		<main>
			<Banner />
			{popularGames && (
				<CardListSection
					id='popular'
					title='Популярные'
					data={popularGames}
					type='slider'
				/>
			)}
			{newGames && (
				<CardListSection
					id='new'
					title='Новые'
					data={newGames}
					type={'slider'}
				/>
			)}
			<Promo />
		</main>
	)
}
