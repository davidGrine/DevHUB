import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IComment, IProject } from '@/types/project.type'
import { projectService } from '@/services/project.service'

interface ProjectState {
	projects: IProject[]
	project: IProject | null
	comments: IComment[]
	comment: IComment | null
	loading: boolean
	creating: boolean
	error: string | null
	page: number
	limit: number
	total: number
	totalPages: number
}

const initialState: ProjectState = {
	projects: [],
	project: null,
	comments: [],
	comment: null,
	loading: false,
	creating: false,
	error: null,
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0
}

export const fetchProjects = createAsyncThunk(
	'projects/fetchProjects',
	async ({ page, limit }: { page: number; limit: number }) => {
		return await projectService.getProjects(page, limit)
	}
)

export const fetchProjectById = createAsyncThunk(
	'projects/fetchProjectById',
	async (id: string) => {
		return await projectService.getProjectById(id)
	}
)

export const createProject = createAsyncThunk(
	'projects/createProject',
	async (formData: FormData) => {
		return await projectService.createProject(formData)
	}
)

export const addComment = createAsyncThunk(
	'projects/addComment',
	async ({ projectId, text }: { projectId: string; text: string }) => {
		return await projectService.addComment(projectId, text)
	}
)

const projectSlice = createSlice({
	name: 'projects',
	initialState,

	reducers: {},

	extraReducers: builder => {
		builder

			// Fetch projects
			.addCase(fetchProjects.pending, state => {
				state.loading = true
				state.error = null
			})

			.addCase(fetchProjects.fulfilled, (state, action) => {
				state.loading = false

				state.projects = action.payload.projects
				state.page = action.payload.page
				state.limit = action.payload.limit
				state.total = action.payload.total
				state.totalPages = action.payload.totalPages
			})

			.addCase(fetchProjects.rejected, (state, action) => {
				state.loading = false

				state.error = action.error.message || 'Failed to load projects'
			})

			// Fetch project by id
			.addCase(fetchProjectById.pending, state => {
				state.loading = true
				state.error = null
			})

			.addCase(fetchProjectById.fulfilled, (state, action) => {
				state.loading = false

				state.project = action.payload
				state.comments = action.payload.comments
			})

			.addCase(fetchProjectById.rejected, (state, action) => {
				state.loading = false

				state.error = action.error.message || 'Failed to load project'
			})

			// Create project
			.addCase(createProject.pending, state => {
				state.creating = true
				state.loading = true
				state.error = null
			})

			.addCase(createProject.fulfilled, (state, action) => {
				state.creating = false
				state.loading = false

				state.projects = [...state.projects, action.payload]
			})

			.addCase(createProject.rejected, (state, action) => {
				state.creating = false
				state.loading = false

				state.error = action.error.message || 'Failed to create project'
			})

			// Add comment
			.addCase(addComment.pending, state => {
				state.error = null
			})

			.addCase(addComment.fulfilled, (state, action) => {
				state.comment = action.payload

				state.comments = [action.payload, ...state.comments]

				if (state.project) {
					state.project.comments = [
						action.payload,
						...(state.project.comments ?? [])
					]
				}
			})
	}
})

export default projectSlice.reducer
