import Link from 'next/link'
import { Card } from '../Card/Card'
import Styles from './CardList.module.css'

export const CardList = ({ id, title, data }) => {
	return (
		<section className={Styles['list-section']}>
			<h2 className={Styles['list-section__title']} id={id}>
				{title}
			</h2>
			<ul className={Styles['cards-list']}>
				{data.map(item => (
					<li className={Styles['cards-list__item']} key={item.id}>
						<Link
							href={`/games/${item.id}`}
							className={Styles['card-list__link']}
						>
							<Card {...item} />
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
