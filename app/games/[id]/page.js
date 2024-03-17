'use client'

import { useContext, useEffect, useState } from 'react'
import {
	checkIfUserVoted,
	getNormalizedGameDataById,
	isResponseOk,
	vote,
} from '../../api/api-utils'
import { endpoints } from '../../api/config'
import { Preloader } from '../../components/Preloader/Preloader.jsx'
import { AuthContext } from '../../context/app-context.js'

import Styles from './Game.module.css'

export default function GamePage(props) {
	const authContext = useContext(AuthContext)
	const [game, setGame] = useState(null)
	const [preloaderVisible, setPreloaderVisible] = useState(true)
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
		if (authContext.user && game) {
			setIsVoted(checkIfUserVoted(game, authContext.user.id))
		} else {
			setIsVoted(false)
		}
	}, [authContext.user])

	const handleVote = async () => {
		const jwt = authContext.token
		const users = game.users ? game?.users.map(user => user.id) : []
		if (jwt) {
			users.push(authContext.user)
			const response = await vote(`${endpoints.games}/${game.id}`, jwt, users)
			if (isResponseOk(response)) {
				setIsVoted(true)
				setGame(() => {
					return { ...game, users: [...game.users, authContext.user] }
				})
				console.log(game.users)
			}
		}
	}
	
	// const handleVote = async () => {
	// 	const jwt = authContext.token
	// 	let usersIdArray = game.users.length ? game.users.map(user => user.id) : []
	// 	usersIdArray.push(authContext.user.id)
	// 	const response = await vote(
	// 		`${endpoints.games}/${game.id}`,
	// 		jwt,
	// 		usersIdArray
	// 	)
	// 	console.log(usersIdArray);
	// 	if (isResponseOk(response)) {
	// 		setGame(() => {
	// 			return {
	// 				...game,

	// 				users: [...game.users, authContext.user],
	// 			}
	// 		})
	// 		setIsVoted(true)
	// 	}
	// }

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
								disabled={!authContext.isAuth || isVoted}
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
