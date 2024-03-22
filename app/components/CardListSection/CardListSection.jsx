import { CardList } from './CardList.jsx'
import Styles from './CardListSection.module.css'
import { CardSlider } from './CardSlider.jsx'

export const CardListSection = ({ id, title, data, type }) => {
	return (
		<section className={Styles['list-section']}>
			<h2 className={Styles['list-section__title']} id={id}>
				{title}
			</h2>
			{type == 'slider' ? <CardSlider data={data} /> : <CardList data={data} />}
		</section>
	)
}
