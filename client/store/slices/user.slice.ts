import { userService } from '@/services/user.service'
import { IUser } from '@/types/user.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserState {
  user: IUser | null
  users: IUser[]
  loading: boolean
  error: string | null
}

export const fetchCurrentUser = createAsyncThunk<IUser>(
  'user/fetchCurrentUser',
  async () => {
    return await userService.getCurrentUser()
  },
)

export const fetchUser = createAsyncThunk<IUser, string>(
  'user/fetchUser',
  async (id: string) => {
    return await userService.getUser(id)
  },
)

export const fetchAllUsers = createAsyncThunk<IUser[]>(
  'user/fetchAllUsers',
  async () => {
    return await userService.getAllUsers()
  },
)

const initialState: UserState = {
  user: null,
  users: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    clearUser: state => {
      state.user = null
      state.error = null
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })

      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error =
          action.error.message || 'Failed to load current user'
      })

      .addCase(fetchUser.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })

      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to load user'
      })

      .addCase(fetchAllUsers.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
        state.error = null
      })

      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to load users'
      })
  },
})

export const { clearUser } = userSlice.actions

export default userSlice.reducer