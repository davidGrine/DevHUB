import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IAuthResponse, ILoginDto, IRegistrationDto } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

interface AuthState {
	accessToken: string | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	accessToken: null,
	isAuthenticated: false,
	loading: false,
	error: null
}

export const loginUser = createAsyncThunk<IAuthResponse, ILoginDto>(
	'auth/loginUser',
	async dto => {
		const response = await authService.login(dto)

		localStorage.setItem('accessToken', response.accessToken)

		return response
	}
)

export const registrationUser = createAsyncThunk<
	IAuthResponse,
	IRegistrationDto
>('auth/registrationUser', async dto => {
	const response = await authService.registration(dto)

	localStorage.setItem('accessToken', response.accessToken)

	return response
})

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await authService.logout()

    localStorage.removeItem('accessToken')
  }
)

const authSlice = createSlice({
	name: 'auth',

	initialState,

	reducers: {},

	extraReducers: builder => {
		builder

			// LOGIN
			.addCase(loginUser.pending, state => {
				state.loading = true
				state.error = null
			})

			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false

				state.accessToken = action.payload.accessToken
				state.isAuthenticated = true
			})

			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Login failed'
			})

			// REGISTRATION
			.addCase(registrationUser.pending, state => {
				state.loading = true
				state.error = null
			})

			.addCase(registrationUser.fulfilled, (state, action) => {
				state.loading = false

				state.accessToken = action.payload.accessToken


				state.isAuthenticated = true
			})

			.addCase(registrationUser.rejected, (state, action) => {
				state.loading = false

				state.error = action.error.message || 'Registration failed'
			})

			// LOGOUT
			.addCase(logoutUser.pending, state => {
				state.loading = true
				state.error = null
			})

			.addCase(logoutUser.fulfilled, state => {
				state.accessToken = null
				state.isAuthenticated = false
				state.loading = false
				state.error = null
			})

			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Logout failed'
			})
	}
})

export default authSlice.reducer
