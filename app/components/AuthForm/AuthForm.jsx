import { useEffect, useState } from 'react'
import { authorize, getMe, isResponseOk, setJWT } from '../../api/api-utils'
import { endpoints } from '../../api/config'
import Styles from './AuthForm.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/app-context'

export const AuthForm = props => {
	const authContext = useContext(AuthContext)
	
	const [authData, setAuthData] = useState({ identifier: '', password: '' })
	const [message, setMessage] = useState({ status: null, text: null })
	const handleInput = e => {
		setAuthData({ ...authData, [e.target.name]: e.target.value })
	}
	const handleSubmit = async event => {
		event.preventDefault()
		const userData = await authorize(endpoints.auth, authData)
		if (isResponseOk(userData)) {
			authContext.login(userData.user, userData.jwt)
			
			setMessage({ status: 'success', text: 'Вы авторизовались' })
		} else {
			setMessage({ status: 'error', text: 'Неверные почта или пароль' })
		}
	}

	useEffect(() => {
		let timer
		if (authContext.user) {
			timer = setTimeout(() => {
				props.close()
			}, 1000)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [authContext.user])

	return (
		<form className={Styles['form']} onSubmit={handleSubmit}>
			<h2 className={Styles['form__title']}>Авторизация</h2>
			<div className={Styles['form__fields']}>
				<label className={Styles['form__field']}>
					<span className={Styles['form__field-title']}>Email</span>
					<input
						className={Styles['form__field-input']}
						type='email'
						placeholder='hello@world.com'
						required={true}
						name='identifier'
						onInput={handleInput}
					/>
				</label>
				<label className={Styles['form__field']}>
					<span className={Styles['form__field-title']}>Пароль</span>
					<input
						className={Styles['form__field-input']}
						type='password'
						placeholder='***********'
						required={true}
						name='password'
						onInput={handleInput}
					/>
				</label>
			</div>
			{message.status && <p className='form__message'>{message.text}</p>}
			<div className={Styles['form__actions']}>
				<button className={Styles['form__reset']} type='reset'>
					Очистить
				</button>
				<button className={Styles['form__submit']} type='submit'>
					Войти
				</button>
			</div>
		</form>
	)
}
