import { data } from './data'
export const getGameByCategory = category => {
	return data.filter(game => game.category.find(item => item.name === category))
}

export const getGameById = id => {
	return data.find(game => game.id === Number(id))
}
