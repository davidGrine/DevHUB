import { configureStore } from '@reduxjs/toolkit'

import projectReducer from './slices/project.slice'
import authReducer from './slices/auth.slice'
import userReducer from './slices/user.slice'

export const store = configureStore({
	reducer: {
		projects: projectReducer,
		auth: authReducer,
		user: userReducer
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch