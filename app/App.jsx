'use client'

import { useEffect, useState } from 'react'
import { getJWT, getMe, removeJWT, setJWT } from './api/api-utils'
import { endpoints } from './api/config'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { AuthContext } from './context/app-context'

export const App = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false)
	const [user, setUser] = useState(null)
	const [token, setToken] = useState('')

	const login = (user, token) => {
		setIsAuth(true)
		setUser(user)
		setToken(token)
		setJWT(token)
	}

	const logout = () => {
		setIsAuth(false)
		setUser(null)
		setToken('')
		removeJWT()
	}

	const checkIsAuth = async () => {
		const token = getJWT()

		if (token) {
			const me = await getMe(endpoints.me, token)
			if (me) {
				login(me)
			} else {
				logout
			}
		}
	}

	useEffect(() => {
		async function check() {
			await checkIsAuth()
		}
		check()
	}, [])

	return (
		<AuthContext.Provider value={{ isAuth, user, token, login, logout }}>
			<Header />
			{children}
			<Footer />
		</AuthContext.Provider>
	)
}
