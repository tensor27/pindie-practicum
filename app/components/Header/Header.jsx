'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AuthForm } from '../AuthForm/AuthForm'
import { Overlay } from '../Overlay/Overlay'
import { Popup } from '../Popup/Popup'
import Styles from './Header.module.css'

import { usePathname } from 'next/navigation'
import { getJWT, getMe, isResponseOk, removeJWT } from '../../api/api-utils'
import { endpoints } from '../../api/config'

export const Header = () => {
	const [popUpIsOpened, setPopUpIsOpened] = useState(false)
	const [isAuthorized, setIsAuthorized] = useState(false)

	const handleLogOut = () => {
		setIsAuthorized(false)
		removeJWT()
	}

	const openPopup = () => {
		setPopUpIsOpened(true)
	}
	const closePopup = () => {
		setPopUpIsOpened(false)
	}
	const pathname = usePathname()

	useEffect(() => {
		const jwt = getJWT()
		getMe(endpoints.me, jwt).then(userData => {
			if (isResponseOk(userData)) {
				setIsAuthorized(true)
			} else {
				setIsAuthorized(false)
				removeJWT()
			}
		})
	}, [])

	return (
		<header className={Styles['header']}>
			{pathname === '/' ? (
				<div className={Styles['logo']}>
					<img
						className={Styles['logo__image']}
						src='/images/logo.svg'
						alt='Логотип Pindie'
					/>
				</div>
			) : (
				<Link href='/' className={Styles['logo']}>
					<img
						className={Styles['logo__image']}
						src='/images/logo.svg'
						alt='Логотип Pindie'
					/>
				</Link>
			)}
			<nav className={Styles['menu']}>
				<ul className={Styles['menu__list']}>
					<li className={Styles['menu__item']}>
						<Link
							href='/games/category/new'
							className={`${Styles['menu__link']} && ${
								pathname === '/games/category/new'
									? Styles['menu__link_active']
									: ''
							}`}
						>
							Новинки
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/games/category/popular'
							className={`${Styles['menu__link']} && ${
								pathname === '/games/category/popular'
									? Styles['menu__link_active']
									: ''
							}`}
						>
							Популярные
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/games/category/shooter'
							className={`${Styles['menu__link']} && ${
								pathname === '/games/category/shooter'
									? Styles['menu__link_active']
									: ''
							}`}
						>
							Шутеры
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/games/category/runner'
							className={`${Styles['menu__link']} && ${
								pathname === '/games/category/runner'
									? Styles['menu__link_active']
									: ''
							}`}
						>
							Ранеры
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/games/category/pixel'
							className={`${Styles['menu__link']} && ${
								pathname === '/games/category/pixel'
									? Styles['menu__link_active']
									: ''
							}`}
						>
							Пиксельные
						</Link>
					</li>
					<li className={Styles['menu__item']}>
						<Link
							href='/games/category/TDS'
							className={`${Styles['menu__link']} && ${
								pathname === '/games/category/TDS'
									? Styles['menu__link_active']
									: ''
							}`}
						>
							TDS
						</Link>
					</li>
				</ul>
				<div className={Styles['auth']}>
					{isAuthorized ? (
						<button className={Styles['auth__button']} onClick={handleLogOut}>
							Выйти
						</button>
					) : (
						<button className={Styles['auth__button']} onClick={openPopup}>
							Войти
						</button>
					)}
				</div>
			</nav>
			<Overlay popUpIsOpened={popUpIsOpened} closePopup={closePopup} />
			<Popup popUpIsOpened={popUpIsOpened} closePopup={closePopup}>
				<AuthForm close={closePopup} setAuth={setIsAuthorized} />
			</Popup>
		</header>
	)
}
