'use client'

import { useEffect, useState } from 'react'
import {
	checkIfUserVoted,
	getJWT,
	getMe,
	getNormalizedGameDataById,
	isResponseOk,
	removeJWT,
	vote,
} from '../../api/api-utils'
import { endpoints } from '../../api/config'
import { Preloader } from '../../components/Preloader/Preloader.jsx'

import Styles from './Game.module.css'

export default function GamePage(props) {
	const [game, setGame] = useState(null)
	const [preloaderVisible, setPreloaderVisible] = useState(true)
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)
	const [isVoted, setIsVoted] = useState(false)

	useEffect(() => {
		;(async function fetchData() {
			try {
				const game = await getNormalizedGameDataById(
					endpoints.games,
					props.params.id
				)
				isResponseOk(game) ? setGame(game) : setGame(null)
			} catch {
				setPreloaderVisible(false)
				setGame(null)
			}
		})()
	}, [])

	useEffect(() => {
		const jwt = getJWT()
		if (jwt) {
			getMe(endpoints.me, jwt).then(userData => {
				if (isResponseOk(userData)) {
					setIsAuthorized(true)
					setCurrentUser(userData)
				} else {
					setIsAuthorized(false)
					removeJWT()
				}
			})
		}
	}, [])

	useEffect(() => {
		if (currentUser && game) {
			setIsVoted(checkIfUserVoted(game, currentUser.id))
		} else {
			setIsVoted(false)
		}
	}, [currentUser])

	const handleVote = async () => {
		const jwt = getJWT()
		const users = game.users ? game?.users.map(user => user.id) : []
		if (jwt) {
			users.push(currentUser)
			const response = await vote(`${endpoints.games}/${game.id}`, jwt, users)
			if (isResponseOk(response)) {
				setIsVoted(true)
				setGame(() => {
					return { ...game, users: [...game.users, currentUser] }
				})
				console.log(game.users)
			}
		}
	}

	return (
		<main className='main'>
			{game ? (
				<>
					<section className={Styles['game']}>
						<iframe className={Styles['game__iframe']} src={game.link}></iframe>
					</section>
					<section className={Styles['about']}>
						<h2 className={Styles['about__title']}>{game.title}</h2>
						<div className={Styles['about__content']}>
							<p className={Styles['about__description']}>{game.description}</p>
							<div className={Styles['about__author']}>
								<p>
									Автор:
									<span className={Styles['about__accent']}>
										{game.developer}
									</span>
								</p>
							</div>
						</div>
						<div className={Styles['about__vote']}>
							<p className={Styles['about__vote-amount']}>
								За игру уже проголосовали:
								<span className={Styles['about__accent']}>
									{game.users.length}
								</span>
							</p>
							<button
								disabled={!isAuthorized || isVoted}
								className={`button ${Styles['about__vote-button']}`}
								onClick={handleVote}
							>
								{isVoted ? 'Голос учтён' : 'Голосовать'}
							</button>
						</div>
					</section>
				</>
			) : preloaderVisible ? (
				<Preloader />
			) : (
				<section style={{ textAlign: 'center' }}>
					<h1>Game is not found</h1>
					<img
						src='https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/QyDHB4YHkK2V6TA6QkDzSIMbQpg9IIUKO5tn8KuDcJ1.jpeg'
						alt='sad dog'
					/>
				</section>
			)}
		</main>
	)
}
