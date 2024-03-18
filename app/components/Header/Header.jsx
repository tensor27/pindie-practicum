'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useStore } from '../../store/app-store'
import { AuthForm } from '../AuthForm/AuthForm'
import { Overlay } from '../Overlay/Overlay'
import { Popup } from '../Popup/Popup'
import Styles from './Header.module.css'

export const Header = () => {
	const [popUpIsOpened, setPopUpIsOpened] = useState(false)
	const authContext = useStore()
	const handleLogOut = () => {
		authContext.logout()
	}
	const openPopup = () => {
		setPopUpIsOpened(true)
	}
	const closePopup = () => {
		setPopUpIsOpened(false)
	}
	const pathname = usePathname()

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
					{authContext.isAuth ? (
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
				<AuthForm close={closePopup} />
			</Popup>
		</header>
	)
}
